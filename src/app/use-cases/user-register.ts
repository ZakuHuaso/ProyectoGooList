import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { StorageService } from 'src/managers/StorageService';

@Injectable({
  providedIn: 'root',
})
export class UserRegister {
  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private storageService: StorageService
  ) {}

  // ==== METODO REGISTRO DE NUEVO USUARIO ====
  async registerWithEmail(email: string, password: string, username: string): Promise<boolean> {
    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
  
      // Crear la colección 'tareas' vacía para el usuario
      const userId = userCredential.user?.uid;
      if (userId) {
        await this.firestore.doc(`usuario/${userId}`).set({
          email: userCredential.user?.email,
          username: username, 
          user_photo: ""
        });
  
        // Crear una subcolección 'tareas' vacía
        const tareasRef = this.firestore.collection(`usuario/${userId}/tareas`);
        await tareasRef.add({
          task_name: 'Tarea inicial',
          task_desc: 'Esta es una tarea de ejemplo para el usuario',
          task_tag: '',
          task_date: '',
          task_alarm: '',
          task_state: false
        });
      }

      await this.storageService.set('isLoggedIn', true);
      await this.storageService.set('username', userCredential.user?.email || '');
  
      return true;
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      return false;
    }
  }  
}
