import prisma from "../../prisma/prisma.js";

class RegistroCategoriaModel {
    async findAll() {
        const registros = await prisma.registroCategoria.findMany({
            orderBy: { createdAt: "desc" },
            include: { post: true, category: true },
        });
        return registros;
    }

    async findById(id) {
        const registro = await prisma.registroCategoria.findUnique({
            where: { id: Number(id) },
            include: { post: true, category: true },
        });
        return registro;
    }

    async create(postId, categoryId, background) {
        const novo = await prisma.registroCategoria.create({
            data: { postId, categoryId, background },
        });
        return novo;
    }


    async update(id, postId, categoryId, background) {
        const registro = await this.findById(id);
        if (!registro) return null;

        const data = {};
        if (postId !== undefined) data.postId = postId;
        if (categoryId !== undefined) data.categoryId = categoryId;
        if (background !== undefined) data.background = background;

        const atualizado = await prisma.registroCategoria.update({
            where: { id: Number(id) },
            data,
        });
        return atualizado;
    }

    async delete(id) {
        const registro = await this.findById(id);
        if (!registro) return null;
        await prisma.registroCategoria.delete({ where: { id: Number(id) } });
        return true;
    }
}

export default new RegistroCategoriaModel();
