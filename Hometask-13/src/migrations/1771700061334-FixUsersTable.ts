import { MigrationInterface, QueryRunner } from "typeorm";

export class FixUsersTable1771700061334 implements MigrationInterface {
    name = 'FixUsersTable1771700061334'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" text NOT NULL DEFAULT '', "email" text NOT NULL DEFAULT '', CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
