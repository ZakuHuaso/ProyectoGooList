import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionManager } from 'src/managers/SessionManager';
import { StorageService } from 'src/managers/StorageService';  // Asegúrate de importar el StorageService

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  constructor(
    private router: Router,
    private sessionManager: SessionManager,
    private storageService: StorageService  // Inyecta el servicio de Storage
  ) {}

  async ngOnInit() {
    await this.checkSession();
  }

  // ==== Verifica si la sesión está activa ====
  async checkSession() {
    const isLoggedIn = await this.sessionManager.isLoggedIn(); 
    console.log("Estado de sesion: ", isLoggedIn);

    if (isLoggedIn) {
      // Espera hasta que los datos del usuario estén disponibles
      const username = await this.storageService.get('username');
      const email = await this.storageService.get('email');
      console.log("Username desde storage:", username);
      console.log("Email desde storage:", email);

      // Si los datos están disponibles, redirige a home
      if (username && email) {
        this.router.navigate(['/home']); 
      } else {
        // Si los datos no están disponibles, redirige a login
        this.router.navigate(['/login']);
      }
    } else {
      this.router.navigate(['/login']);
    }
  }
}

