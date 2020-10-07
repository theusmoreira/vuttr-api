module.exports = {
    name: 'default',
    type: 'postgres',
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "docker",
    database: "vuttr",
    entities: [
      './src/database/entities/*.ts'
    ],
    migrations: [
      './src/database/migrations/*.ts'
    ],
    cli: {
      migrationsDir: './src/database/migrations',
    },
}
