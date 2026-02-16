import express from 'express';
import bodyParser from 'body-parser';
import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

interface User {
    id: string,
    name: string,
    email: string
}

const filePath = path.join(__dirname, '../files/users.json')

async function readUsers(filePath: string) {
    try {

        const data = await readFile(filePath, 'utf-8');

        return JSON.parse(data || '[]');
    } catch (err) {
        console.error('Error reading file:', err);
        return [];
    }
}

async function writeUsers(users: any[]) {
    try {
        await writeFile(filePath, JSON.stringify(users, null, 2), 'utf-8');
    } catch (err) {
        console.error('Error writing file:', err);
    }
}

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send({ author: 'Denis' });
});

app.get('/users', async (req, res) => {
    const data = await readUsers(filePath);
    res.send(data);
});

app.post('/users', async (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: 'Missing user or email' });
    }

    const users = await readUsers(filePath);
    const newUser = {
        id: uuidv4(),
        name,
        email
    };
    users.push(newUser);

    await writeUsers(users);
    res.status(201).json(newUser);
});

app.patch('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;

    const users = await readUsers(filePath);
    const index = users.findIndex((user: User) => user.id === id);
    console.log('index: ' + index);
    if (index === -1) return res.status(404).json({ error: 'User not found' });

    if (name) {
        users[index].name = name;
    }
    if (email) {
        users[index].email = email;
    }

    await writeUsers(users);
    res.json(users[index]);
});

app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    let users = await readUsers(filePath);
    const index = users.findIndex((user: User) => user.id === id);
    if (index === -1) return res.status(404).json({ error: 'User not found' });

    const deleted = users.splice(index, 1);
    await writeUsers(users);

    res.json({ deleted: deleted[0] });
});


app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});