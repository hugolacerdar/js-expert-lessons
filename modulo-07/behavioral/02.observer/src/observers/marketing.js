export default class Marketing {
    update({ id, userName }) {
        // importante lembrar que o update é responsável por gerenciar seus erros
        // não deve-se ter await no notify porque a responsabilidade do notify é somente emitir eventos
        // só notificar todo mundo 
        console.log(`[${id}]: [marketing] will send emails based on [${userName}'s] order`);
    }
}