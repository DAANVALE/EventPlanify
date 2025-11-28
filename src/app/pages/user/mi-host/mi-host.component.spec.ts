import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiHostComponent } from './mi-host.component';

describe('MiHostComponent', () => {
  let component: MiHostComponent;
  let fixture: ComponentFixture<MiHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiHostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
