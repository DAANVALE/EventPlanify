import { Routes } from '@angular/router';
import { ConfirmationComponent } from './pages/user/template-confirmation/confirmation/confirmation.component';
import { TemplateCanvaComponent } from './pages/user/template-canva/template-canva.component';

export const routes: Routes = [
    { 
        path: '', 
        loadComponent: () => import('./pages/user/template-canva/template-canva.component')
            .then(c => c.TemplateCanvaComponent)
    },
    { 
        path: 'confirmation', 
        loadComponent: () => import('./pages/user/template-confirmation/confirmation/confirmation.component')
            .then(c => c.ConfirmationComponent)
    },
    { path: '**', redirectTo: '' }
]
