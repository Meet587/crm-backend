import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoMigration1750325632385 implements MigrationInterface {
    name = 'AutoMigration1750325632385'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "mfaSecret" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "users" ADD "isMfaEnabled" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "follow_ups" ALTER COLUMN "property_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "deals" ALTER COLUMN "deal_value" TYPE numeric`);
        await queryRunner.query(`ALTER TABLE "deals" ALTER COLUMN "finalized_date" SET DEFAULT '"2025-06-19T09:33:56.207Z"'`);
        await queryRunner.query(`ALTER TABLE "commissions" ALTER COLUMN "amount" TYPE numeric`);
        await queryRunner.query(`ALTER TABLE "builders" ALTER COLUMN "commission_rate" TYPE numeric`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "builders" ALTER COLUMN "commission_rate" TYPE numeric`);
        await queryRunner.query(`ALTER TABLE "commissions" ALTER COLUMN "amount" TYPE numeric`);
        await queryRunner.query(`ALTER TABLE "deals" ALTER COLUMN "finalized_date" SET DEFAULT '2025-04-21'`);
        await queryRunner.query(`ALTER TABLE "deals" ALTER COLUMN "deal_value" TYPE numeric`);
        await queryRunner.query(`ALTER TABLE "follow_ups" ALTER COLUMN "property_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isMfaEnabled"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "mfaSecret"`);
    }

}
