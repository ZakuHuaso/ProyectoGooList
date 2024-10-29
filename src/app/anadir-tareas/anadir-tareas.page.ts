import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface DateItem {
  dayName: string;
  day: string;
  monthYear: string;
}

@Component({
  selector: 'app-anadir-tareas',
  templateUrl: './anadir-tareas.page.html',
  styleUrls: ['./anadir-tareas.page.scss'],
})
export class AnadirTareasPage implements OnInit {
  dateList: DateItem[] = [];

  constructor(private router: Router) { }

  ngOnInit() {
    this.generateDateList();
  }

  generateDateList() {
    const today = new Date();
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

    for (let i = 0; i < 10; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      let dayName = days[date.getDay()];
      let dayString = date.getDate().toString();

      if (i === 0) {
        dayName = `${dayName} ${dayString}, hoy`;
      } else if (i === 1) {
        dayName = `${dayName} ${dayString}, mañana`;
      } else {
        dayName = `${dayName} ${dayString}`;
      }

      this.dateList.push({
        dayName: dayName,
        day: '',
        monthYear: `${months[date.getMonth()]} ${date.getFullYear()}`
      });
    }
  }

  nuevaTarea() {
    this.router.navigate(['/nueva-tarea'])
  }


  selectedButton: string = '';

  selectButton(button: string) {
    this.selectedButton = button;
  }


}
