import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'imagens_produtos', timestamps: false })
export class ProductsImages extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'titulo',
  })
  title: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'nome',
  })
  product_url: string;

  @Column({
    type: DataType.NUMBER,
    allowNull: false,
    field: 'idProduto',
  })
  product_id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'cor',
  })
  color: string;

  @Column({
    type: DataType.NUMBER,
    allowNull: false,
  })
  principal: number;

  @Column({
    type: DataType.NUMBER,
    allowNull: false,
    field: 'logo',
  })
  product_logo: number;
}
