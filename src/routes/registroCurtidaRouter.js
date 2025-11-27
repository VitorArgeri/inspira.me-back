import express from "express";
import RegistroCurtidaController from "../controllers/registroCurtidaController.js";

const registroCurtidaRouter = express.Router();

// GET /api/registros-curtida - Listar todos os registros de curtida
registroCurtidaRouter.get("/", RegistroCurtidaController.getAllRegistrosCurtida);

// GET /api/registros-curtida/:id - Obter um registro pelo ID
registroCurtidaRouter.get("/:id", RegistroCurtidaController.getRegistroCurtidaById);

// POST /api/registros-curtida - Criar um novo registro
registroCurtidaRouter.post("/", RegistroCurtidaController.createRegistroCurtida);

// PUT /api/registros-curtida/:id - Atualizar um registro
registroCurtidaRouter.put("/:id", RegistroCurtidaController.updateRegistroCurtida);

// DELETE /api/registros-curtida/:id - Remover um registro
registroCurtidaRouter.delete("/:id", RegistroCurtidaController.deleteRegistroCurtida);

export default registroCurtidaRouter;
