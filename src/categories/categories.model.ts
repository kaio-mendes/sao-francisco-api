import {
  Table,
  Model,
  Column,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';
import { Products } from 'src/products/products.model';
import { CategoriesProducts } from './categories-products.model';

@Table({ tableName: 'categorias', timestamps: false })
export class Categories extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'nome',
  })
  categorie_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  url: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'imagem',
  })
  path_image: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  head_description: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'ordem',
  })
  sequence: number;

  @BelongsToMany(() => Products, () => CategoriesProducts)
  products: Products[];
}
