import { MigrationInterface, QueryRunner } from "typeorm";

export class Alter1751851458199 implements MigrationInterface {
    name = 'Alter1751851458199'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` COMMENT '사용자 테이블'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` COMMENT ''`);
    }

}
