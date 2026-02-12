import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'downloads', timestamps: false })
export class Downloads extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'descricao',
  })
  description: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  url: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'nomearquivo',
  })
  archiveName: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'dadosadicionais',
  })
  additionalData: string;
}
