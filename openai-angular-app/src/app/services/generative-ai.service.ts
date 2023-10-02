import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenerativeAiService {

  serviceUrl = 'http://localhost:3000/openai/';

  constructor(private httpClientObj: HttpClient) { }

  /**
   * get text
   * @param searchCriteria text
   * @returns 
   */
  getLangChainDataBySearchCriteria(searchCriteria: string): Observable<any> {
    return this.httpClientObj.get<any>(`${this.serviceUrl}getSearchCriteria/${searchCriteria}`);
  }

  /**
   * get search image
   * @param searchCriteria search text
   * @returns 
   */
  getImage(searchCriteria: string): Observable<any> {
    return this.httpClientObj.get<any>(`${this.serviceUrl}searchImage/${searchCriteria}`);
  }
}
