import { Component, OnInit } from '@angular/core';
import { GenerativeAiService } from './services/generative-ai.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [GenerativeAiService]
})
export class AppComponent implements OnInit {
  title = 'openai-angular-app';
  loading = false;
  formObj: any = {};
  langChainData: any = {};

  constructor(private generativeAiServiceObj: GenerativeAiService) {}

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
    this.generativeAiServiceObj.getLangChainDataBySearchCriteria(data.searchCriteria).subscribe(response => {
      this.loading = false;
      this.langChainData = response;
    }, error => {
      this.loading = false;
    });
  }
}
