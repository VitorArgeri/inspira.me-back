import express from "express";
import CategoriaController from "../controllers/categoriaController.js";

const categoriaRouter = express.Router();

// GET /api/categorias - Listar todos os categorias
categoriaRouter.get("/", CategoriaController.getAllCategorias);

// GET /api/categorias/:id - Obter um categoria pelo ID
categoriaRouter.get("/:id", CategoriaController.getCategoriaById);

// POST /api/categorias - Criar um novo categoria
categoriaRouter.post("/", CategoriaController.createCategoria);

// PUT /api/categorias/:id - Atualizar um categoria
categoriaRouter.put("/:id", CategoriaController.updateCategoria);

// DELETE /api/categorias/:id - Remover um categoria
categoriaRouter.delete("/:id", CategoriaController.deleteCategoria);

export default categoriaRouter;
