import { Injectable } from '@nestjs/common';
import IProduct from './product-dto/dto';

@Injectable()
export class ProductsService {
  products: any[] = [];
  constructor() {}

  findAll(query: { limit: string; offset: string }) {
    let take = Number(query.limit) || 10;
    let prev = Number(query.offset) || 1;
    prev = (prev - 1) * take;
    let data = this.products.slice(prev, prev + take);
    return {
      data,
      total_item: this.products.length,
    };
  }

  findOne(id: number) {
    let product = this.products.find((val) => val?.id == id);
    if (!product) return 'Not found product';
    return product;
  }

  create(product: Omit<IProduct, 'id'>) {
    let len = this.products.length;
    let newProduct = {
      ...product,
      id: len != 0 ? this.products.at(-1)?.id! + 1 : 1,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, product: Partial<IProduct>) {
    let findIndex = this.products.findIndex((val) => val.id == id);
    if (findIndex == -1) return 'Not found product';

    this.products[findIndex] = {
      ...this.products[findIndex],
      ...product,
    };

    return this.products[findIndex];
  }

  remove(id: number) {
    let findIndex = this.products.findIndex((val) => val.id == id);

    if (findIndex == -1) return 'Not found prodcut';

    this.products = this.products.filter((val) => val.id !== id);

    return this.products[findIndex];
  }
}
