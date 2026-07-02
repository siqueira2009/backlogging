export function errorMessages(error, req) {
    const json = {
        "error": `Error while trying to ${req.method} in ${req.url}`,
        "hint": error.message
    }

    return json;
}