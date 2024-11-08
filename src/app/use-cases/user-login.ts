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

      if (userId) {
        const userDoc = await this.firestore.collection('usuario').doc(userId).ref.get();
        const userData = userDoc.data() as { username?: string; email?: string };

        const username = userData?.username || '';
        const userEmail = userData?.email || '';

        await this.storageService.set('username', username);
        await this.storageService.set('email', userEmail);
      }

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
      
      if (userId) {
        // Obtener username y email desde Firestore
        const username = await this.userService.getUsernameById(userId);
        const emailFromDb = await this.userService.getEmailById(userId);

        // Guardar en Ionic Storage
        await this.storageService.set('username', username || '');
        await this.storageService.set('email', emailFromDb || '');

        // Guardar estado de sesión
        await this.sessionManager.setSession(true);
      }
      
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
    await this.storageService.remove('email');
  }
}
