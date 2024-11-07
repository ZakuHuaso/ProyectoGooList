import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { SessionManager } from 'src/managers/SessionManager';
import { getAuth, GoogleAuthProvider, signInWithPopup } from '@firebase/auth';
import { StorageService } from 'src/managers/StorageService';
import { AngularFirestore } from '@angular/fire/compat/firestore'; 
import { UserService } from 'src/app/services/firestore-user.service';

@Injectable({
  providedIn: 'root'
})
export class UserLogin {
  constructor(
    private afAuth: AngularFireAuth,
    private sessionManager: SessionManager,
    private storageService: StorageService,
    private userService: UserService, 
    private firestore: AngularFirestore 
  ) {}

  //  ==== LOGIN CON CORREO Y CONTRASEÑA ====
  async loginWithEmail(email: string, password: string): Promise<boolean> {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(email, password);
      const userId = result.user?.uid || '';

      // Obtener y almacenar el username en Ionic Storage
      const username = await this.userService.getUsernameById(userId);
      if (username) {
        await this.storageService.set('username', username);
      }

      // Guardar estado de sesión en SessionManager e Ionic Storage
      await this.sessionManager.setSession(true);
      await this.sessionManager.setUsername(username || ''); // Asignar username o cadena vacía
      await this.storageService.set('isLoggedIn', true);

      return true;
    } catch (error) {
      console.error("Error al iniciar sesión", error);
      return false;
    }
  }

  // ==== LOGIN USANDO CUENTA DE GOOGLE ====
  async loginWithGoogle(): Promise<boolean> {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      
      const email = result.user?.email || ''; 
      const username = email.split('@')[0]; 

      
      const userId = result.user?.uid || ''; 
      await this.userService.saveUser(userId, email, username); 

      // Crear subcolección "tareas" 
      const tareasRef = this.firestore.collection(`usuario/${userId}/tareas`);
      
      
      tareasRef.get().subscribe(snapshot => {
        if (snapshot.empty) {
          tareasRef.add({
            task_name: 'Tarea inicial',
            task_desc: 'Esta es una tarea de ejemplo para el usuario',
            task_tag: '',
            task_date: '',
            task_alarm: '',
            task_state: false
          });
        }
      });
      
      await this.storageService.set('username', username); 
      await this.sessionManager.setSession(true);
      await this.sessionManager.setUsername(username); 

      
      await this.storageService.set('isLoggedIn', true);

      return true;
    } catch (error) {
      console.error("Error durante el inicio de sesión con Google", error);
      return false;
    }
  }

  // ==== CIERRE DE SESION ====
  async logout(): Promise<void> {
    await this.afAuth.signOut();
    await this.sessionManager.clearSession();
    await this.storageService.remove('isLoggedIn'); 
    await this.storageService.remove('username'); 
  }
}
