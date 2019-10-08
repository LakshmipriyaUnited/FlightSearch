import { Injectable } from '@angular/core';
import { Constants } from "./constant";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor( private http:HttpClient ) { }

  getSearchResults(){
    return this.http.get(Constants.SEARCH_URL)
                   
  }
}
