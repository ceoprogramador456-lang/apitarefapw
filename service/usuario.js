import cx from "../data/index.js";

export const consultar = async (id = null) => {
    try {
        if (id) {
            const cmdsql = 'SELECT id, email, nome, created_at, updated_at FROM usuarios WHERE id = ?';
            const [data] = await cx.query(cmdsql, [id]);
            return data;
        }
        const cmdsql = 'SELECT id, email, nome, created_at, updated_at FROM usuarios';
        const [data] = await cx.query(cmdsql);
        return data;
    } catch (error) {
        console.error('Erro ao consultar usuarios:', error);
    }
}

export const cadastrar = async (email, nome, senha) => {
    try {
        const cmdsql = 'INSERT INTO usuarios (email, nome, senha) VALUES (?, ?, ?)';
        const [data] = await cx.query(cmdsql, [email, nome, senha]);
        return data;
    } catch (error) {
        console.error('Erro ao cadastrar usuario:', error);
        throw error;
    }
}

export const atualizar = async (id, email, nome, senha) => {
    try {
        const cmdsql = 'UPDATE usuarios SET email = COALESCE(?, email), nome = COALESCE(?, nome), senha = COALESCE(?, senha) WHERE id = ?';
        const [data] = await cx.query(cmdsql, [email, nome, senha, id]);
        return data;
    } catch (error) {
        console.error('Erro ao atualizar usuario:', error);
    }
}

export const excluir = async (id) => {
    try {
        const cmdsql = 'DELETE FROM usuarios WHERE id = ?';
        const [data] = await cx.query(cmdsql, [id]);
        return data;
    } catch (error) {
        console.error('Erro ao excluir usuario:', error);
    }
}
