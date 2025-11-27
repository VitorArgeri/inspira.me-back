import express from "express";
import RegistroCategoriaController from "../controllers/registroCategoriaController.js";

const registroCategoriaRouter = express.Router();

// GET /api/registros-categoria - Listar todos os registros de categoria
registroCategoriaRouter.get("/", RegistroCategoriaController.getAllRegistrosCategoria);

// GET /api/registros-categoria/:id - Obter um registro pelo ID
registroCategoriaRouter.get("/:id", RegistroCategoriaController.getRegistroCategoriaById);

// POST /api/registros-categoria - Criar um novo registro
registroCategoriaRouter.post("/", RegistroCategoriaController.createRegistroCategoria);

// PUT /api/registros-categoria/:id - Atualizar um registro
registroCategoriaRouter.put("/:id", RegistroCategoriaController.updateRegistroCategoria);

// DELETE /api/registros-categoria/:id - Remover um registro
registroCategoriaRouter.delete("/:id", RegistroCategoriaController.deleteRegistroCategoria);

export default registroCategoriaRouter;
