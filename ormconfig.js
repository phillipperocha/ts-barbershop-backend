module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  // Todos os arquivos que estiverem nesse diretório e acabaram com .ts
  // será considerado uma migration
  migrations: ['./src/database/migrations/*.ts'],
  // E vamos dizer onde estarão as migrations, certamente no mesmo diretório
  cli: {
    migrationsDir: './src/database/migrations',
  },
};
