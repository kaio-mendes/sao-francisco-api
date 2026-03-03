import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Products } from './products.model';
import { PaginatedProducts } from './dto/paginatedProducts';
import { Categories } from 'src/categories/categories.model';
import { ProductsImages } from './products-image.model';
import { Op } from 'sequelize';

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

  async findProduct(url: string) {
    const product = await this.products.findOne({
      where: { url: url, visibility: 'S' },
      attributes: [
        'id',
        'product_name',
        'sku',
        'url',
        'description',
        'head_description',
        'url_video',
      ],
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
          as: 'images',
          required: false,
          where: { product_logo: 0 },
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
        {
          association: 'relatedProducts',
          where: { visibility: 'S' },
          attributes: ['id', 'product_name', 'url', 'sku'],
          through: { attributes: [] },
          required: false,
          include: [
            {
              model: ProductsImages,
              as: 'principal',
              required: false,
              where: { principal: 1 },
              attributes: ['product_url', 'title'],
            },
            {
              model: ProductsImages,
              as: 'logo',
              where: { product_logo: 1 },
              required: false,
              attributes: ['product_url', 'product_id', 'title'],
            },
          ],
        },
      ],
    });
    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }

    return product;
  }

  async findBySkuOrName({
    search = '',
    offset = '0',
  }: {
    search?: string;
    offset?: string;
  }) {
    const limit = 10;
    const parseOffset = Number(offset) || 0;

    const { rows, count } = await this.products.findAndCountAll({
      where: {
        [Op.or]: [
          { sku: { [Op.like]: `%${search}%` } },
          { product_name: { [Op.like]: `%${search}%` } },
        ],
        visibility: 'S',
      },
      limit,
      offset: parseOffset,
      attributes: ['id', 'product_name', 'sku', 'url'],
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
      ],
    });

    return {
      data: rows,
      total: count,
      limit,
      offset: parseOffset,
      hasMore: parseOffset + rows.length < count,
    };
  }
}
