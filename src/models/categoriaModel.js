import prisma from "../../prisma/prisma.js";

class CategoriaModel {
    async findAll() {
        const categorias = await prisma.categoria.findMany({
            orderBy: { createdAt: "desc" },
            include: { registrosCategorias: true },
        });
        return categorias;
    }

    async findById(id) {
        const categoria = await prisma.categoria.findUnique({
            where: { id: Number(id) },
            include: { registrosCategorias: true },
        });
        return categoria;
    }

    async create(description) {
        const novo = await prisma.categoria.create({ data: { description } });
        return novo;
    }

    async update(id, description) {
        const categoria = await this.findById(id);
        if (!categoria) return null;

        const data = {};
        if (description !== undefined) data.description = description;
        const atualizado = await prisma.categoria.update({
            where: { id: Number(id) },
            data,
        });
        return atualizado;
    }

    async delete(id) {
        const categoria = await this.findById(id);
        if (!categoria) return null;
        await prisma.categoria.delete({ where: { id: Number(id) } });
        return true;
    }
}

export default new CategoriaModel();
