import PostsModel from "../models/postsModel.js";

class PostController {
    // GET /api/posts
    async getAllPosts(req, res) {
        try {
            const posts = await PostsModel.findAll();
            res.json(posts);
        } catch (error) {
            console.error("Erro ao buscar posts:", error);
            res.status(500).json({ error: "Erro ao buscar posts" });
        }
    }

    // GET /api/posts/:id
    async getPostById(req, res) {
        try {
            const { id } = req.params;
            const post = await PostsModel.findById(id);
            if (!post) {
                return res.status(404).json({ error: "Post não encontrado" });
            }
            res.json(post);
        } catch (error) {
            console.error("Erro ao buscar post:", error);
            res.status(500).json({ error: "Erro ao buscar post" });
        }
    }

    // POST /api/posts
    async createPost(req, res) {
        try {
            const { ownerPost, description, userId, numberLikes, numberShares } = req.body;
            if (!ownerPost || !description || userId || !numberLikes || numberShares  === undefined) {
                return res.status(400).json({
                    error: "Os campos 'ownerPost', 'description', 'userId', 'numberLikes' e 'numberShares' são obrigatórios!",
                });
            }

            const novo = await PostsModel.create(ownerPost, description, userId, numberLikes, numberShares);
            if (!novo) {
                return res.status(400).json({ error: "Erro ao criar post" });
            }
            res.status(201).json(novo);
        } catch (error) {
            console.error("Erro ao criar post:", error);
            res.status(500).json({ error: "Erro ao criar post" });
        }
    }

    // PUT /api/posts/:id
    async updatePost(req, res) {
        try {
            const { id } = req.params;
            const { ownerPost, description, userId, numberLikes, numberShares } = req.body;
            const atualizado = await PostsModel.update(id, ownerPost, description, userId, numberLikes, numberShares);
            if (!atualizado) {
                return res.status(404).json({ error: "Post não encontrado" });
            }
            res.json(atualizado);
        } catch (error) {
            console.error("Erro ao atualizar post:", error);
            res.status(500).json({ error: "Erro ao atualizar post" });
        }
    }

    // DELETE /api/posts/:id
    async deletePost(req, res) {
        try {
            const { id } = req.params;
            const result = await PostsModel.delete(id);
            if (!result) {
                return res.status(404).json({ error: "Post não encontrado" });
            }
            res.status(204).end();
        } catch (error) {
            console.error("Erro ao remover post:", error);
            res.status(500).json({ error: "Erro ao remover post" });
        }
    }
}

export default new PostController();
