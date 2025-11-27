import { TypeEventMenuComponent } from './features/event/type-event-menu/type-event-menu.component';
import { TemplateCanvaComponent } from './pages/user/template-canva/template-canva.component';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { PrimeNG } from 'primeng/config';

import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';

import { ImportsModule } from './imports';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ConfirmationComponent } from './pages/user/template-confirmation/confirmation/confirmation.component';
import { TemplateCardComponent } from './features/templat/template-card/template-card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ImportsModule,
    FormsModule,
    SelectButtonModule,
    TypeEventMenuComponent,
    ConfirmationComponent,
    HeaderComponent,
    TemplateCanvaComponent,
    TemplateCardComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent{
  title = 'EventPlanify';

  constructor(
    private router: Router,
    private primeng: PrimeNG) {
  }

  ngOnInit() {
      this.primeng.ripple.set(true);
  }
}
