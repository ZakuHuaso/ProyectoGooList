 /* ESTE ARCHIVO SE ENCARGA DEL CRUD DE LA COLECCION USUARIO EN FIREBASE CLOUD */
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersCollection = this.firestore.collection('usuario'); 

  constructor(private firestore: AngularFirestore) {}

  // === CREATE ===
  async saveUser(userId: string, email: string, username: string): Promise<void> {
    try {
      const userRef = this.usersCollection.doc(userId);
      await userRef.set({ email, username });
    } catch (error) {
      console.error('Error al guardar usuario en Firestore:', error);
    }
  }

  // === READ ===
  async getUserById(userId: string): Promise<any> {
    try {
      const userDoc = await this.usersCollection.doc(userId).get().pipe(first()).toPromise();
      return userDoc?.exists ? userDoc.data() : null;
    } catch (error) {
      console.error('Error al obtener usuario de Firestore:', error);
      return null;
    }
  }

  // Obtiene campo username por userId
  async getUsernameById(userId: string): Promise<string | null> {
    try {
      const userDoc = await this.usersCollection.doc(userId).get().pipe(first()).toPromise();
      const userData = userDoc?.data() as { username?: string } | undefined; // Definimos el tipo esperado
      return userData?.username || null; 
    } catch (error) {
      console.error('Error al obtener el username de Firestore:', error);
      return null;
    }
  }

  async getEmailById(userId: string): Promise<string | null> {
    try {
      const userDoc = await this.firestore.collection('usuario').doc(userId).get().toPromise();
      const userData = userDoc?.data() as { email?: string } | undefined;
      return userData?.email || null;
    } catch (error) {
      console.error('Error al obtener el email:', error);
      return null;
    }
  }


  // === UPDATE ===
  async updateUser(userId: string, data: { email?: string; username?: string }): Promise<void> {
    try {
      const userRef = this.usersCollection.doc(userId);
      await userRef.update(data);
    } catch (error) {
      console.error('Error al actualizar usuario en Firestore:', error);
    }
  }

  // === DELETE ===
  async deleteUser(userId: string): Promise<void> {
    try {
      const userRef = this.usersCollection.doc(userId);
      await userRef.delete();
    } catch (error) {
      console.error('Error al eliminar usuario de Firestore:', error);
    }
  }
}
