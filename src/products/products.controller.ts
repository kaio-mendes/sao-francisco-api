import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsServices: ProductsService) {}

  @Get()
  findAll(
    @Query('category') category: string,
    @Query('offset') offset: string,
    @Query('search') search: string,
  ) {
    if (search) {
      return this.productsServices.findBySkuOrName({ search, offset });
    }
    if (category) {
      return this.productsServices.filterByCategory({ category, offset });
    }
    return this.productsServices.findAll(offset);
  }

  @Get(':url')
  findProduct(@Param('url') url: string) {
    return this.productsServices.findProduct(url);
  }
}
