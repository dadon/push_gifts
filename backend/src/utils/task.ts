export function createTask(name: string, handler: () => Promise<void>, time: number) {
    const wrapper = async () => {
        console.log(`Task ${name} started`);

        try {
            await handler();
        } catch (e) {
            console.error(`Task ${name} crashed`, e);
        }

        setTimeout(wrapper, time);
    };

    wrapper();
}
