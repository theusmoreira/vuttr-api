import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddUserIdToTools1602153848352
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'tools',
      new TableColumn({
        name: 'user_id',
        type: 'uuid',
      }),
    );

    await queryRunner.createForeignKey(
      'tools',
      new TableForeignKey({
        name: 'ToolUser',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('tools', 'ToolUser');
    await queryRunner.dropColumn('tools', 'user_id');
  }
}
