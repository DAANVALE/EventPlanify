import { Component, ViewChild} from '@angular/core';
import { ImportsModule } from '../../imports';
import { NgOptimizedImage } from '@angular/common';


import { Menu } from 'primeng/menu';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ImportsModule, NgOptimizedImage],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  @ViewChild('menuRef') menu!: Menu;

  menuItems: MenuItem[] = [];

  ngOnInit() {
    this.menuItems = [
      { label: 'Explorar', icon: 'pi pi-search', command: () => console.log('Explorar') },
      { label: 'Mis eventos', icon: 'pi pi-calendar', command: () => console.log('Mis eventos') },
      { label: 'Ayuda', icon: 'pi pi-question-circle', command: () => console.log('Ayuda') },
      { separator: true },
      { label: 'Iniciar sesión', icon: 'pi pi-user', command: () => console.log('Login') }
    ];
  }

  toggleMenu(event: Event) {
    this.menu.toggle(event);
  }
}
