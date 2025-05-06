// Import PrimeNG modules
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel'
import { IconFieldModule } from 'primeng/iconfield';

import { MenubarModule } from 'primeng/menubar'
import { MenuModule } from 'primeng/menu';

import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';

import { CarouselModule } from 'primeng/carousel';
import { CardModule } from 'primeng/card';

import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    ButtonModule,
    PanelModule,
    IconFieldModule,
    MenubarModule,
    CardModule,
    CarouselModule,
    ToolbarModule,
    InputTextModule,
    MenuModule,
  ],
  exports: [
    ButtonModule,
    PanelModule,
    IconFieldModule,
    MenubarModule,
    CardModule,
    CarouselModule,
    ToolbarModule,
    InputTextModule,
    MenuModule,
  ],
  providers: [],
})

export class ImportsModule {}
