import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionManager } from 'src/managers/SessionManager';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  constructor(
    private router: Router,
    private sessionManager: SessionManager
  ) {}

  async ngOnInit() {
    await this.checkSession();
  }

  // ==== Verifica si la sesion está activa ====

  async checkSession() {
    const isLoggedIn = await this.sessionManager.isLoggedIn(); 

    if (isLoggedIn) {
      this.router.navigate(['/home']); 
    } else {
      this.router.navigate(['/login']); 
    }
  }
}
