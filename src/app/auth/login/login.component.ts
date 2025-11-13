import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { ImportsModule } from '../../imports';
import { LoginService } from '../../shared/auth/login.service';
import { LoginRequest } from '../../models/auth/login-request.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ImportsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
  loginError: string = "";

  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private messageService: MessageService
  ) {
    this.loginForm = this.formBuilder.group({
        username: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

get username() {
    return this.loginForm.get('username')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }

  login(): void {
    if (this.loginForm.valid) {
      this.loginError = "";
      this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Sesión iniciada correctamente' });
          this.router.navigateByUrl('/');
          this.loginForm.reset();
        },
        error: (errorData) => {
          const errorMessage = typeof errorData === 'string' ? errorData : 'Error al iniciar sesión. Credenciales inválidas.';
          console.error(errorData);
          this.loginError = errorMessage;
          this.messageService.add({ severity: 'error', summary: 'Error', detail: this.loginError });
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
      this.loginError = "Por favor, complete todos los campos obligatorios.";
      this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: this.loginError });
    }
  }

}