import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Products } from './products.model';
import { Op } from 'sequelize';
import { PaginatedProducts } from './dto/paginatedProducts';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Products)
    private products: typeof Products,
  ) {}

  async findAll(offset: string): Promise<PaginatedProducts> {
    const parseOffset = Number(offset) || 0;
    const { rows, count } = await this.products.findAndCountAll({
      where: { visibility: 'S' },
      limit: 10,
      order: [['id', 'ASC']],
      offset: parseOffset,
    });

    return {
      data: rows,
      total: count,
      limit: 10,
      offset: parseOffset,
      hasMore: parseOffset + rows.length < count,
    };
  }

  async filterByCategory({
    category,
    offset,
  }: {
    category: string;
    offset: string;
  }) {
    const parseOffset = Number(offset) || 0;
    const { rows, count } = await this.products.findAndCountAll({
      where: {
        keyWords: {
          [Op.like]: `%${category.trim()}%`,
        },
        visibility: 'S',
      },
      limit: 10,
      order: [['id', 'ASC']],
      offset: parseOffset,
    });
    console.log('Request:', {
      offset,
      category,
    });
    return {
      data: rows,
      total: count,
      limit: 10,
      offset: parseOffset,
      hasMore: parseOffset + rows.length < count,
    };
  }
}
