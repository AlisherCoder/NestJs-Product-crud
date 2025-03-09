import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import IProduct from './product-dto/dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productServise: ProductsService) {}

  @Get()
  findAll(@Query() query: { limit: string; offset: string }) {
    return this.productServise.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productServise.findOne(+id);
  }

  @Post()
  create(@Body() product: Omit<IProduct, 'id'>) {
    return this.productServise.create(product);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productServise.remove(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() product: Partial<IProduct>) {
    return this.productServise.update(+id, product);
  }
}
