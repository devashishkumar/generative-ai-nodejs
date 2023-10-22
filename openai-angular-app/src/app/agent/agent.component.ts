/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '@angular/core';
import { GenerativeAiService } from "../services/generative-ai.service";

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css']
})
export class AgentComponent {
  loading = false;
  serviceResponse: any = {};

  constructor(private generativeAiServiceObj: GenerativeAiService) {

  }

  onClick() {
    console.log("click event");
    this.loading = true;
    this.generativeAiServiceObj.getTemperature("What is the weather in New New Delhi?").subscribe(response => {
      this.loading = false;
      if (response) {
        this.serviceResponse = response;
      }
      console.log(response);
    }, error => {
      this.loading = false;
    });
  }

}
