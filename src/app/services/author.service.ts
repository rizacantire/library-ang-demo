import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Author } from '../models/author';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  apiUrl = "https://localhost:44393/api/"
  constructor(private httpClient: HttpClient) { }

  getAuthorss():Observable<ListResponseModel<Author>>{
    let newPath = this.apiUrl + "authors/getall"
    return this.httpClient.get<ListResponseModel<Author>>(newPath);
  }

  add(author:Author):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"authors/add",author)
  }

  getAuthorsByCategory(categoryId:number):Observable<ListResponseModel<Author>>{
    let newPath = this.apiUrl +"authors/getbycategory?categoryId="+categoryId
    return this.httpClient.get<ListResponseModel<Author>>(newPath);
  }
}
