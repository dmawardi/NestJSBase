import {MigrationInterface, QueryRunner} from "typeorm";

export class SchemaSync1620119958824 implements MigrationInterface {
    name = 'SchemaSync1620119958824'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coffee" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "coffee" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "coffee" ADD "description" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coffee" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "coffee" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "coffee" ADD "title" character varying NOT NULL`);
    }

}
