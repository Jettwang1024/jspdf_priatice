import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IProduct, PartialProduct } from '../../models/system/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private productsUrl = 'assets/demo/data/products.json'; // 本地 JSON 檔案的位置
  private apiUrl = `${environment.ApiUrl}/Product`;
  // PRODUCT_URL = '/assets/demo/data/product.json'; 
  PRODUCT_URL ='https://api.escuelajs.co/api/v1/products';
  insert_url = 'http://localhost:7205/api/Product/insert';
  
  constructor(private http: HttpClient) {}

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.productsUrl).pipe(
      map((data: any) => {
        // 確保 data 是一個陣列
        return Array.isArray(data) ? data : [];
      })
    );
  }

  insertProducts(products: PartialProduct[]): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.insert_url, products, { headers });
  }
}

  
  // PRODUCT_URL ='https://api.escuelajs.co/api/v1/products';
 