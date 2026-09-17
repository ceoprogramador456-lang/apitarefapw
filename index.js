import express from 'express';
import cors from 'cors';
import * as Usuarios from './service/usuario.js';
import * as Tarefas from './service/tarefa.js';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.status(200).json("{'result':'ok'}");
})

// ---------- USUARIOS ----------

app.get('/usuario', async (req, res) => {
    try {
        const result = await Usuarios.consultar();
        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ erro: 'Nenhum recurso encontrado' });
        }
    } catch (error) {
        console.error('Erro na consulta:', error);
        res.status(500).json({ erro: 'Erro interno do servidor' });
    }
});

app.get('/usuario/:id', async (req, res) => {
    try {
        const result = await Usuarios.consultar(req.params.id);
        if (result.length > 0) {
            res.status(200).json(result[0]);
        } else {
            res.status(404).json({ erro: 'Usuario não encontrado' });
        }
    } catch (error) {
        console.error('Erro na consulta:', error);
        res.status(500).json({ erro: 'Erro interno do servidor' });
    }
});

app.post('/usuario', async (req, res) => {
    try {
        const { email, nome, senha } = req.body;
        if (!email || !nome || !senha) {
            return res.status(400).json({ erro: 'email, nome e senha são obrigatórios' });
        }
        const result = await Usuarios.cadastrar(email, nome, senha);
        res.status(201).json({ id: result.insertId, email, nome });
    } catch (error) {
        console.error('Erro ao cadastrar:', error);
        res.status(500).json({ erro: 'Erro interno do servidor' });
    }
});

app.put('/usuario/:id', async (req, res) => {
    try {
        const { email, nome, senha } = req.body;
        const result = await Usuarios.atualizar(req.params.id, email, nome, senha);
        if (result.affectedRows === 0) {
            return res.status(404).json({ erro: 'Usuario não encontrado' });
        }
        res.status(200).json({ mensagem: 'Usuario atualizado com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar:', error);
        res.status(500).json({ erro: 'Erro interno do servidor' });
    }
});

app.delete('/usuario/:id', async (req, res) => {
    try {
        const result = await Usuarios.excluir(req.params.id);
        if (result.affectedRows === 0) {
            return res.status(404).json({ erro: 'Usuario não encontrado' });
        }
        res.status(200).json({ mensagem: 'Usuario excluído com sucesso' });
    } catch (error) {
        console.error('Erro ao excluir:', error);
        res.status(500).json({ erro: 'Erro interno do servidor' });
    }
});

// ---------- TAREFAS ----------

app.get('/tarefa', async (req, res) => {
    try {
        const idUsuario = req.query.usuario_id;
        const result = await Tarefas.consultar(idUsuario);
        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ erro: 'Nenhum recurso encontrado' });
        }
    } catch (error) {
        console.error('Erro na consulta:', error);
        res.status(500).json({ erro: 'Erro interno do servidor' });
    }
});

app.get('/tarefa/:id', async (req, res) => {
    try {
        const result = await Tarefas.consultarPorId(req.params.id);
        if (result.length > 0) {
            res.status(200).json(result[0]);
        } else {
            res.status(404).json({ erro: 'Tarefa não encontrada' });
        }
    } catch (error) {
        console.error('Erro na consulta:', error);
        res.status(500).json({ erro: 'Erro interno do servidor' });
    }
});

app.post('/tarefa', async (req, res) => {
    try {
        const { fk_usuario_id, titulo, descricao, status } = req.body;
        if (!fk_usuario_id || !titulo) {
            return res.status(400).json({ erro: 'fk_usuario_id e titulo são obrigatórios' });
        }
        const result = await Tarefas.cadastrar(fk_usuario_id, titulo, descricao, status);
        res.status(201).json({ id: result.insertId, fk_usuario_id, titulo, descricao, status: status || 'PENDENTE' });
    } catch (error) {
        console.error('Erro ao cadastrar:', error);
        res.status(500).json({ erro: 'Erro interno do servidor' });
    }
});

app.put('/tarefa/:id', async (req, res) => {
    try {
        const { titulo, descricao, status } = req.body;
        const result = await Tarefas.atualizar(req.params.id, titulo, descricao, status);
        if (result.affectedRows === 0) {
            return res.status(404).json({ erro: 'Tarefa não encontrada' });
        }
        res.status(200).json({ mensagem: 'Tarefa atualizada com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar:', error);
        res.status(500).json({ erro: 'Erro interno do servidor' });
    }
});

app.delete('/tarefa/:id', async (req, res) => {
    try {
        const result = await Tarefas.excluir(req.params.id);
        if (result.affectedRows === 0) {
            return res.status(404).json({ erro: 'Tarefa não encontrada' });
        }
        res.status(200).json({ mensagem: 'Tarefa excluída com sucesso' });
    } catch (error) {
        console.error('Erro ao excluir:', error);
        res.status(500).json({ erro: 'Erro interno do servidor' });
    }
});

app.listen(3000, () => {
    let data = new Date();
    console.log(`Sistema inicializado: \nInf:${data}`);
    console.log('http://localhost:3000/');
})
