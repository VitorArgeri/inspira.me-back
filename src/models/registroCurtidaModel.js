import prisma from "../../prisma/prisma.js";

class RegistroCurtidaModel {
    async findAll() {
        const likes = await prisma.registroCurtida.findMany({
            orderBy: { createdAt: "desc" },
            include: { post: true, user: true },
        });
        return likes;
    }

    async findById(id) {
        const registro = await prisma.registroCurtida.findUnique({
            where: { id: Number(id) },
            include: { post: true, user: true },
        });
        return registro;
    }

    async create(postId, userId) {
        const novo = await prisma.registroCurtida.create({
            data: { postId, userId },
        });
        return novo;
    }

    async update(id, postId, userId) {
        const registro = await this.findById(id);
        if (!registro) return null;

        const data = {};
        if (userId !== undefined) data.userId = userId;
        if (postId !== undefined) data.postId = postId;

        const atualizado = await prisma.registroCurtida.update({
            where: { id: Number(id) },
            data,
        });
        return atualizado;
    }

    async delete(id) {
        const registro = await this.findById(id);
        if (!registro) return null;
        await prisma.registroCurtida.delete({ where: { id: Number(id) } });
        return true;
    }
}

export default new RegistroCurtidaModel();
