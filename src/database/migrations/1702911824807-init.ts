import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1702911824807 implements MigrationInterface {
  name = 'Init1702911824807';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`lesson\` DROP COLUMN \`type\``);
    await queryRunner.query(`ALTER TABLE \`lesson\` DROP COLUMN \`start_date\``);
    await queryRunner.query(`ALTER TABLE \`lesson\` DROP COLUMN \`end_date\``);
    await queryRunner.query(
      `ALTER TABLE \`lesson\` ADD \`type\` enum ('Duration Lesson', 'Session Lesson') NOT NULL COMMENT 'Duration Class / Session Class'`,
    );
    await queryRunner.query(`ALTER TABLE \`lesson\` ADD \`start_date\` datetime(6) NOT NULL COMMENT '클래스 시작일'`);
    await queryRunner.query(`ALTER TABLE \`lesson\` ADD \`end_date\` datetime(6) NOT NULL COMMENT '클래스 종료일'`);
    await queryRunner.query(
      `ALTER TABLE \`lesson\` ADD \`capacity\` int NOT NULL COMMENT '클래스 수강 가능 최대 인원'`,
    );
    await queryRunner.query(`ALTER TABLE \`lesson\` ADD \`start_time\` datetime NOT NULL COMMENT '클래스 시작 시간'`);
    await queryRunner.query(`ALTER TABLE \`lesson\` ADD \`end_time\` datetime NOT NULL COMMENT '클래스 종료 시간'`);
    await queryRunner.query(
      `ALTER TABLE \`lesson_registration\` CHANGE \`start_date\` \`start_date\` varchar(255) NULL COMMENT '기간반일 경우 강의 시작일, 학생이 강의를 들어간 기준일지, 학생이 들어간 해당 강의 시작일인지 고민중이며 후자일 경우 실제로 클래스에는 강의 시작일이 있어서 필요는 없어보임 '`,
    );
    await queryRunner.query(
      `ALTER TABLE \`lesson_registration\` CHANGE \`end_date\` \`end_date\` varchar(255) NULL COMMENT 'start_date와 동일'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`lesson_registration\` CHANGE \`total_times\` \`total_times\` varchar(255) NULL COMMENT '총 회수, 추가로 연장하면 회수가 결제한 금액의 회수만큼 늘어남'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`lesson_registration\` CHANGE \`used_times\` \`used_times\` varchar(255) NULL COMMENT '총 회수에서 몇회 소진했는지 기록'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`lesson_registration\` CHANGE \`used_times\` \`used_times\` varchar(255) NOT NULL COMMENT '총 회수에서 몇회 소진했는지 기록'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`lesson_registration\` CHANGE \`total_times\` \`total_times\` varchar(255) NOT NULL COMMENT '총 회수, 추가로 연장하면 회수가 결제한 금액의 회수만큼 늘어남'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`lesson_registration\` CHANGE \`end_date\` \`end_date\` varchar(255) NOT NULL COMMENT 'start_date와 동일'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`lesson_registration\` CHANGE \`start_date\` \`start_date\` varchar(255) NOT NULL COMMENT '기간반일 경우 강의 시작일, 학생이 강의를 들어간 기준일지, 학생이 들어간 해당 강의 시작일인지 고민중이며 후자일 경우 실제로 클래스에는 강의 시작일이 있어서 필요는 없어보임 '`,
    );
    await queryRunner.query(`ALTER TABLE \`lesson\` DROP COLUMN \`end_time\``);
    await queryRunner.query(`ALTER TABLE \`lesson\` DROP COLUMN \`start_time\``);
    await queryRunner.query(`ALTER TABLE \`lesson\` DROP COLUMN \`capacity\``);
    await queryRunner.query(`ALTER TABLE \`lesson\` DROP COLUMN \`end_date\``);
    await queryRunner.query(`ALTER TABLE \`lesson\` DROP COLUMN \`start_date\``);
    await queryRunner.query(`ALTER TABLE \`lesson\` DROP COLUMN \`type\``);
    await queryRunner.query(`ALTER TABLE \`lesson\` ADD \`end_date\` datetime(6) NOT NULL COMMENT '클래스 종료일'`);
    await queryRunner.query(`ALTER TABLE \`lesson\` ADD \`start_date\` datetime(6) NOT NULL COMMENT '클래스 시작일'`);
    await queryRunner.query(
      `ALTER TABLE \`lesson\` ADD \`type\` enum ('Duration Lesson', 'Session Lesson') NOT NULL COMMENT 'Duration Class / Session Class'`,
    );
  }
}
