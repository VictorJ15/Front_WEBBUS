import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginDto } from '../../models/dto/loginDto';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginForm } from '../../forms/loginForm';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private fb= inject(FormBuilder)
  loginForm= this.fb.group<LoginForm>({
    email: this.fb.control<string | null>('', [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
    password: this.fb.control<string | null>('', [Validators.required, Validators.minLength(8)])
  });

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.auth.logout();
  }

  login() {
    if(this.loginForm.valid){
      const login: LoginDto = new LoginDto(this.loginForm.value)
      this.auth.login(login).subscribe({
        next: jwt =>{
          if(this.auth.role()=="PASAJERO"){
            this.router.navigate(['rutas']);
          }else if(this.auth.role() =="COORDINADOR"){
            this.router.navigate(['asignaciones']);
          }else{
            this.router.navigate(['rutas']);
          }          
        },
        error: err => { 
          console.error("Login failed:", err) 
          alert("El login fallo")
        }
      })
    }else{
      this.markAllControlsAsTouched();
    }
  }
  markAllControlsAsTouched() {
    Object.values(this.loginForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}
