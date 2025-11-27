import UserModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class AuthController {
  // Listar todos os usuários
  async getAllUsers(req, res) {
    try {
      const users = await UserModel.findAll();
      res.json(users);
    } catch (error) {
      console.error("Erro ao listar usuários:", error);
      res.status(500).json({ error: "Erro ao listar usuários" });
    }
  }

  // Registrar novo usuário
  async register(req, res) {
    try {
      const { name, username, email, password, avatarUrl, bio } = req.body;

      // Validação básica
      if (!name || !username || !email || !password || !avatarUrl || !bio) {
        return res
          .status(400)
          .json({ error: "Os campos nome, nome de usuário, email, senha, avatarUrl e bio são obrigatórios!" });
      }

      // Verificar se o usuário já existe
      const userExists =  await UserModel.findByEmail(email);
      if (userExists) {
        return res.status(400).json({ error: "Este email já está em uso!" });
      }

      // Hash da senha
      const hashedPassword = await bcrypt.hash(password, 10);

      // Criar objeto do usuário
      const data = {
        name,
        username,
        email,
        password: hashedPassword,
        avatarUrl,
        bio,
      };

      // Criar usuário
      const user = await UserModel.create(data);

      return res.status(201).json({
        message: "Usuário criado com sucesso!",
        user,
      });
    } catch (error) {
      console.error("Erro ao criar um novo usuário: ", error);
      res.status(500).json({ error: "Erro ao criar um novo usuário" });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Validação básica
      if (!email || !password) {
        return res
          .status(400)
          .json({ error: "Os campos email e senha são obrigatórios!" });
      }

      // Verificar se o usuário existe
      const userExistsEmail = await UserModel.findByEmail(email);
      if (!userExistsEmail) {
        return res.status(401).json({ error: "Credenciais inválidas!" });
      }


      // Verificar senha
      const isPasswordValid = await bcrypt.compare(
        password,
        userExistsEmail.password
      );
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Credenciais inválidas!" });
      }

      // Gerar Token JWT
      const token = jwt.sign(
        {
          id: userExistsEmail.id,
          name: userExistsEmail.name,
          email: userExistsEmail.email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "24h",
        }
      );

      return res.json({
        message: "Login realizado com sucesso!",
        token,
        userExistsEmail,
      });
    } catch (error) {
      console.error("Erro ao fazer login: ", error);
      res.status(500).json({ error: "Erro ao fazer login!" });
    }
  }
}

export default new AuthController();
