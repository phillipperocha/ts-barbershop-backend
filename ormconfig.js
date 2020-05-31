// Vamos criar agora um array
module.exports = [
  {
    name: 'default',
    type: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: ['./src/modules/**/infra/typeorm/entities/*.ts'],
    migrations: ['./src/shared/infra/typeorm/migrations/*.ts'],
    cli: {
      migrationsDir: '/src/shared/infra/typeorm/migrations',
    },
  },
  // E configurar o nosso mongo
  {
    name: 'mongo',
    type: 'mongodb',
    host: process.env.MONGO_HOST,
    port: process.env.MONGO_PORT,
    database: process.env.MONGO_NAME,
    // Usamos essa configuração para remover um errinho quando utilizamos a configuração do mongo
    useUnifiedTopology: true,
    // E não serão mais entities, serão schemas
    entities: ['./src/modules/**/infra/typeorm/schemas/*.ts'],
  },
];
