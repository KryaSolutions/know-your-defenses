import config from "../config.js";
import { Mistral } from "@mistralai/mistralai";
import knowledgeBase from "./knowledgeBase.js";

type EmbeddingStore = {
    text: string;
    embedding: number[] | undefined;
};
let embeddingStore: EmbeddingStore[] = [];

function chunkText(text: string, chunkSize: number): string[] {
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
    const chunks: string[] = [];
    let currentChunk = "";

    for (const sentence of sentences) {
        if ((currentChunk + sentence).length > chunkSize && currentChunk) {
            chunks.push(currentChunk.trim());
            currentChunk = sentence;
        } else {
            currentChunk += sentence;
        }
    }

    if (currentChunk) {
        chunks.push(currentChunk.trim());
    }

    return chunks;
}

const initializeEmbeddings = async (): Promise<void> => {
    try {
        const chunks = chunkText(knowledgeBase, 1024);
        const mistral = new Mistral({
            apiKey: config.API_KEY,
        });

        const embeddingPromises = chunks.map(async (chunk) => {
            const response = await mistral.embeddings.create({
                model: "mistral-embed",
                inputs: [chunk],
            });
            return {
                text: chunk,
                embedding: response?.data[0]?.embedding,
            };
        });

        embeddingStore = await Promise.all(embeddingPromises);
        console.log(`Initialized ${embeddingStore.length} embeddings`);
        console.log(embeddingStore);
    } catch (error) {
        console.error("Error initializing embeddings: ", error);
    }
};

export default initializeEmbeddings;
