import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionManager } from 'src/managers/SessionManager';
import { Storage } from '@ionic/storage-angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  constructor(private router: Router, private sessionManager:SessionManager, private storage:Storage) {
    
  }

  ngOnInit() {
  }

  async performLogout() {
    if (confirm('¿Desea cerrar sesion?')){
      this.sessionManager.performLogout();
      this.router.navigate(['/login']);
    }
  }

}
