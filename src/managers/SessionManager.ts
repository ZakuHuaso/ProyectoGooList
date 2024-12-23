import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { getAuth, deleteUser, GoogleAuthProvider, signInWithPopup } from '@firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AlertController } from '@ionic/angular';

@Injectable({
    providedIn: 'root',
})

export class SessionManager {
    public username: string | null = null;

    constructor(private storage: Storage, private afAuth: AngularFireAuth, private alertController: AlertController) {
        this.init();
    };

    // Inicializa el storage
    async init() {
        await this.storage.create();
    }

    // Guarda el estado del login en Ionic Storage
    async setSession(isLoggedIn: boolean): Promise<void> {
        await this.storage.set('isLoggedIn', isLoggedIn);
    }

    // Verifica si el usuario está logueado usando Ionic Storage
    async isLoggedIn(): Promise<boolean> {
        const session = await this.storage.get('isLoggedIn');
        return session ? session : false;
    }

    // Lógica para iniciar sesión con Firebase
    async performLogin(email: string, password: string): Promise<boolean> {
        try {
            const result = await this.afAuth.signInWithEmailAndPassword(email, password);
            await this.setSession(true); // Guarda que el usuario está logueado
            this.username = result.user?.email || null;
            await this.storage.set('username', this.username);
            return true;
        } catch (error) {
            console.error('Error en el inicio de sesión:', error);
            return false;
        }
    }

    // Método para iniciar sesión con Google
    async loginWithGoogle() {
        try {
            // Obtén la instancia de autenticación
            const auth = getAuth();
            const provider = new GoogleAuthProvider();

            // Inicia sesión con el popup
            const result = await signInWithPopup(auth, provider);

            // Obtén el nombre de usuario y guarda en la sesión
            this.username = result.user?.displayName || null;
            await this.setSession(true);
            await this.storage.set('userName', this.username); // Guarda el nombre de usuario
            console.log('Login exitoso:', result);
            return true;
        } catch (error) {
            console.error('Error durante el inicio de sesión:', error);
            return false;
        }
    }

    // Lógica para cerrar sesión
    async performLogout(): Promise<void> {
        await this.afAuth.signOut(); // Cierra sesión en Firebase
        await this.setSession(false); // Establece que el usuario no está logueado
        await this.storage.remove('username');
    }

}