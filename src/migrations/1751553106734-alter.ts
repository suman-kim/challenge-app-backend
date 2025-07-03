import { MigrationInterface, QueryRunner } from "typeorm";

export class Alter1751553106734 implements MigrationInterface {
    name = 'Alter1751553106734'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`testColumn\` varchar(255) NULL COMMENT '사용자 테스트 컬럼'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`testColumn\``);
    }

}
