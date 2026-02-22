import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1771696519070 implements MigrationInterface {
    name = 'InitialMigration1771696519070'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" text NOT NULL DEFAULT '', "email" text NOT NULL DEFAULT '', CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
