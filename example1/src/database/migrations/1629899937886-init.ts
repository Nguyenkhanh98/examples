import {MigrationInterface, QueryRunner} from "typeorm";

export class init1629899937886 implements MigrationInterface {
    name = 'init1629899937886'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "device_states" ("id" SERIAL NOT NULL, "temperature" integer, "humidity" integer, "occupancy" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT '"2021-08-25T13:59:00.689Z"', "updated_at" TIMESTAMP WITH TIME ZONE, "deviceId" integer, CONSTRAINT "PK_d9153fef861f3a1f948786aa640" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "devices" ("id" SERIAL NOT NULL, "deviceId" character varying NOT NULL, "deviceName" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT '"2021-08-25T13:59:00.689Z"', "updated_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_666c9b59efda8ca85b29157152c" UNIQUE ("deviceId"), CONSTRAINT "PK_b1514758245c12daf43486dd1f0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_666c9b59efda8ca85b29157152" ON "devices" ("deviceId") `);
        await queryRunner.query(`ALTER TABLE "device_states" ADD CONSTRAINT "FK_c14b434d94fc0d61c3b10cab421" FOREIGN KEY ("deviceId") REFERENCES "devices"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "device_states" DROP CONSTRAINT "FK_c14b434d94fc0d61c3b10cab421"`);
        await queryRunner.query(`DROP INDEX "IDX_666c9b59efda8ca85b29157152"`);
        await queryRunner.query(`DROP TABLE "devices"`);
        await queryRunner.query(`DROP TABLE "device_states"`);
    }

}
