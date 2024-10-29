import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionManager } from 'src/managers/SessionManager';

import { AlertController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router: Router, private sessionManager: SessionManager) { }

    email: string = '';
    password: string = '';

  ngOnInit() {
  }

  async buttonPressLogin(){
    if (this.email === '' || this.password === '') {
      alert('Por favor completa todos los campos');
      return;
    }
    const loginSuccess = await this.sessionManager.performLogin(this.email, this.password);
    if (loginSuccess){
      await this.sessionManager.setSession(true);
      this.router.navigate(['/home']);
    } else {
      this.email = ' ';
      this.email = ' ';
      alert('Credenciales invalidas');
    }
  }

  onRegisterButtonPressed() {
    this.router.navigate(['/register'])
  }

  async buttonGoogle(){
    const loginSuccess = await this.sessionManager.loginWithGoogle();
    if (loginSuccess){
      this.router.navigate(['/home']);
    }
  }

}
