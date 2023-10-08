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
  constructor(private generativeAiServiceObj: GenerativeAiService) {}

  ngOnInit(): void {
  }
}
