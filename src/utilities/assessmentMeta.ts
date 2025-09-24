import securityMaturity from "./securityMaturity";
import zeroTrustAssessment from "./zeroTrust";

export type titleType = string;

export type descType = string;

export type dataType = {
    [category: string]: {
        icon: string;
        color: string;
        questions: string[];
    };
};

export type optionType = {
    value: string;
    label: string;
    score: number;
    color: string;
};

export type assessmentType = {
    title: titleType;
    desc: descType;
    questions: dataType;
    options: optionType[];
};

const assessmentData: assessmentType[] = [
    { ...securityMaturity },
    { ...zeroTrustAssessment },
];

export default assessmentData;
