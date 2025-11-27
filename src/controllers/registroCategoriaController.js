    import RegistroCategoriaModel from "../models/registroCategoriaModel.js";

class RegistroCategoriaController {
    // GET /api/registros-categoria
    async getAllRegistrosCategoria(req, res) {
        try {
            const registros = await RegistroCategoriaModel.findAll();
            res.json(registros);
        } catch (error) {
            console.error("Erro ao buscar registros de categoria:", error);
            res.status(500).json({ error: "Erro ao buscar registros de categoria" });
        }
    }

    // GET /api/registros-categoria/:id
    async getRegistroCategoriaById(req, res) {
        try {
            const { id } = req.params;
            const registro = await RegistroCategoriaModel.findById(id);
            if (!registro) {
                return res.status(404).json({ error: "Registro de categoria não encontrado" });
            }
            res.json(registro);
        } catch (error) {
            console.error("Erro ao buscar registro de categoria:", error);
            res.status(500).json({ error: "Erro ao buscar registro de categoria" });
        }
    }

    // POST /api/registros-categoria
    async createRegistroCategoria(req, res) {
        try {
            const { postId, categoryId, background } = req.body;
            if (postId === undefined || categoryId === undefined || background === undefined) {
                return res.status(400).json({
                    error: "Os campos 'postId', 'categoryId' e 'background' são obrigatórios!",
                });
            }
            const novo = await RegistroCategoriaModel.create(postId, categoryId, background);
            if (!novo) {
                return res.status(400).json({ error: "Erro ao criar registro de categoria" });
            }
            res.status(201).json(novo);
        } catch (error) {
            console.error("Erro ao criar registro de categoria:", error);
            res.status(500).json({ error: "Erro ao criar registro de categoria" });
        }
    }

    // PUT /api/registros-categoria/:id
    async updateRegistroCategoria(req, res) {
        try {
            const { id } = req.params;
            const { postId, categoryId, background } = req.body;
            const atualizado = await RegistroCategoriaModel.update(id, postId, categoryId, background);
            if (!atualizado) {
                return res.status(404).json({ error: "Registro de categoria não encontrado" });
            }
            res.json(atualizado);
        } catch (error) {
            console.error("Erro ao atualizar registro de categoria:", error);
            res.status(500).json({ error: "Erro ao atualizar registro de categoria" });
        }
    }

    // DELETE /api/registros-categoria/:id
    async deleteRegistroCategoria(req, res) {
        try {
            const { id } = req.params;
            const result = await RegistroCategoriaModel.delete(id);
            if (!result) {
                return res.status(404).json({ error: "Registro de categoria não encontrado" });
            }
            res.status(204).end();
        } catch (error) {
            console.error("Erro ao remover registro de categoria:", error);
            res.status(500).json({ error: "Erro ao remover registro de categoria" });
        }
    }
}

export default new RegistroCategoriaController();
