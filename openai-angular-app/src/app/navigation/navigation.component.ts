import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  currentRoute = '/';
  navRoutes = [{ route: '/openai', text: 'Open AI', activeClass: ['/', '/openai'] },
  { route: '/langchain', text: 'Lang Chain', activeClass: ['/langchain'] },
  { route: '/restaurant', text: 'Restaurant Idea Generator', activeClass: ['/restaurant'] },
  { route: '/agent', text: 'Agents', activeClass: ['/agent'] }];
  constructor(private router: Router) {
    router.events.subscribe(value => {
      if (value instanceof NavigationStart) {
        this.currentRoute = value.url;
      }
    });
  }

}
