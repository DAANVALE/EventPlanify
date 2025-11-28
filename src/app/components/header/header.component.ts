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

  /**
   * Determina si el usuario actual es HOST o ADMIN
   */
  esHost(): boolean {
    const userProfile = this.loginService.userProfile();
    if (!userProfile || !userProfile.role) return false;
    
    // Verifica el rol del usuario
    const role = userProfile.role;
    
    return role === 'HOST' || role === 'ADMIN';
  }

  /**
   * Obtiene el label y ruta del menú de eventos según el rol
   */
  getEventosMenuItem(): MenuItem {
    if (this.esHost()) {
      return {
        label: 'Mi Host',
        icon: 'pi pi-building',
        routerLink: '/mi-host'
      };
    } else {
      return {
        label: 'Mis Eventos',
        icon: 'pi pi-calendar',
        routerLink: '/mis-eventos'
      };
    }
  }

  updateMenuItems(): void {
    const eventosItem = this.loginService.currentUserLoginOn() 
      ? this.getEventosMenuItem() 
      : { label: 'Mis eventos', icon: 'pi pi-calendar', routerLink: '/login' };

    const commonItems: MenuItem[] = [
      { label: 'Explorar', icon: 'pi pi-search', routerLink: '/' },
      { label: 'Plantillas', icon: 'pi pi-th-large', routerLink: '/template' },
      eventosItem,
      { label: 'Ayuda', icon: 'pi pi-question-circle', command: () => this.mostrarAyuda() },
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

  mostrarAyuda(): void {
    // Implementa la lógica de ayuda aquí
    console.log('Mostrando ayuda...');
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

  /**
   * Navega a la sección de eventos según el rol del usuario
   */
  goToEventos(): void {
    if (this.esHost()) {
      this.router.navigate(['/mi-host']);
    } else {
      this.router.navigate(['/mis-eventos']);
    }
  }

  /**
   * Obtiene el label del botón de eventos para el toolbar
   */
  getEventosLabel(): string {
    return this.esHost() ? 'Mi Host' : 'Mis Eventos';
  }

  /**
   * Obtiene el icono del botón de eventos para el toolbar
   */
  getEventosIcon(): string {
    return this.esHost() ? 'pi pi-building' : 'pi pi-calendar';
  }
}