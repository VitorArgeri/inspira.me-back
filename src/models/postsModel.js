import prisma from "../../prisma/prisma.js";

class PostsModel {
    async findAll() {
        const posts = await prisma.post.findMany({
            orderBy: { createdAt: "desc" },
            include: { user: true, likes: true, categories: true },
        });
        return posts;
    }

    async findById(id) {
        const post = await prisma.post.findUnique({
            where: { id: Number(id) },
            include: { user: true, likes: true, categories: true },
        });
        return post;
    }

    async create(ownerPost, description, userId, numberLikes, numberShares) {
        const novo = await prisma.post.create({
            data: { ownerPost, description, userId, numberLikes, numberShares },
        });
        return novo;
    }


    async update(id, ownerPost, description, userId, numberLikes, numberShares) {
        const post = await this.findById(id);
        if (!post) return null;

        const data = {};
        if (ownerPost !== undefined) data.ownerPost = ownerPost;
        if (description !== undefined) data.description = description;
        if (userId !== undefined) data.userId = userId;
        if (numberLikes !== undefined) data.numberLikes = numberLikes;
        if (numberShares !== undefined) data.numberShares = numberShares;        

        const atualizado = await prisma.post.update({
            where: { id: Number(id) },
            data,
        });
        return atualizado;
    }

    async delete(id) {
        const post = await this.findById(id);
        if (!post) return null;
        await prisma.post.delete({ where: { id: Number(id) } });
        return true;
    }
}

export default new PostsModel();
