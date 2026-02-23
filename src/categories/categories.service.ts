import { Injectable } from '@nestjs/common';
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

  getByUrl(url: string) {
    return this.categories.findOne({
      where: {
        url,
      },
    });
  }
}
