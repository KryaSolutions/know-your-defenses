import React, { useState, createContext } from "react";
import securityMaturity from "../utilities/securityMaturity";
import zeroTrust from "../utilities/zeroTrust";
import Assessment from "./Assessment";

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
                <Assessment assessment={securityMaturity.title} desc={securityMaturity.desc} data={securityMaturity.questions} options={securityMaturity.options} />
                <Assessment assessment={zeroTrust.title} desc={zeroTrust.desc} data={zeroTrust.questions} options={zeroTrust.options} />
            </ResponseContext.Provider>
        </div>
    );
}

export default App;
