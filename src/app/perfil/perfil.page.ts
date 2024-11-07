import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserLogin } from 'src/app/use-cases/user-login'; // Importa el caso de uso de login
import { UserDelete } from '../use-cases/user-delete';
import { StorageService } from 'src/managers/StorageService';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  username: string | null = null; 

  constructor(
    private router: Router,
    private userLoginUseCase: UserLogin, 
    private userDelete: UserDelete,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    this.getUsername();
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

  async getUsername() {
    this.username = await this.storageService.get('username');
  }

}
