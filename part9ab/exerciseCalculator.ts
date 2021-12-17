interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const getRating = (val: number, target: number): number => {
    if (val >= target) {
        return 3;
    } else if (val >= target / 2) {
        return 2;
    } else {
        return 1;
    }
};

const getRatingDesc = (rating: number): string => {
    switch (rating) {
        case 3:
            return "Great!";
        case 2:
            return "You could do better!";
        case 1:
            return "Did you even do anything?";
        default:
            return "Did you make up this rating?";
    }
};

const calculateExercises = (hours: Array<number>, target: number): Result => {
    const periodLength = hours.length;
    const average = hours.reduce((a, b) => a + b) / periodLength;
    const rating = getRating(average, target);

    return {
        periodLength: periodLength,
        trainingDays: hours.filter((a) => a > 0).length,
        success: average >= target,
        rating: rating,
        ratingDescription: getRatingDesc(rating),
        target: target,
        average: average,
    };
};

interface exerciseValues {
    target: number;
    hours: Array<number>;
}

const parseExerciseArgs = (args: Array<string>): exerciseValues => {
    if (args.length < 4) throw new Error("Must have at least two parameters.");

    const numberic_args = args.slice(2).map(Number);

    if (numberic_args.filter(isNaN).length != 0)
        throw new Error("All parameters have to be numbers.");

    return {
        target: numberic_args[0],
        hours: numberic_args.slice(1),
    };
};

try {
    const { target, hours } = parseExerciseArgs(process.argv);
    console.log(calculateExercises(hours, target));
} catch (error: unknown) {
    let errMsg = "Something bad happened.";
    if (error instanceof Error) {
        errMsg = "Error: " + error.message;
    }
    console.log(errMsg);
}

export { calculateExercises };
