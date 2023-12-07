import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1701966262037 implements MigrationInterface {
    name = 'Init1701966262037'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`created_date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`deleted_date\` datetime(6) NULL, \`name\` varchar(255) NOT NULL COMMENT '유저 이름', \`email\` varchar(255) NOT NULL COMMENT '유저 이메일', \`profile\` varchar(255) NULL COMMENT '프로필 사진 (필수 아님)', \`phone\` varchar(255) NULL COMMENT '핸드폰 번호 (필수 아님)', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`auth\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`created_date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`deleted_date\` datetime(6) NULL, \`social_id\` varchar(255) NOT NULL, \`social_type\` varchar(255) NOT NULL, \`social_access_token\` varchar(255) NOT NULL, \`social_refresh_token\` varchar(255) NOT NULL, \`app_refresh_token\` varchar(255) NOT NULL, \`user_id\` bigint UNSIGNED NOT NULL, UNIQUE INDEX \`REL_9922406dc7d70e20423aeffadf\` (\`user_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`lesson_registration\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`created_date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`payment_status\` varchar(255) NOT NULL COMMENT '결제 상태', \`start_date\` varchar(255) NULL COMMENT '기간반일 경우 강의 시작일, 학생이 강의를 들어간 기준일지, 학생이 들어간 해당 강의 시작일인지 고민중이며 후자일 경우 실제로 클래스에는 강의 시작일이 있어서 필요는 없어보임 ', \`end_date\` varchar(255) NULL COMMENT 'start_date와 동일', \`total_times\` varchar(255) NULL COMMENT '총 회수, 추가로 연장하면 회수가 결제한 금액의 회수만큼 늘어남', \`used_times\` varchar(255) NULL COMMENT '총 회수에서 몇회 소진했는지 기록', \`type\` varchar(255) NOT NULL, \`student_id\` bigint UNSIGNED NOT NULL, \`lesson_id\` bigint UNSIGNED NOT NULL, INDEX \`IDX_4553381f0a239ef53b518c78a6\` (\`type\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`student\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`created_date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL COMMENT '학생 이름', \`phone\` varchar(255) NOT NULL COMMENT '학생 휴대전화 번호', \`gender\` varchar(255) NOT NULL COMMENT '학생 성별', \`profile\` varchar(255) NOT NULL COMMENT '프로필 이미지', \`center_id\` bigint UNSIGNED NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`teacher\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`created_date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL COMMENT '강사 이름', \`phone\` varchar(255) NOT NULL COMMENT '강사 휴대전화 번호', \`gender\` varchar(255) NOT NULL COMMENT '강사 성별', \`profile\` varchar(255) NOT NULL COMMENT '프로필 이미지', \`center_id\` bigint UNSIGNED NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`center\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`created_date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`deleted_date\` datetime(6) NULL, \`name\` varchar(255) NOT NULL COMMENT '센터명', \`address\` varchar(255) NOT NULL COMMENT '센터 주소', \`main_phone\` varchar(255) NOT NULL COMMENT '센터 대표 번호', \`profile\` varchar(255) NOT NULL COMMENT '프로필 이미지, 없을 시 기본 이미지 배정', \`user_id\` bigint UNSIGNED NOT NULL, UNIQUE INDEX \`REL_8639ce749b6e84db632ecc7bb8\` (\`user_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`lesson\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`created_date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`deleted_date\` datetime(6) NULL, \`name\` varchar(255) NOT NULL COMMENT '클래스 이름', \`type\` varchar(255) NOT NULL COMMENT '기간반 / 회차반', \`start_date\` varchar(255) NOT NULL COMMENT '클래스 시작일', \`end_date\` varchar(255) NOT NULL COMMENT '클래스 종료일', \`memo\` varchar(255) NOT NULL COMMENT '클래스 메모', \`tuition_fee\` varchar(255) NOT NULL COMMENT '수강료', \`repeat_date\` varchar(255) NOT NULL COMMENT '반복 요일 ex) 월, 화, 수', \`center_id\` bigint UNSIGNED NOT NULL, \`teacher_id\` bigint UNSIGNED NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`lesson_category\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`created_date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`category_id\` bigint UNSIGNED NOT NULL, \`lesson_id\` bigint UNSIGNED NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`category\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`created_date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`parent_id\` bigint UNSIGNED NULL COMMENT '카테고리가 대분류 = null, 소분류 일 경우 pk값을 parent_id로 사용', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`auth\` ADD CONSTRAINT \`FK_9922406dc7d70e20423aeffadf3\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`lesson_registration\` ADD CONSTRAINT \`FK_ae50071061c50f00b92125afdde\` FOREIGN KEY (\`student_id\`) REFERENCES \`student\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`lesson_registration\` ADD CONSTRAINT \`FK_c3c60bc3e1e5f823ba3ffeb7c5f\` FOREIGN KEY (\`lesson_id\`) REFERENCES \`lesson\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`student\` ADD CONSTRAINT \`FK_e00155c7fe2d15ffecaa8702135\` FOREIGN KEY (\`center_id\`) REFERENCES \`center\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`teacher\` ADD CONSTRAINT \`FK_e3cfad7c2e9d853e1f8feca0d87\` FOREIGN KEY (\`center_id\`) REFERENCES \`center\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`center\` ADD CONSTRAINT \`FK_8639ce749b6e84db632ecc7bb89\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`lesson\` ADD CONSTRAINT \`FK_6ff1b3e9e528ed4e3ce1a86d21c\` FOREIGN KEY (\`center_id\`) REFERENCES \`center\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`lesson\` ADD CONSTRAINT \`FK_cfe1b52c46b3d6f61ad5be1663c\` FOREIGN KEY (\`teacher_id\`) REFERENCES \`teacher\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`lesson_category\` ADD CONSTRAINT \`FK_05f1a692a72166736f91a6a4012\` FOREIGN KEY (\`category_id\`) REFERENCES \`category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`lesson_category\` ADD CONSTRAINT \`FK_244c3dc70c89542ba146c84533d\` FOREIGN KEY (\`lesson_id\`) REFERENCES \`lesson\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`category\` ADD CONSTRAINT \`FK_1117b4fcb3cd4abb4383e1c2743\` FOREIGN KEY (\`parent_id\`) REFERENCES \`category\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`category\` DROP FOREIGN KEY \`FK_1117b4fcb3cd4abb4383e1c2743\``);
        await queryRunner.query(`ALTER TABLE \`lesson_category\` DROP FOREIGN KEY \`FK_244c3dc70c89542ba146c84533d\``);
        await queryRunner.query(`ALTER TABLE \`lesson_category\` DROP FOREIGN KEY \`FK_05f1a692a72166736f91a6a4012\``);
        await queryRunner.query(`ALTER TABLE \`lesson\` DROP FOREIGN KEY \`FK_cfe1b52c46b3d6f61ad5be1663c\``);
        await queryRunner.query(`ALTER TABLE \`lesson\` DROP FOREIGN KEY \`FK_6ff1b3e9e528ed4e3ce1a86d21c\``);
        await queryRunner.query(`ALTER TABLE \`center\` DROP FOREIGN KEY \`FK_8639ce749b6e84db632ecc7bb89\``);
        await queryRunner.query(`ALTER TABLE \`teacher\` DROP FOREIGN KEY \`FK_e3cfad7c2e9d853e1f8feca0d87\``);
        await queryRunner.query(`ALTER TABLE \`student\` DROP FOREIGN KEY \`FK_e00155c7fe2d15ffecaa8702135\``);
        await queryRunner.query(`ALTER TABLE \`lesson_registration\` DROP FOREIGN KEY \`FK_c3c60bc3e1e5f823ba3ffeb7c5f\``);
        await queryRunner.query(`ALTER TABLE \`lesson_registration\` DROP FOREIGN KEY \`FK_ae50071061c50f00b92125afdde\``);
        await queryRunner.query(`ALTER TABLE \`auth\` DROP FOREIGN KEY \`FK_9922406dc7d70e20423aeffadf3\``);
        await queryRunner.query(`DROP TABLE \`category\``);
        await queryRunner.query(`DROP TABLE \`lesson_category\``);
        await queryRunner.query(`DROP TABLE \`lesson\``);
        await queryRunner.query(`DROP INDEX \`REL_8639ce749b6e84db632ecc7bb8\` ON \`center\``);
        await queryRunner.query(`DROP TABLE \`center\``);
        await queryRunner.query(`DROP TABLE \`teacher\``);
        await queryRunner.query(`DROP TABLE \`student\``);
        await queryRunner.query(`DROP INDEX \`IDX_4553381f0a239ef53b518c78a6\` ON \`lesson_registration\``);
        await queryRunner.query(`DROP TABLE \`lesson_registration\``);
        await queryRunner.query(`DROP INDEX \`REL_9922406dc7d70e20423aeffadf\` ON \`auth\``);
        await queryRunner.query(`DROP TABLE \`auth\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
