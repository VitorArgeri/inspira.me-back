import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs"; // Certifique-se de ter bcryptjs instalado

const prisma = new PrismaClient();

async function clearDatabase() {
    console.log("🧹 Limpando o banco de dados...");
    try {
        await prisma.registroCurtida.deleteMany();
        await prisma.registroCategoria.deleteMany();
        await prisma.postagem.deleteMany();
        await prisma.user.deleteMany();
        await prisma.categoria.deleteMany();
        console.log("✅ Limpeza concluída.");
    } catch (error) {
        console.log("⚠️ Banco já estava limpo ou erro ao limpar:", error.message);
    }
}

async function main() {
    await clearDatabase();

    // Criar um hash válido para a senha "123456"
    const passwordHash = await bcrypt.hash("123456", 10);

    console.log("\n👤 Criando usuários...");
    const user1 = await prisma.user.create({
        data: {
            name: "João Silva",
            username: "joao_s",
            email: "joao.s@exemplo.com",
            password: passwordHash, // Senha válida: 123456
            avatarUrl: "https://placehold.co/150x150/0000FF/FFFFFF?text=JS",
            bio: "Entusiasta de tecnologia e ficção científica. Publicando minhas ideias!",
        },
    });
    const user2 = await prisma.user.create({
        data: {
            name: "Maria Oliveira",
            username: "maria_o",
            email: "maria.o@exemplo.com",
            password: passwordHash, // Senha válida: 123456
            avatarUrl: "https://placehold.co/150x150/FF0000/FFFFFF?text=MO",
            bio: "Amante da natureza e da fotografia. Compartilhando meu dia a dia.",
        },
    });
    const user3 = await prisma.user.create({
        data: {
            name: "Carlos Souza",
            username: "carlos_s",
            email: "carlos.s@exemplo.com",
            password: passwordHash, // Senha válida: 123456
            avatarUrl: "https://placehold.co/150x150/00FF00/000000?text=CS",
            bio: "Desenvolvedor full-stack e fã de café.",
        },
    });
    const user4 = await prisma.user.create({
        data: {
            name: "Ana Costa",
            username: "ana_c",
            email: "ana.c@exemplo.com",
            password: passwordHash, // Senha válida: 123456
            avatarUrl: "https://placehold.co/150x150/FFFF00/000000?text=AC",
            bio: "Viajante e criadora de conteúdo sobre culinária.",
        },
    });
    const user5 = await prisma.user.create({
        data: {
            name: "Pedro Lima",
            username: "pedro_l",
            email: "pedro.l@exemplo.com",
            password: passwordHash, // Senha válida: 123456
            avatarUrl: "https://placehold.co/150x150/FF00FF/FFFFFF?text=PL",
            bio: "Músico e produtor. O som move o mundo.",
        },
    });
    console.log("✅ 5 usuários criados.");

    console.log("\n🏷️ Criando categorias...");
    const catTecnologia = await prisma.categoria.create({ data: { description: "Tecnologia e Inovação" } });
    const catViagem = await prisma.categoria.create({ data: { description: "Viagens e Aventuras" } });
    const catCulinaria = await prisma.categoria.create({ data: { description: "Gastronomia e Receitas" } });
    const catEsportes = await prisma.categoria.create({ data: { description: "Esportes e Fitness" } });
    const catArte = await prisma.categoria.create({ data: { description: "Arte e Cultura" } });
    console.log("✅ 5 categorias criadas.");

    console.log("\n📰 Criando postagens...");
    const post1 = await prisma.postagem.create({
        data: {
            ownerPost: user1.username,
            description: "Aprendendo sobre o novo framework de IA. Incrível o potencial!",
            userId: user1.id,
            numberLikes: 2,
            numberShares: 0,
        },
    });
    const post2 = await prisma.postagem.create({
        data: {
            ownerPost: user2.username,
            description: "Foto do pôr do sol nas montanhas. Paz total. ",
            userId: user2.id,
            numberLikes: 3,
            numberShares: 1,
        },
    });
    const post3 = await prisma.postagem.create({
        data: {
            ownerPost: user3.username,
            description: "Dica rápida de produtividade no VS Code. #coding #dev",
            userId: user3.id,
            numberLikes: 1,
            numberShares: 0,
        },
    });
    const post4 = await prisma.postagem.create({
        data: {
            ownerPost: user4.username,
            description: "Receita de bolo de chocolate super fácil! 🍰",
            userId: user4.id,
            numberLikes: 4,
            numberShares: 2,
        },
    });
    const post5 = await prisma.postagem.create({
        data: {
            ownerPost: user5.username,
            description: "Nova música lançada, ouçam no link da bio!",
            userId: user5.id,
            numberLikes: 2,
            numberShares: 0,
        },
    });
    const post6 = await prisma.postagem.create({
        data: {
            ownerPost: user1.username,
            description: "Revisão do último filme de ação que assisti. Vale a pena!",
            userId: user1.id,
            numberLikes: 0,
            numberShares: 0,
        },
    });
    const post7 = await prisma.postagem.create({
        data: {
            ownerPost: user2.username,
            description: "Primeiro dia de treino na academia. Foco! 💪",
            userId: user2.id,
            numberLikes: 1,
            numberShares: 0,
        },
    });
    const post8 = await prisma.postagem.create({
        data: {
            ownerPost: user3.username,
            description: "Concluído o projeto da semana! Sucesso.",
            userId: user3.id,
            numberLikes: 3,
            numberShares: 1,
        },
    });
    const post9 = await prisma.postagem.create({
        data: {
            ownerPost: user4.username,
            description: "Melhores destinos para viajar em 2026. Qual é o seu favorito?",
            userId: user4.id,
            numberLikes: 2,
            numberShares: 0,
        },
    });
    const post10 = await prisma.postagem.create({
        data: {
            ownerPost: user5.username,
            description: "Instrumentos musicais que todo iniciante deveria conhecer.",
            userId: user5.id,
            numberLikes: 1,
            numberShares: 0,
        },
    });
    console.log("✅ 10 postagens criadas.");

    console.log("\n👍 Criando registros de curtidas...");

    await prisma.registroCurtida.create({ data: { postId: post1.id, userId: user2.id } });
    await prisma.registroCurtida.create({ data: { postId: post1.id, userId: user3.id } });

    await prisma.registroCurtida.create({ data: { postId: post2.id, userId: user1.id } });
    await prisma.registroCurtida.create({ data: { postId: post2.id, userId: user3.id } });
    await prisma.registroCurtida.create({ data: { postId: post2.id, userId: user4.id } });

    await prisma.registroCurtida.create({ data: { postId: post3.id, userId: user1.id } });

    await prisma.registroCurtida.create({ data: { postId: post4.id, userId: user1.id } });
    await prisma.registroCurtida.create({ data: { postId: post4.id, userId: user2.id } });
    await prisma.registroCurtida.create({ data: { postId: post4.id, userId: user3.id } });
    await prisma.registroCurtida.create({ data: { postId: post4.id, userId: user5.id } });

    await prisma.registroCurtida.create({ data: { postId: post5.id, userId: user1.id } });
    await prisma.registroCurtida.create({ data: { postId: post5.id, userId: user2.id } });

    await prisma.registroCurtida.create({ data: { postId: post7.id, userId: user4.id } });

    await prisma.registroCurtida.create({ data: { postId: post8.id, userId: user1.id } });
    await prisma.registroCurtida.create({ data: { postId: post8.id, userId: user2.id } });
    await prisma.registroCurtida.create({ data: { postId: post8.id, userId: user5.id } });

    await prisma.registroCurtida.create({ data: { postId: post9.id, userId: user5.id } });
    await prisma.registroCurtida.create({ data: { postId: post9.id, userId: user3.id } });

    await prisma.registroCurtida.create({ data: { postId: post10.id, userId: user4.id } });

    await prisma.postagem.update({ where: { id: post1.id }, data: { numberLikes: 2 } });
    await prisma.postagem.update({ where: { id: post2.id }, data: { numberLikes: 3 } });
    await prisma.postagem.update({ where: { id: post3.id }, data: { numberLikes: 1 } });
    await prisma.postagem.update({ where: { id: post4.id }, data: { numberLikes: 4 } });
    await prisma.postagem.update({ where: { id: post5.id }, data: { numberLikes: 2 } });
    await prisma.postagem.update({ where: { id: post7.id }, data: { numberLikes: 1 } });
    await prisma.postagem.update({ where: { id: post8.id }, data: { numberLikes: 3 } });
    await prisma.postagem.update({ where: { id: post9.id }, data: { numberLikes: 2 } });
    await prisma.postagem.update({ where: { id: post10.id }, data: { numberLikes: 1 } });

    console.log("✅ 16 registros de curtidas criados e postagens atualizadas.");

    console.log("\n📂 Criando registros de categorias (Tags)...");
    await prisma.registroCategoria.create({ data: { postId: post1.id, categoryId: catTecnologia.id, background: "#1a73e8" } });
    await prisma.registroCategoria.create({ data: { postId: post2.id, categoryId: catViagem.id, background: "#34a853" } });
    await prisma.registroCategoria.create({ data: { postId: post3.id, categoryId: catTecnologia.id, background: "#1a73e8" } });
    await prisma.registroCategoria.create({ data: { postId: post4.id, categoryId: catCulinaria.id, background: "#fbbc05" } });
    await prisma.registroCategoria.create({ data: { postId: post5.id, categoryId: catArte.id, background: "#ea4335" } });
    await prisma.registroCategoria.create({ data: { postId: post6.id, categoryId: catArte.id, background: "#ea4335" } });
    await prisma.registroCategoria.create({ data: { postId: post7.id, categoryId: catEsportes.id, background: "#4285f4" } });
    await prisma.registroCategoria.create({ data: { postId: post8.id, categoryId: catTecnologia.id, background: "#1a73e8" } });
    await prisma.registroCategoria.create({ data: { postId: post9.id, categoryId: catViagem.id, background: "#34a853" } });
    await prisma.registroCategoria.create({ data: { postId: post10.id, categoryId: catArte.id, background: "#ea4335" } });
    console.log("✅ 10 registros de categorias criados.");

    console.log("\n🎉 Seed completo! Dados básicos de Social Media criados.");
}

try {
    await main();
} catch (e) {
    console.error("❌ Erro no seed:", e);
    process.exit(1);
} finally {
    await prisma.$disconnect();
}