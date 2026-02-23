import { Table, Model, ForeignKey, Column } from 'sequelize-typescript';
import { Categories } from './categories.model';
import { Products } from 'src/products/products.model';

@Table({ tableName: 'categorias_produtos', timestamps: false })
export class CategoriesProducts extends Model {
  @ForeignKey(() => Categories)
  @Column({ field: 'idcategoria' })
  idcategoria: number;

  @ForeignKey(() => Products)
  @Column({ field: 'idproduto' })
  idproduto: number;
}
