  name      String
  username  String   @unique
  email     String   @unique
  password  String
  avatarUrl String
  bio       String

  // Relacionamentos
  posts     Postagem[]
  likes     RegistroCurtida[]