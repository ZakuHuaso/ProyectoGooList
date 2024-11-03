import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ver-tarea',
  templateUrl: './ver-tarea.page.html',
  styleUrls: ['./ver-tarea.page.scss'],
})
export class VerTareaPage implements OnInit {
  dateExample = new Date().toISOString();
  
  constructor() { }

  ngOnInit() {
  }

  selectedDate: string = '';
  selectedTime: string = '';

  abrirDate() {
    
  }

  abrirAlarm() {
    
  }

}
