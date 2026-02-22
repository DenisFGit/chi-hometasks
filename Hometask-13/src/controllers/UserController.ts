import {
    JsonController, Get, Post, Patch, Delete, Param, Body, HttpCode, NotFoundError,
} from 'routing-controllers';
import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import { AppDataSource } from "../data-source/data-source";
import { User } from '../entity/User';

import { UpdateUserDto } from '../dto/UserDto'


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
        return AppDataSource.getRepository(User).find();
    }

    @Get("/:id")
    getOne(@Param("id") id: number) {
        return AppDataSource.getRepository(User).findOneBy({ id });
    }

    @Post('/users')
    @HttpCode(201)
    async create(@Body() users: Partial<User>) {
        const user = AppDataSource.getRepository(User).create(users);
        return await AppDataSource.getRepository(User).save(user);
    }

    @Patch('/users/:id')
    async update(
        @Param('id') id: number,
        @Body() body: UpdateUserDto) {

        const repo = AppDataSource.getRepository(User);

        const user = await repo.findOneBy({ id });
        if (!user) {
            throw new NotFoundError('User not found');
        }

        if (body.name) {
            user.name = body.name;
        }
        if (body.email) {
            user.email = body.email;
        }

        return repo.save(user);
    }

    @Delete('/users/:id')
    async remove(@Param('id') id: number) {
        const repo = AppDataSource.getRepository(User);

        const user = await repo.findOneBy({ id });
        if (!user) {
            throw new NotFoundError('User not found');
        }

        await repo.remove(user);

        return { deleted: user };
    }

}