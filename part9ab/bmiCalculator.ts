interface bmiValues {
    height: number;
    mass: number;
}

const calculateBmi = (values: bmiValues): string => {
    const bmi: number = values.mass / (values.height / 100) ** 2;
    if (bmi < 20) return "Underweight (unhealthy weight)";
    else if (20 <= bmi && bmi < 25) return "Normal (healthy weight)";
    else return "Overweight (unhealthy weight)";
};

const parseBmiArgs = (args: Array<string>): bmiValues => {
    if (args.length != 2) throw new Error("Provide exactly two values.");

    if (isNaN(Number(args[0])) || isNaN(Number(args[1])))
        throw new Error("Provided values were not numbers.");

    return {
        height: Number(args[0]),
        mass: Number(args[1]),
    };
};

try {
    const values = parseBmiArgs(process.argv.slice(2));
    console.log(calculateBmi(values));
} catch (error: unknown) {
    let errMsg = "Something bad happened.";
    if (error instanceof Error) {
        errMsg = "Error: " + error.message;
    }
    console.log(errMsg);
}

export { calculateBmi };
