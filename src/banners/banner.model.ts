import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'banners', timestamps: false })
export class Banner extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'nomeimagem',
  })
  filepath: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  url: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  caption: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'nome',
  })
  name: string;
}
