export function generateMutations(names: string[]) {
    const result: any = {};

    for (let name of names) {
        result[name] = (state: any, value: any) => {
            // console.log("set", name, value);
            state[name] = value;
        }
    }

    return result;
}
