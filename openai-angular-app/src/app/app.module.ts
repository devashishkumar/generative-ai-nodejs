import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { OpenaiComponent } from './openai/openai.component';
import { LangchainComponent } from './langchain/langchain.component';
import { NavigationComponent } from './navigation/navigation.component';
import { RestaurantIdeaGeneratorComponent } from './restaurant-idea-generator/restaurant-idea-generator.component';
import { AgentComponent } from './agent/agent.component';

@NgModule({
  declarations: [
    AppComponent,
    OpenaiComponent,
    LangchainComponent,
    NavigationComponent,
    RestaurantIdeaGeneratorComponent,
    AgentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
