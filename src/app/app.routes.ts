import { Routes } from '@angular/router';
import { ConfirmationComponent } from './pages/user/template-confirmation/confirmation/confirmation.component';
import { TemplateCanvaComponent } from './pages/user/template-canva/template-canva.component';
import { TemplateCardComponent } from './features/templat/template-card/template-card.component';
import { TypeEventMenuComponent } from './features/event/type-event-menu/type-event-menu.component';
import { MisEventosComponent } from './pages/user/mis-eventos/mis-eventos.component';
import { MiHostComponent } from './pages/user/mi-host/mi-host.component';

export const routes: Routes = [
    { 
        path: '', 
        loadComponent: () => import('./features/event/type-event-menu/type-event-menu.component')
            .then(c => c.TypeEventMenuComponent)
    },
    { 
        path: 'confirmation', 
        loadComponent: () => import('./pages/user/template-confirmation/confirmation/confirmation.component')
            .then(c => c.ConfirmationComponent)
    },
    { 
        path: 'login', 
        loadComponent: () => import('./auth/login/login.component')
            .then(c => c.LoginComponent)
    },
    { 
        path: 'register', 
        loadComponent: () => import('./auth/register/register.component')
            .then(c => c.RegisterComponent)
    },
    { 
        path: 'profile',
        loadComponent: () => import('./pages/user/profile/profile.component')
            .then(c => c.ProfileComponent)
    },
    { path: 'template', 
        loadComponent: () => import('./pages/user/template-canva/template-canva.component')
            .then(c => c.TemplateCanvaComponent) 
    },
    {
        path: 'mis-eventos',
        component: MisEventosComponent
    },
    {
        path: 'mi-host',
        component: MiHostComponent
    },
    { path: '**', redirectTo: '' },
]
