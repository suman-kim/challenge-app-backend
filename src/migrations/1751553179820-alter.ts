import { MigrationInterface, QueryRunner } from "typeorm";

export class Alter1751553179820 implements MigrationInterface {
    name = 'Alter1751553179820'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`bio\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`testColumn\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`testColumn\` varchar(255) NULL COMMENT '사용자 테스트 컬럼'`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`bio\` varchar(255) NULL COMMENT '사용자 소개'`);
    }

}
