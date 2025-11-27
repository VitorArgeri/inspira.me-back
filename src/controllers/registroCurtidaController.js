import RegistroCurtidaModel from "../models/registroCurtidaModel.js";

class RegistroCurtidaController {
    // GET /api/registros-curtida
    async getAllRegistrosCurtida(req, res) {
        try {
            const registros = await RegistroCurtidaModel.findAll();
            res.json(registros);
        } catch (error) {
            console.error("Erro ao buscar registros de curtida:", error);
            res.status(500).json({ error: "Erro ao buscar registros de curtida" });
        }
    }

    // GET /api/registros-curtida/:id
    async getRegistroCurtidaById(req, res) {
        try {
            const { id } = req.params;
            const registro = await RegistroCurtidaModel.findById(id);
            if (!registro) {
                return res.status(404).json({ error: "Registro de curtida não encontrado" });
            }
            res.json(registro);
        } catch (error) {
            console.error("Erro ao buscar registro de curtida:", error);
            res.status(500).json({ error: "Erro ao buscar registro de curtida" });
        }
    }

    // POST /api/registros-curtida
    async createRegistroCurtida(req, res) {
        try {
            const { postId, userId } = req.body;
            if (postId === undefined) {
                return res.status(400).json({
                    error: "O campo 'postId' é obrigatório!",
                });
            }
            const novo = await RegistroCurtidaModel.create(postId, userId);
            if (!novo) {
                return res.status(400).json({ error: "Erro ao criar registro de curtida" });
            }
            res.status(201).json(novo);
        } catch (error) {
            console.error("Erro ao criar registro de curtida:", error);
            res.status(500).json({ error: "Erro ao criar registro de curtida" });
        }
    }

    // PUT /api/registros-curtida/:id
    async updateRegistroCurtida(req, res) {
        try {
            const { id } = req.params;
            const { postId, userId } = req.body;
            const atualizado = await RegistroCurtidaModel.update(id, postId, userId);
            if (!atualizado) {
                return res.status(404).json({ error: "Registro de curtida não encontrado" });
            }
            res.json(atualizado);
        } catch (error) {
            console.error("Erro ao atualizar registro de curtida:", error);
            res.status(500).json({ error: "Erro ao atualizar registro de curtida" });
        }
    }

    // DELETE /api/registros-curtida/:id
    async deleteRegistroCurtida(req, res) {
        try {
            const { id } = req.params;
            const result = await RegistroCurtidaModel.delete(id);
            if (!result) {
                return res.status(404).json({ error: "Registro de curtida não encontrado" });
            }
            res.status(204).end();
        } catch (error) {
            console.error("Erro ao remover registro de curtida:", error);
            res.status(500).json({ error: "Erro ao remover registro de curtida" });
        }
    }
}

export default new RegistroCurtidaController();
