import { MigrationInterface, QueryRunner } from "typeorm";

export class Alter1751851415950 implements MigrationInterface {
    name = 'Alter1751851415950'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`id\` \`id\` varchar(36) NOT NULL COMMENT '사용자 ID'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`email\` \`email\` varchar(255) NOT NULL COMMENT '사용자 이메일 & 로그인 아이디'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`username\` \`username\` varchar(255) NOT NULL COMMENT '사용자 이름'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`passwordHash\` \`passwordHash\` varchar(255) NOT NULL COMMENT '비밀번호 해시'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`rank\` \`rank\` enum ('bronze', 'silver', 'gold', 'platinum', 'diamond', 'master', 'grandmaster', 'challenger', 'legend') NOT NULL COMMENT '사용자 랭크' DEFAULT 'bronze'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`points\` \`points\` int NOT NULL COMMENT '사용자 점수' DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`createdAt\` \`createdAt\` datetime(6) NOT NULL COMMENT '생성일' DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`updatedAt\` \`updatedAt\` datetime(6) NOT NULL COMMENT '수정일' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`updatedAt\` \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`createdAt\` \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`points\` \`points\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`rank\` \`rank\` enum ('BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT', 'MASTER') NOT NULL DEFAULT 'BEGINNER'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`passwordHash\` \`passwordHash\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`username\` \`username\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`email\` \`email\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`id\` \`id\` varchar(36) NOT NULL`);
    }

}
