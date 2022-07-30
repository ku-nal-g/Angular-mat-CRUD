import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewsApiService {

  private baseUrl = 'https://newsapi.org/v2/top-headlines?country=in&apiKey=29d570d2ae9146b89a7ace31691bc694';

  constructor(private http:HttpClient) { }

  get(country:string):Observable<any>{
    return this.http.get<any>(`https://newsapi.org/v2/top-headlines?country=${country}&apiKey=29d570d2ae9146b89a7ace31691bc694`);
  }
}
