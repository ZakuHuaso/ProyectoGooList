import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AlertController } from '@ionic/angular';
import { FirebaseError } from 'firebase/app';  
import { StorageService } from 'src/managers/StorageService';
import { SessionManager } from 'src/managers/SessionManager';

@Injectable({
  providedIn: 'root',
})
export class UserDelete {
  constructor(
    private afAuth: AngularFireAuth,
    private alertController: AlertController,
    private router: Router,
    private sessionManager: SessionManager
  ) {}

  // Elimina la cuenta del usuario autenticado
  async deleteUserAccount(): Promise<void> {
    try {
      // Verifica si el usuario está autenticado
      const user = await this.afAuth.currentUser;
      if (!user) {
        this.showAlert('Error', 'No estás autenticado');
        return;
      }

      // Intenta eliminar la cuenta
      await user.delete();
      await this.sessionManager.clearSession();
      this.showAlert('Éxito', 'Cuenta eliminada exitosamente');
      this.router.navigate(['/login']);
      
    } catch (error) {
      console.error('Error al eliminar la cuenta:', error);

      // Verificar que el error es un FirebaseError antes de acceder a `error.code`
      let errorMessage = 'Hubo un error al intentar eliminar tu cuenta.';
      if (error instanceof FirebaseError) {
        // Si es un error de Firebase, verificar el código de error
        if (error.code === 'auth/requires-recent-login') {
          errorMessage = 'Por razones de seguridad, debes volver a iniciar sesión.';
        }
      }

      this.showAlert('Error', errorMessage);
    }
  }


  // Método para mostrar alertas
  private async showAlert(header: string, message: string): Promise<void> {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
