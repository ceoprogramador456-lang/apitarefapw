import cx from "../data/index.js";

export const consultar = async (idUsuario = null) => {
    try {
        if (idUsuario) {
            const cmdsql = 'SELECT * FROM tarefas WHERE fk_usuario_id = ?';
            const [data] = await cx.query(cmdsql, [idUsuario]);
            return data;
        }
        const cmdsql = 'SELECT * FROM tarefas';
        const [data] = await cx.query(cmdsql);
        return data;
    } catch (error) {
        console.error('Erro ao consultar tarefas:', error);
    }
}

export const consultarPorId = async (id) => {
    try {
        const cmdsql = 'SELECT * FROM tarefas WHERE id = ?';
        const [data] = await cx.query(cmdsql, [id]);
        return data;
    } catch (error) {
        console.error('Erro ao consultar tarefa:', error);
    }
}

export const cadastrar = async (idUsuario, titulo, descricao, status) => {
    try {
        const cmdsql = 'INSERT INTO tarefas (fk_usuario_id, titulo, descricao, status) VALUES (?, ?, ?, ?)';
        const [data] = await cx.query(cmdsql, [idUsuario, titulo, descricao, status || 'PENDENTE']);
        return data;
    } catch (error) {
        console.error('Erro ao cadastrar tarefa:', error);
        throw error;
    }
}

export const atualizar = async (id, titulo, descricao, status) => {
    try {
        const cmdsql = 'UPDATE tarefas SET titulo = COALESCE(?, titulo), descricao = COALESCE(?, descricao), status = COALESCE(?, status) WHERE id = ?';
        const [data] = await cx.query(cmdsql, [titulo, descricao, status, id]);
        return data;
    } catch (error) {
        console.error('Erro ao atualizar tarefa:', error);
    }
}

export const excluir = async (id) => {
    try {
        const cmdsql = 'DELETE FROM tarefas WHERE id = ?';
        const [data] = await cx.query(cmdsql, [id]);
        return data;
    } catch (error) {
        console.error('Erro ao excluir tarefa:', error);
    }
}
