import 'reflect-metadata';
import { createExpressServer } from 'routing-controllers';
import { UserController } from './controllers/UserController';
import { AppDataSource } from './data-source/data-source';

const app = createExpressServer({
    controllers: [UserController],
    validation: true,
});

const initialDatabase = async () => {
    await AppDataSource.initialize()
}

initialDatabase();

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});