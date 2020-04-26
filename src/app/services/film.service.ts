import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilmService {
  url = 'https://sheet.best/api/sheets/58dd3235-8a26-45fb-b0e6-6d226f8c3249';
  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return this.http.get(this.url);
  }
}
