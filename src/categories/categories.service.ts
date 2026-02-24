import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Categories } from './categories.model';
import { Op } from 'sequelize';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Categories)
    private categories: typeof Categories,
  ) {}

  findAll() {
    return this.categories.findAll({
      order: [['sequence', 'asc']],
      where: {
        url: { [Op.like]: '%linha-domestica%' },
        path_image: {
          [Op.ne]: null,
        },
      },
    });
  }

  async getByUrl(url: string) {
    const category = await this.categories.findOne({
      where: {
        url,
      },
    });

    if (!category) {
      throw new NotFoundException('Produto não encontrado');
    }

    return category;
  }
}
