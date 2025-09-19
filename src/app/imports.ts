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

import { TagModule } from 'primeng/tag';
import { ChipModule } from 'primeng/chip';

import { DialogModule } from 'primeng/dialog';

import { NgModule } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';

import { ImageModule } from 'primeng/image';
import { DividerModule } from 'primeng/divider';

import { FieldsetModule } from 'primeng/fieldset';
import { InputNumberModule } from 'primeng/inputnumber';

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
    TagModule,
    ChipModule,
    DropdownModule,
    DialogModule,
    ImageModule,
    DividerModule,
    FieldsetModule,
    InputNumberModule,
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
    TagModule,
    ChipModule,
    DropdownModule,
    DialogModule,
    ImageModule,
    DividerModule,
    FieldsetModule,
    InputNumberModule,
  ],
  providers: [],
})

export class ImportsModule {}
