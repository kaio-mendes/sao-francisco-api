import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  BelongsToMany,
} from 'sequelize-typescript';
import { Categories } from 'src/categories/categories.model';
import { CategoriesProducts } from 'src/categories/categories-products.model';
import { ProductsImages } from './products-image.model';
import { RelatableProducts } from './products-relatable.model';

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
    type: DataType.INTEGER,
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
    type: DataType.INTEGER,
    allowNull: false,
    field: 'relevancia',
  })
  relevance: number;

  @HasMany(() => ProductsImages, { foreignKey: 'product_id', as: 'images' })
  images: ProductsImages[];

  @HasMany(() => ProductsImages, { foreignKey: 'product_id', as: 'logo' })
  logo: ProductsImages[];

  @HasMany(() => ProductsImages, { foreignKey: 'product_id', as: 'principal' })
  principal: ProductsImages[];

  @BelongsToMany(() => Categories, () => CategoriesProducts)
  categories: Categories[];

  @BelongsToMany(() => Products, {
    through: () => RelatableProducts,
    as: 'relatedProducts',
    foreignKey: 'idpai',
    otherKey: 'idfilho',
  })
  relatedProducts: Products[];

  @BelongsToMany(() => Products, {
    through: () => RelatableProducts,
    as: 'relatedTo',
    foreignKey: 'idfilho',
    otherKey: 'idpai',
  })
  relatedTo: Products[];
}
