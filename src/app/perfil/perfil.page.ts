import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserLogin } from 'src/app/use-cases/user-login';
import { UserDelete } from '../use-cases/user-delete';
import { StorageService } from 'src/managers/StorageService';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  username: string | null = null;
  email: string | null = null;

  constructor(
    private router: Router,
    private userLoginUseCase: UserLogin,
    private userDelete: UserDelete,
    private storageService: StorageService
  ) {}

  async ngOnInit() {  // Declarar ngOnInit como async
    await this.loadUserData();
  }

  async performLogout() {
    const confirmLogout = confirm('¿Desea cerrar sesión?');
    if (confirmLogout) {
      await this.userLoginUseCase.logout();
      this.router.navigate(['/login']);
    }
  }

  async onDeleteAccount() {
    const confirmation = confirm('¿Estás seguro de que quieres eliminar tu cuenta?');
    if (confirmation) {
      await this.userDelete.deleteUserAccount();
    }
  }

  // Método para cargar datos del usuario
  private async loadUserData() {
    this.username = await this.storageService.get('username');
    this.email = await this.storageService.get('email');

    // Si `username` o `email` están vacíos, puedes incluir aquí una lógica para rescatarlos de Firestore si es necesario
  }
}
