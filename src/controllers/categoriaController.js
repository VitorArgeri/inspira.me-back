import CategoriaModel from "../models/categoriaModel.js";

class CategoriaController {
    // GET /api/categorias
    async getAllCategorias(req, res) {
        try {
            const categorias = await CategoriaModel.findAll();
            res.json(categorias);
        } catch (error) {
            console.error("Erro ao buscar categorias:", error);
            res.status(500).json({ error: "Erro ao buscar categorias" });
        }
    }

    // GET /api/categorias/:id
    async getCategoriaById(req, res) {
        try {
            const { id } = req.params;
            const categoria = await CategoriaModel.findById(id);
            if (!categoria) {
                return res.status(404).json({ error: "Categoria não encontrado" });
            }
            res.json(categoria);
        } catch (error) {
            console.error("Erro ao buscar categoria:", error);
            res.status(500).json({ error: "Erro ao buscar categoria" });
        }
    }

    // POST /api/categorias
    async createCategoria(req, res) {
        try {
            const { description } = req.body;
            if (!description === undefined) {
                return res
                    .status(400)
                    .json({ error: "O campo 'description' é obrigatório" });
            }
            const novo = await CategoriaModel.create(description);
            if (!novo) {
                return res.status(400).json({ error: "Erro ao criar categoria" });
            }
            res.status(201).json(novo);
        } catch (error) {
            console.error("Erro ao criar categoria:", error);
            res.status(500).json({ error: "Erro ao criar categoria" });
        }
    }

    // PUT /api/categorias/:id
    async updateCategoria(req, res) {
        try {
            const { id } = req.params;
            const { nome, preco, tipo, imgUrl } = req.body;
            const atualizado = await CategoriaModel.update(id, nome, preco, tipo, imgUrl);
            if (!atualizado) {
                return res.status(404).json({ error: "Categoria não encontrado" });
            }
            res.json(atualizado);
        } catch (error) {
            console.error("Erro ao atualizar categoria:", error);
            res.status(500).json({ error: "Erro ao atualizar categoria" });
        }
    }

    // DELETE /api/categorias/:id
    async deleteCategoria(req, res) {
        try {
            const { id } = req.params;
            const result = await CategoriaModel.delete(id);
            if (!result) {
                return res.status(404).json({ error: "Categoria não encontrado" });
            }
            res.status(204).end();
        } catch (error) {
            console.error("Erro ao remover categoria:", error);
            res.status(500).json({ error: "Erro ao remover categoria" });
        }
    }
}

export default new CategoriaController();
