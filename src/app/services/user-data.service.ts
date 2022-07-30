import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  private baseUrl:string = 'assets/user-data.json';

  constructor(private http:HttpClient) { }

  getUsersData():Observable<any>{
    return this.http.get<any>(this.baseUrl);
  }

}
