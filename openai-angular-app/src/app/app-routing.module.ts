import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OpenaiComponent } from './openai/openai.component';
import { LangchainComponent } from './langchain/langchain.component';
import { RestaurantIdeaGeneratorComponent } from './restaurant-idea-generator/restaurant-idea-generator.component';

const routes: Routes = [
  { path: 'openai', component: OpenaiComponent },
  { path: 'langchain', component: LangchainComponent },
  { path: 'restaurant', component: RestaurantIdeaGeneratorComponent },
  { path: '', component: OpenaiComponent },
  { path: '**', pathMatch: 'full', component: OpenaiComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
