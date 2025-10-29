import cloudSecurity from "./cloudSecurity";
import securityMaturity from "./securityMaturity";
import socAssessment from "./socAssessment";
import zeroTrust from "./zeroTrust";

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
    title: string;
    desc: string;
    questions: dataType;
    options: optionType[];
    color: string;
};

const assessmentData: assessmentType[] = [
    { ...cloudSecurity },
    { ...securityMaturity },
    { ...zeroTrust },
    { ...socAssessment },
];

export default assessmentData;
