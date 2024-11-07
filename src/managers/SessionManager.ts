import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
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

    // Guarda el estado del login 
    async setSession(isLoggedIn: boolean): Promise<void> {
        await this.storage.set('isLoggedIn', isLoggedIn);
        console.log("Sesion activa");
    }

    // Verifica si el usuario está logueado 
    async isLoggedIn(): Promise<boolean> {
        const session = await this.storage.get('isLoggedIn');
        return session ? session : false;
    }

    // Guarda el nombre de usuario en Storage
    async setUsername(username: string): Promise<void> {
        this.username = username;
        await this.storage.set('username', username);
        console.log(this.username);
    }

    // Obtiene el nombre de usuario desde Storage
    async getUsername(): Promise<string | null> {
        return this.username || await this.storage.get('username');
    }

    // Elimina la sesión y el nombre de usuario de Storage
    async clearSession(): Promise<void> {
        await this.setSession(false);
        await this.storage.remove('username');
        console.log("Sin sesion");
    }

}