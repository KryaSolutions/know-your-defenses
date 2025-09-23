import React, { useState, createContext } from "react";
import Assessment from "./Assessment";
import { resilienceTitle, resilienceDesc, resilienceData, resilienceOptions } from "../utilities/cyberResiliece";

type ResponseContextType = {
    response: responseType,
    setResponse: React.Dispatch<React.SetStateAction<responseType>>
};
export type responseType = {
    [category: string]: {
        [questionIndex: number]: string,
    }
};

export const ResponseContext = createContext<ResponseContextType | null>(null);

const App = () => {
    const [response, setResponse] = useState<responseType>({});
    return (
        <div>
            <ResponseContext.Provider value={{ response, setResponse }}>
                <Assessment assessment={resilienceTitle} desc={resilienceDesc} data={resilienceData} options={resilienceOptions} />
            </ResponseContext.Provider>
        </div>
    );
}

export default App;
