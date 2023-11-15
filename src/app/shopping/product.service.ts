import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Guitar } from '../models/guitar';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getAllProducts(): Observable<Guitar[]> {
    return this.httpClient.get<Guitar[]>(this.apiUrl + "/inventory");
  }

  getProduct(id: string): Observable<Guitar> {
    return this.httpClient.get<Guitar>(this.apiUrl + "/inventory/" + id);
  }

}
