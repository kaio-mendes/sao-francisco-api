import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Products } from './products.model';
import { PaginatedProducts } from './dto/paginatedProducts';
import { Categories } from 'src/categories/categories.model';
import { ProductsImages } from './products-image.model';

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
      attributes: ['id', 'product_name', 'sku', 'url'],
      limit: 10,
      order: [['id', 'ASC']],
      offset: parseOffset,
      include: [
        {
          model: ProductsImages,
          as: 'logo',
          where: { product_logo: 1 },
          required: false,
          attributes: ['product_url', 'product_id', 'title'],
        },
        {
          model: ProductsImages,
          as: 'principal',
          where: { principal: 1 },
          required: false,
        },
        {
          model: Categories,
          as: 'categories',
          attributes: [
            'categorie_name',
            'url',
            'path_image',
            'head_description',
          ],
        },
      ],
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
      where: { visibility: 'S' },
      attributes: ['id', 'product_name', 'sku', 'url'],
      limit: 10,
      order: [['id', 'ASC']],
      offset: parseOffset,
      include: [
        {
          model: ProductsImages,
          as: 'logo',
          where: { product_logo: 1 },
          required: false,
          attributes: ['product_url', 'product_id', 'title'],
        },
        {
          model: ProductsImages,
          as: 'principal',
          where: { principal: 1 },
          required: false,
        },
        {
          model: Categories,
          as: 'categories',
          attributes: [
            'categorie_name',
            'url',
            'path_image',
            'head_description',
          ],
          where: {
            url: category,
          },
        },
      ],
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
