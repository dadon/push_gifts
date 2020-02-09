import { generateId } from "../utils";


export function getUserId() {
    let userId = localStorage.getItem("uid");

    if (!userId) {
        userId = generateId(16);

        // @ts-ignore c
        localStorage.setItem("uid", userId);
    }

    return userId;
}
