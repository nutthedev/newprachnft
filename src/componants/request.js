export const getAPI = async (path) => {
    try {
        const controller = new AbortController();
        const signal = controller.signal;
        const response = await fetch(path, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            signal
        });

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const callback = await response.json();
        return callback;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const postAPI = async (path, body) => {
    try {
        const safeBody = JSON.stringify(body, (key, value) =>
            typeof value === 'bigint' ? value.toString() : value
        );

        const controller = new AbortController();
        const signal = controller.signal;
        const response = await fetch(path, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: safeBody,
            signal
        });

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const callback = await response.json();
        return callback;
    } catch (error) {
        console.error(error);
        throw error;
    }
}