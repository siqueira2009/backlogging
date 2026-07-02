export function getUser() {
    return "GET in /user";
}

export function postUser() {
    return "POST in /user";
}

export function deleteUser(id) {
    return `DELETE in /user with ID ${id}`;
}

export function putUser(id) {
    return `PUT in /user with ID ${id}`
}