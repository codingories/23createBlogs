import {MigrationInterface, QueryRunner, TableIndex} from 'typeorm'

export class AddNuiqueUsernameToUsers1595863732855 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createIndex('users',new TableIndex({
            name: 'users_username', columnNames: ['username'],
            isUnique: true
        })) // 这样创建username唯一
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex('users', 'users_username')
    }
}
