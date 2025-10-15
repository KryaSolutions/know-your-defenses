import cloudSecurity from "./cloudSecurity";
import securityMaturity from "./securityMaturity";
import socAssessment from "./socAssessment";
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
    { ...cloudSecurity },
    { ...securityMaturity },
    { ...zeroTrustAssessment },
    { ...socAssessment },
];

export default assessmentData;
