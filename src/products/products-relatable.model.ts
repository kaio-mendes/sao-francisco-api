import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { Products } from './products.model';

@Table({ tableName: 'produtos_relacionados', timestamps: false })
export class RelatableProducts extends Model<RelatableProducts> {
  @ForeignKey(() => Products)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'idpai',
    primaryKey: true,
  })
  parent_id: number;

  @ForeignKey(() => Products)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'idfilho',
    primaryKey: true,
  })
  child_id: number;
}
