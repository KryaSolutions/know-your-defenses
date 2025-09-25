import React, { useState, createContext } from "react";
import HeroRight from "./HeroRight";

type ResponseContextType = {
    response: responseType;
    setResponse: React.Dispatch<React.SetStateAction<responseType>>;
};
export type responseType = {
    [category: string]: {
        [questionIndex: number]: string;
        score: number;
    };
};

export const ResponseContext = createContext<ResponseContextType | null>(null);

const App = () => {
    const [response, setResponse] = useState<responseType>({});
    return (
        <div>
            <ResponseContext.Provider value={{ response, setResponse }}>
                <HeroRight />
            </ResponseContext.Provider>
        </div>
    );
};

export default App;
