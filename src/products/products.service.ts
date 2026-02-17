import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Products } from './products.model';
import { Op } from 'sequelize';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Products)
    private products: typeof Products,
  ) {}

  findAll() {
    return this.products.findAll({
      limit: 10,
      offset: 10,
    });
  }

  async filterByCategory(category: string) {
    const categorizedItems = await this.products.findAll({
      where: {
        keyWords: {
          [Op.like]: `%${category.trim()}%`,
        },
      },
    });
    if (categorizedItems.length <= 0) {
      return 'Nenhum item encontrado';
    }
    return categorizedItems;
  }
}
