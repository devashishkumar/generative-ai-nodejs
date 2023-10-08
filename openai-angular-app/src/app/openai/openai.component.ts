import { Component } from '@angular/core';
import { GenerativeAiService } from '../services/generative-ai.service';

@Component({
  selector: 'app-openai',
  templateUrl: './openai.component.html',
  styleUrls: ['./openai.component.css']
})
export class OpenaiComponent {

  loading = false;
  imageLoading = false;
  formObj: any = {};
  langChainData: any = {};
  openAiImageData: any = {};

  constructor(private generativeAiServiceObj: GenerativeAiService) {
  }

  ngOnInit(): void {
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
    this.generativeAiServiceObj.getLangChainDataBySearchCriteria(data).subscribe(response => {
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
  getImage(data) {
    this.imageLoading = true;
    this.generativeAiServiceObj.getImage(data.image).subscribe(response => {
      this.imageLoading = false;
      this.openAiImageData = response;
    }, error => {
      this.imageLoading = false;
    });
  }

}
