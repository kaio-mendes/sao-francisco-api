import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Products } from './products.model';

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

  @ForeignKey(() => Products)
  @Column({ field: 'idProduto', type: DataType.INTEGER })
  product_id: number;

  @BelongsTo(() => Products, { foreignKey: 'product_id', as: 'product' })
  product: Products;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'cor',
  })
  color: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  principal: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'logo',
  })
  product_logo: number;
}
