import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'produtos', timestamps: false })
export class Products extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'nome',
  })
  product_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'descricao',
  })
  description: string;

  @Column({
    type: DataType.NUMBER,
    allowNull: false,
  })
  sku: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    field: 'visibilidade',
  })
  visibility: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  url: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  head_description: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  keywords: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'urlvideo',
  })
  url_video: string;

  @Column({
    type: DataType.NUMBER,
    allowNull: false,
    field: 'relevancia',
  })
  relevance: number;
}
