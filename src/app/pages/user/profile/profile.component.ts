import { Component, OnInit, signal, effect, Injector, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ImportsModule } from '../../../imports';
import { UserService } from '../../../shared/user/user.service';
import { LoginService } from '../../../shared/auth/login.service';
import { User } from '../../../models/auth/user.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ImportsModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [MessageService]
})
export class ProfileComponent implements OnInit {
  
  editMode = signal<boolean>(false);
  profileForm: FormGroup;
  
  private injector = inject(Injector);

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    public loginService: LoginService, 
    private messageService: MessageService
  ) { 
    this.profileForm = this.formBuilder.group({
        id: [''],
        username: [{ value: '', disabled: true }],
        lastname: ['', Validators.required],
        firstname: ['', Validators.required],
        phone: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (!this.loginService.currentUserLoginOn() || !this.loginService.userProfile()) {
      this.loginService.refreshUserProfile();
    }
    
    effect(() => {
      const user = this.loginService.userProfile();
      
      if (user) {
        this.profileForm.patchValue({
          id: user.id?.toString(),
          username: user.username,
          firstname: user.firstname,
          lastname: user.lastname,
          phone: user.phone
        });
      }
    }, { injector: this.injector });
  }

  get firstname() { return this.profileForm.get('firstname')!; }
  get lastname() { return this.profileForm.get('lastname')!; }
  get phone() { return this.profileForm.get('phone')!; }

 
  savePersonalDetailsData(): void {
    if (this.profileForm.valid && this.loginService.userProfile()) {
      const formValue = this.profileForm.getRawValue();
      
      const userToUpdate: Partial<User> = {
        id: Number(formValue.id),
        firstname: formValue.firstname!,
        lastname: formValue.lastname!,
        phone: formValue.phone!
      };

      this.userService.updateUser(userToUpdate).subscribe({
        next: (response) => {
          this.editMode.set(false); 
          this.loginService.refreshUserProfile();
          this.messageService.add({ 
            severity: 'success', 
            summary: 'Actualización Exitosa', 
            detail: response.message 
          });
        },
        error: (errorData) => {
          console.error(errorData);
          this.messageService.add({ 
            severity: 'error', 
            summary: 'Error', 
            detail: 'Fallo al actualizar el perfil. Intente de nuevo.' 
          });
        }
      });
    } else {
      this.profileForm.markAllAsTouched();
      this.messageService.add({ 
        severity: 'warn', 
        summary: 'Advertencia', 
        detail: 'Complete los campos requeridos.' 
      });
    }
  }

  upgradeToHost(): void {
    const userId = this.loginService.userProfile()?.id;
    if (userId) {
      this.userService.upgradeToHost(userId).subscribe({
        next: (response) => {
          this.loginService.refreshUserProfile();
          this.messageService.add({ severity: 'success', summary: 'Ascenso Exitoso', detail: response.message });
        },
        error: (errorData) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: errorData });
        }
      });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo obtener el ID del usuario.' });
    }
  }
}