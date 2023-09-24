import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenerativeAiService {

  serviceUrl = 'http://localhost:3000/openai/';


  constructor(private httpClientObj: HttpClient) { }

  getLangChainDataBySearchCriteria(searchCriteria: string): Observable<any> {
    return this.httpClientObj.get<any>(`${this.serviceUrl}getSearchCriteria/${searchCriteria}`);
  }
}
