/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenerativeAiService {

  serviceUrl = 'http://localhost:3000/openai/';
  restaurantUrl = 'http://localhost:3000/restaurant/';

  constructor(private httpClientObj: HttpClient) { }

  /**
   * get text
   * @param searchCriteria text
   * @returns 
   */
  getOpenAiSearchCriteria(searchCriteria): Observable<any> {
    return this.httpClientObj.post(`${this.serviceUrl}getSearchCriteria`, searchCriteria);
  }

  /**
   * get search image
   * @param searchCriteria search text
   * @returns 
   */
  getImage(searchCriteria: string): Observable<any> {
    return this.httpClientObj.get<any>(`${this.serviceUrl}searchImage/${searchCriteria}`);
  }

  /**
   * get text
   * @param searchCriteria text
   * @returns 
   */
  getRestaurantSearchCriteria(searchCriteria): Observable<any> {
    return this.httpClientObj.post(`${this.restaurantUrl}getSearchCriteria`, searchCriteria);
  }

  /**
   * get result based on llm chain
   * @param searchCriteria text
   * @returns 
   */
  getRestaurantSearchCriteriaLlmChain(searchCriteria): Observable<any> {
    return this.httpClientObj.post(`${this.restaurantUrl}llmChainGetSearchCriteria`, searchCriteria);
  }

  /**
   * get result based on llm chain
   * @param searchCriteria text
   * @returns 
   */
  getChainSequentialData(searchCriteria): Observable<any> {
    return this.httpClientObj.post(`${this.restaurantUrl}llmSequentialChain`, searchCriteria);
  }
}
