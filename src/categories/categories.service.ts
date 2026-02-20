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
    /*const items: Categories[] = await this.categories.findAll({
      where: {
        categorie_name: { [Op.like]: '%linha-domestica%' },
      },
      order: [['categorie_name', 'ASC']],
    });
    const formattedItems = items.map<CategoriesDto>((item) => ({
      categorie_name: item.categorie_name,
      path_image: item.path_image,
      head_description: item.head_description,
      sequence: item.sequence,
      url: `https://saofranciscobrasil.com.br/media/categorias/images/${item.path_image}`,
    }));
    return {
      data: formattedItems,
    };*/
    return this.categories.findAll({
      where: {
        url: { [Op.like]: '%linha-domestica%' },
        path_image: {
          [Op.ne]: null,
        },
      },
    });
  }
}
