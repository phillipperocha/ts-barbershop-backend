// Importaremos o Table do TypeORM para criar tabela
import { MigrationInterface, QueryRunner, Table, Timestamp } from 'typeorm';

// Vamos exportar como default para tirar o erro
export default class CreateAppointments1589073667325
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Vamos executar a criação da tabela
    await queryRunner.createTable(
      new Table({
        name: 'appointments',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'provider',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'date',
            type: 'timestamp with time zone',
            isNullable: false,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // E agora vamos deletar a tabela
    await queryRunner.dropTable('appointments');
  }
}
