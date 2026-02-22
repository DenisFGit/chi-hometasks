import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'text', default: '' })
    name!: string;

    @Column({ type: 'text', default: '' })
    email!: string;
}
