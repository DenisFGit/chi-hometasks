import {
    JsonController, Get, Post, Patch, Delete, Param, Body, HttpCode, NotFoundError,
} from 'routing-controllers';
import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

import { CreateUserDto, UpdateUserDto } from '../dto/UserDto'

interface User {
    id: string;
    name: string;
    email: string;
}

const filePath = path.join(__dirname, '../../files/users.json');

async function readUsers(): Promise<User[]> {
    try {
        const data = await readFile(filePath, 'utf-8');
        return JSON.parse(data || '[]');
    } catch {
        return [];
    }
}

async function writeUsers(users: User[]) {
    await writeFile(filePath, JSON.stringify(users, null, 2), 'utf-8');
}

@JsonController()
export class UserController {

    @Get('/')
    getAuthor() {
        return { author: 'Denis' };
    }

    @Get('/users')
    async getAll() {
        return await readUsers();
    }

    @Post('/users')
    @HttpCode(201)
    async create(@Body() body: CreateUserDto) {
        const { name, email } = body;

        const users = await readUsers();

        const newUser: User = {
            id: uuidv4(),
            name,
            email
        };

        users.push(newUser);
        await writeUsers(users);

        return newUser;
    }

    @Patch('/users/:id')
    async update(
        @Param('id') id: string,
        @Body() body: UpdateUserDto) {

        const users = await readUsers();

        const index = users.findIndex(user => user.id === id);
        if (index === -1) {
            throw new NotFoundError('User not found');
        }

        if (body.name) {
            users[index].name = body.name;
        }
        if (body.email) {
            users[index].email = body.email;
        }

        await writeUsers(users);

        return users[index];
    }

    @Delete('/users/:id')
    async remove(@Param('id') id: string) {
        const users = await readUsers();

        const index = users.findIndex(user => user.id === id);
        if (index === -1) {
            throw new NotFoundError('User not found');
        }

        const deleted = users.splice(index, 1);
        await writeUsers(users);

        return { deleted: deleted[0] };
    }
}