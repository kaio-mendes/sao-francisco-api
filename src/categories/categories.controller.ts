import { Controller, Get, Query } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  get(@Query('url') url?: string) {
    if (url) {
      return this.categoriesService.getByUrl(url);
    }

    return this.categoriesService.findAll();
  }
}
