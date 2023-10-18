import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  getProduct(payload: Object){
    return this.http.post(`${this.apiUrl}/getProductInfo`, payload);
  }
  
  addToCart(payload: Object) {
    return this.http.post(`${this.apiUrl}/addToCart`, payload);
  }
  
  getCart(userId: string) {
    return this.http.post<any[]>(`${this.apiUrl}/getCart`, { user_id: userId });
  }

  deleteCartItem(id: String){
    return this.http.post<any[]>(`${this.apiUrl}/deleteCartItem`, { id: id });
  }

  deleteAllData(user_id: string) {
    return this.http.post<any[]>(`${this.apiUrl}/deleteAllCartItem`, { user_id: user_id });
  }

  saveOrder(payload: Object) {
    return this.http.post(`${this.apiUrl}/saveOrder`, payload);
  }

  getOrders() {
    return this.http.get<any[]>(`${this.apiUrl}/getOrders`);
  }

  getOrder(user_id: string) {
    return this.http.post<any[]>(`${this.apiUrl}/getOrder`, { user_id: user_id });
  }

  updateOrder(user_id: string, order_id: string, status: string) {
    return this.http.post(`${this.apiUrl}/updateOrder`, { user_id, order_id, status });
  } 
  
  deleteOrder(id: String){
    return this.http.post<any[]>(`${this.apiUrl}/deleteOrder`, { id: id });
  }

  getCardDetails(userId: string) {
    return this.http.post<any[]>(`${this.apiUrl}/getCardDetails`, { userId: userId });
  }

  saveCard(payload: Object){
    return this.http.post(`${this.apiUrl}/saveCard`, payload);
  }

  addToWishlist(payload: Object) {
    return this.http.post(`${this.apiUrl}/addToWishlist`, payload);
  }
  
  getWishlist(userId: string) {
    return this.http.post<any[]>(`${this.apiUrl}/getWishlist`, { user_id: userId });
  }

  deleteWishlistItem(id: String){
    return this.http.post<any[]>(`${this.apiUrl}/deleteWishlistItem`, { id: id });
  }

}
