// Função de pegar usuário
export function getUser(id) {
    return `GET in /user with ID ${id}`;
}

// Função de postar usuário
export function postUser() {
    return "POST in /user";
}

// Função de deletar usuário
export function deleteUser(id) {
    return `DELETE in /user with ID ${id}`;
}

// Função de atualizar usuário
export function putUser(id) {
    return `PUT in /user with ID ${id}`
}