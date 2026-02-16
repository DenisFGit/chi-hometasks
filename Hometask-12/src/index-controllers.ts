import 'reflect-metadata';
import { createExpressServer } from 'routing-controllers';
import { UserController } from './controllers/UserController';

const app = createExpressServer({
    controllers: [UserController],
    validation: true,
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});