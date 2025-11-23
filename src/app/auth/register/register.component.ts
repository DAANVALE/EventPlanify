import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
// 👈 Añadir FormGroup
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ImportsModule } from '../../imports';
import { LoginService } from '../../shared/auth/login.service';
import { RegisterRequest } from '../../models/auth/register-request.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ImportsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  providers: [MessageService]
})
export class RegisterComponent implements OnInit {
  registerError: string = "";

  registerForm: FormGroup; 

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private messageService: MessageService
  ) {
    // 👈 Inicialización dentro del constructor
    this.registerForm = this.formBuilder.group({
        username: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        phone: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  get username() { return this.registerForm.get('username')!; }
  get password() { return this.registerForm.get('password')!; }
  get firstname() { return this.registerForm.get('firstname')!; }
  get lastname() { return this.registerForm.get('lastname')!; }
  get phone() { return this.registerForm.get('phone')!; }

  register(): void {
    if (this.registerForm.valid) {
      this.registerError = "";
      this.loginService.register(this.registerForm.value as RegisterRequest).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Registro Exitoso', detail: 'Tu cuenta ha sido creada. Por favor, inicia sesión.' });
          setTimeout(() => this.router.navigateByUrl('/login'), 1500);
        },
        error: (errorData) => {
          const errorMessage = typeof errorData === 'string' ? errorData : 'Error al registrar. Intente con otro correo electrónico.';
          this.registerError = errorMessage;
          this.messageService.add({ severity: 'error', summary: 'Error de Registro', detail: this.registerError });
        }
      });
    } else {
      this.registerForm.markAllAsTouched();
      this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'Por favor, completa todos los campos obligatorios.' });
    }
  }

}