import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {
  }

  getProductData() {
    return this.http.get<any[]>(`${this.apiUrl}/listProducts`);
  }

  getUserData() {
    return this.http.get<any[]>(`${this.apiUrl}/listUsers`);
  }

  getOneProductData(payload: Object) {
    return this.http.post(`${this.apiUrl}/getProductInfo`, payload);
  }

  addProduct(payload: Object) {
    return this.http.post(`${this.apiUrl}/addProduct`, payload);
  }

  addUser(payload: Object){
    return this.http.post(`${this.apiUrl}/add-user`, payload);
  }

  editProduct(id: string, payload: any): Observable<any> {
    const url = `${this.apiUrl}/editProduct/${id}`;
    return this.http.post<any>(url, payload);
  }

  editUser(id: String, payload: any): Observable<any> {
    const url = `${this.apiUrl}/update-user/${id}`;
    return this.http.put<any>(url, payload);
  }
  
  getUserDetails(id: string) {
    return this.http.get<any>(`${this.apiUrl}/user/${id}`);
  }

  deleteProduct(payload: Object) {
    return this.http.post(`${this.apiUrl}/deleteProduct`, payload);
  }

  deleteUser(payload: Object){
    return this.http.post(`${this.apiUrl}/delete-user` ,payload)
  }

  deleteOrder(payload: Object) {
    return this.http.post(`${this.apiUrl}/deleteOrder`, payload);
  }

  getOrders() {
    return this.http.get<any[]>(`${this.apiUrl}/getOrders`);
  }

  updateOrder(user_id: string, order_id: string, status: string) {
    return this.http.post(`${this.apiUrl}/updateOrder`, { user_id, order_id, status });
  } 

}