import { Controller, Get, Query } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsServices: ProductsService) {}

  @Get()
  findAll(@Query('category') category: string) {
    if (category) {
      return this.productsServices.filterByCategory(category);
    }
    return this.productsServices.findAll();
  }
}
