import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UserRegister } from 'src/app/use-cases/user-register';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userRegister: UserRegister,  // Usamos el caso de uso para el registro
    private alertController: AlertController,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).+$')
      ]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.matchingPasswords('password', 'confirmPassword') });
  }

  ngOnInit() {}

  // Valida que las contraseñas coincidan
  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (formGroup: FormGroup) => {
      const passwordInput = formGroup.controls[passwordKey];
      const confirmPasswordInput = formGroup.controls[confirmPasswordKey];
      if (passwordInput.value !== confirmPasswordInput.value) {
        confirmPasswordInput.setErrors({ notMatching: true });
      } else {
        confirmPasswordInput.setErrors(null);
      }
    };
  }

  async onRegister() {
    if (this.registerForm.invalid) {
      this.showAlert('Error', 'Por favor complete todos los campos correctamente');
      return;
    }
  
    const { username, email, password } = this.registerForm.value;
  
    // Llamamos al caso de uso para registrar al usuario y pasar todos los valores
    const registerSuccess = await this.userRegister.registerWithEmail(email, password, username);
  
    if (registerSuccess) {
      this.showAlert('Registro exitoso', 'Su cuenta ha sido creada');
      this.router.navigate(['/home']);
    } else {
      this.showAlert('Error', 'Hubo un problema al crear su cuenta. Inténtelo de nuevo.');
    }
  }
  

  // Muestra una alerta
  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

}
