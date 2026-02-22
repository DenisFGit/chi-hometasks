import { DataSource } from 'typeorm';
import { User } from './entity/User';

export default new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: "lesson13",
    password: "password",
    database: "first_db",
    migrations: ['./src/migrations/*.ts'],
    synchronize: false,
    entities: [
        User,
        __dirname + "/entities/**/*.entity.ts"
    ]
});