import React from "react";

interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
}

interface CoursePartWithDescription extends CoursePartBase {
    description: string;
}

interface CourseNormalPart extends CoursePartWithDescription {
    type: "normal";
}

interface CourseProjectPart extends CoursePartBase {
    type: "groupProject";
    groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartWithDescription {
    type: "submission";
    exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CoursePartWithDescription {
    type: "special";
    requirements: Array<string>;
}

type CoursePart =
    | CourseNormalPart
    | CourseProjectPart
    | CourseSubmissionPart
    | CourseSpecialPart;

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const PartHeader = ({
    name,
    exerciseCount,
}: {
    name: string;
    exerciseCount: number;
}) => {
    return (
        <div>
            <b>
                {name} {exerciseCount}
            </b>
        </div>
    );
};

const Part = ({ part }: { part: CoursePart }) => {
    switch (part.type) {
        case "normal":
            return (
                <p>
                    <PartHeader
                        name={part.name}
                        exerciseCount={part.exerciseCount}
                    />
                    <i>{part.description}</i>
                </p>
            );
        case "groupProject":
            return (
                <p>
                    <PartHeader
                        name={part.name}
                        exerciseCount={part.exerciseCount}
                    />
                    <div>project exercises {part.groupProjectCount}</div>
                </p>
            );
        case "submission":
            return (
                <p>
                    <PartHeader
                        name={part.name}
                        exerciseCount={part.exerciseCount}
                    />
                    <i>{part.description}</i>
                    <div>submit to {part.exerciseSubmissionLink}</div>
                </p>
            );
        case "special":
            return (
                <p>
                    <PartHeader
                        name={part.name}
                        exerciseCount={part.exerciseCount}
                    />
                    <i>{part.description}</i>
                    <div>required skills: {part.requirements.join(", ")}</div>
                </p>
            );
        default:
            return assertNever(part);
    }
};

const Header = ({ name }: { name: string }) => {
    return (
        <div>
            <h1>{name}</h1>
        </div>
    );
};

const Content = ({ contents }: { contents: Array<CoursePart> }) => {
    return (
        <div>
            {contents.map((part) => (
                <Part key={part.name} part={part} />
            ))}
        </div>
    );
};

const Total = ({ contents }: { contents: Array<CoursePart> }) => {
    const nr_exercises = contents.reduce((a, b) => a + b.exerciseCount, 0);
    return <div>Number of exercises {nr_exercises}</div>;
};

const App = () => {
    const courseName = "Half Stack application development";
    const courseParts: CoursePart[] = [
        {
            name: "Fundamentals",
            exerciseCount: 10,
            description: "This is the leisured course part",
            type: "normal",
        },
        {
            name: "Advanced",
            exerciseCount: 7,
            description: "This is the harded course part",
            type: "normal",
        },
        {
            name: "Using props to pass data",
            exerciseCount: 7,
            groupProjectCount: 3,
            type: "groupProject",
        },
        {
            name: "Deeper type usage",
            exerciseCount: 14,
            description: "Confusing description",
            exerciseSubmissionLink:
                "https://fake-exercise-submit.made-up-url.dev",
            type: "submission",
        },
        {
            name: "Backend development",
            exerciseCount: 21,
            description: "Typing the backend",
            requirements: ["nodejs", "jest"],
            type: "special",
        },
    ];

    return (
        <div>
            <Header name={courseName} />
            <Content contents={courseParts} />
            <Total contents={courseParts} />
        </div>
    );
};

export default App;
