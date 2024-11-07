import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserLogin } from 'src/app/use-cases/user-login';  // Importa el caso de uso de login
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private userLoginUseCase: UserLogin,  // Usa el caso de uso en lugar de SessionManager
    private alertController: AlertController
  ) {}

  ngOnInit() {}

  // Login con email y contraseña
  async buttonPressLogin() {
    if (this.email === '' || this.password === '') {
      this.showAlert('Error', 'Por favor completa todos los campos');
      return;
    }

    const loginSuccess = await this.userLoginUseCase.loginWithEmail(this.email, this.password);
    if (loginSuccess) {
      this.router.navigate(['/home']);
    } else {
      this.showAlert('Error', 'Credenciales inválidas');
      this.email = '';
      this.password = '';
    }
  }

  // Registro
  onRegisterButtonPressed() {
    this.router.navigate(['/register']);
  }

  // Login con Google
  async buttonGoogle() {
    const loginSuccess = await this.userLoginUseCase.loginWithGoogle();
    if (loginSuccess) {
      this.router.navigate(['/home']);
    } else {
      this.showAlert('Error', 'Error durante el inicio de sesión con Google');
    }
  }

  // Método para mostrar alertas
  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
