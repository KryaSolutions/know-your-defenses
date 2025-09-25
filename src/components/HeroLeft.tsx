import { useContext, useState } from "react";
import { ResponseContext } from "./App";
import assessmentData from "../utilities/assessmentMeta";

const HeroLeft = () => {
    const response = useContext(ResponseContext);

    const countPerCategory: {
        title: string;
        count: number;
    }[] = assessmentData.map((assessment) => {
        const category = Object.values(assessment.questions);

        const count: number = category.reduce((sum, object) => {
            return sum + object.questions.length;
        }, 0);

        return {
            title: assessment.title,
            count: count,
        };
    });

    const totalCount = countPerCategory.reduce((sum, object) => {
        return sum + object.count;
    }, 0);
};
