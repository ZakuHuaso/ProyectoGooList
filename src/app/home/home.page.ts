import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  date: string = '12 de Septiembre';
  progress: number = 0;
  total: number = 5;

  constructor() {}

  onTabClick(tab: string) {
    console.log(`${tab}`);
    
  }
}