import express from "express";
import PostController from "../controllers/postsController.js";

const postRouter = express.Router();

// GET /api/posts - Listar todos os posts
postRouter.get("/", PostController.getAllPosts);

// GET /api/posts/:id - Obter um post pelo ID
postRouter.get("/:id", PostController.getPostById);

// POST /api/posts - Criar um novo post
postRouter.post("/", PostController.createPost);

// PUT /api/posts/:id - Atualizar um post
postRouter.put("/:id", PostController.updatePost);

// DELETE /api/posts/:id - Remover um post
postRouter.delete("/:id", PostController.deletePost);

export default postRouter;
