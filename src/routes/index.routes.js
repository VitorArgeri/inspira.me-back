import express from "express";

// Importar todas as rotas
import authRouter from "./auth.routes.js";
import postsRouter from "./postsRouter.js";
import registroCurtidaRouter from "./registroCurtidaRouter.js";
import categoriaRouter from "./categoriaRouter.js";
import registroCategoriaRouter from "./registroCategoriaRouter.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Rotas públicas
router.use("/auth", authRouter);
router.use("/posts", postsRouter);
router.use("/registros-curtida", registroCurtidaRouter);
router.use("/categorias", categoriaRouter);
router.use("/registros-categoria", registroCategoriaRouter);

// Rotas protegidas
router.use(authMiddleware);


export default router;