import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Product } from './models/product.model';
import { ProductCategory } from './models/product-category.model';

interface GetResponseProducts {
  _embedded: {
    products: Product[]
  };
}

interface GetResponseProductCategories {
  _embedded: {
    product_categories: ProductCategory[]
  };
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  getProductList(): Observable<Product[]> {
    return this.http
      .get<GetResponseProducts>(`/api/products?size=100`)
      .pipe(
        map(result => result._embedded.products)
      );
  }

  getProductListByCategory(categoryId: number): Observable<Product[]> {
    return this.http
      .get<GetResponseProducts>(`/api/products/search/category-id?id=${categoryId}`)
      .pipe(
        map(result => result._embedded.products)
      );
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.http
      .get<GetResponseProductCategories>(`/api/product-categories`)
      .pipe(
        map(result => result._embedded.product_categories)
      );
  }
}
