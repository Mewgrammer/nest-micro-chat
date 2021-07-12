import { MigrationInterface, QueryRunner } from 'typeorm';

export class initialMigration1626028685067 implements MigrationInterface {
  name = 'initialMigration1626028685067';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "public"."users" ("id" character varying NOT NULL, "email" character varying(127) NOT NULL, "name" character varying(127) NOT NULL, "password" character varying(255) NOT NULL, "createdAt" bigint NOT NULL, "updatedAt" bigint NOT NULL, "enum" "public"."users_enum_enum" NOT NULL DEFAULT '0', CONSTRAINT "UQ_12ffa5c867f6bb71e2690a526ce" UNIQUE ("email"), CONSTRAINT "UQ_66f45affe703c7c8a18c339d323" UNIQUE ("name"), CONSTRAINT "PK_a6cc71bedf15a41a5f5ee8aea97" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE UNIQUE INDEX "IDX_12ffa5c867f6bb71e2690a526c" ON "public"."users" ("email") `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."IDX_12ffa5c867f6bb71e2690a526c"`);
    await queryRunner.query(`DROP TABLE "public"."users"`);
  }
}
