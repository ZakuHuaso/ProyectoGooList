import { Component, OnInit, ViewChild} from '@angular/core';
import { IonDatetime } from '@ionic/angular';

@Component({
  selector: 'app-nueva-tarea',
  templateUrl: './nueva-tarea.page.html',
  styleUrls: ['./nueva-tarea.page.scss'],
})
export class NuevaTareaPage implements OnInit {
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
