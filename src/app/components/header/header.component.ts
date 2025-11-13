import { Component, ViewChild, OnInit, inject, Injector, effect } from '@angular/core';
import { ImportsModule } from '../../imports';
import { NgOptimizedImage, CommonModule } from '@angular/common';

import { Router } from '@angular/router'; 
import { Menu } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { LoginService } from '../../shared/auth/login.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ImportsModule, NgOptimizedImage, CommonModule], 
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  @ViewChild('menuRef') menu!: Menu;
  menuItems: MenuItem[] = [];

  public loginService = inject(LoginService); 
  private router = inject(Router);
  private injector = inject(Injector);

  ngOnInit() {
    this.updateMenuItems();
    
    effect(() => {
      this.loginService.currentUserLoginOn(); 
      this.updateMenuItems();
    }, { injector: this.injector });
  }

  updateMenuItems(): void {
    const commonItems: MenuItem[] = [
      { label: 'Explorar', icon: 'pi pi-search', routerLink: '/' },
      { label: 'Mis eventos', icon: 'pi pi-calendar', command: () => console.log('Mis eventos') },
      { label: 'Ayuda', icon: 'pi pi-question-circle', command: () => console.log('Ayuda') },
      { separator: true }
    ];

    if (this.loginService.currentUserLoginOn()) { 
      this.menuItems = [
        ...commonItems,
        { label: 'Mi Perfil', icon: 'pi pi-user', routerLink: '/profile' }, 
        { label: 'Cerrar sesión', icon: 'pi pi-sign-out', command: () => this.logout() }
      ];
    } else {
      this.menuItems = [
        ...commonItems,
        { label: 'Iniciar sesión', icon: 'pi pi-sign-in', routerLink: '/login' } 
      ];
    }
  }

  logout(): void {
    this.loginService.logout();
    this.router.navigate(['/']); 
  }

  toggleMenu(event: Event) {
    this.menu.toggle(event);
  }
  
  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  goToProfile(): void {
    this.router.navigate(['/profile']);
  }
}