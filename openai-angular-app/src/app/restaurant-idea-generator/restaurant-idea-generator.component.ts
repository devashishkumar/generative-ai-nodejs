/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '@angular/core';
import { GenerativeAiService } from '../services/generative-ai.service';

@Component({
  selector: 'app-restaurant-idea-generator',
  templateUrl: './restaurant-idea-generator.component.html',
  styleUrls: ['./restaurant-idea-generator.component.css']
})
export class RestaurantIdeaGeneratorComponent {

  loading = false;
  llmChainLoading = false;
  formObj: any = {};
  langChainData: any = {};
  llmChainData: any = {};

  constructor(private generativeAiServiceObj: GenerativeAiService) {
  }

  /**
   * service call
   * @param formData form fields data
   */
  onClick(formData: any) {
    this.getLangChainData(formData);
  }

  /**
   * service call to get data as per user entered data
   * @param data search criteria entered by user
   */
  getLangChainData(data) {
    this.loading = true;
    this.generativeAiServiceObj.getRestaurantSearchCriteria(data).subscribe(response => {
      this.loading = false;
      this.langChainData = response;
    }, error => {
      this.loading = false;
    });
  }

  /**
   * service call to get data as per user entered data
   * @param data search criteria entered by user
   */
  getLlmChainData(data) {
    this.llmChainLoading = true;
    this.generativeAiServiceObj.getRestaurantSearchCriteriaLlmChain(data).subscribe(response => {
      this.llmChainLoading = false;
      this.llmChainData = response;
    }, error => {
      this.llmChainLoading = false;
    });
  }

}
