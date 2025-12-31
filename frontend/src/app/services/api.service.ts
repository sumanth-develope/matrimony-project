import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private BASE_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getEvents(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/events`);
  }

  bookEvent(data: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/bookings`, data);
  }
}
