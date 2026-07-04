// Arquivo com funções relacionadas a erros

export function errorMessages(error, req) {
    // Função que exporta um JSON pronto para o erro
    const json = {
        "error": `Error while trying to ${req.method} in ${req.url}`,
        "hint": error.message
    }

    return json;
}