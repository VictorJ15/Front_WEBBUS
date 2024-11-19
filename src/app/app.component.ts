import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule]
})
export class AppComponent implements OnInit{
  title = 'Sistema de Transporte Trasmilenio';
  message = 'Bienvenido al Sistema de Trasnporte Transmilenio';
  role!: string | null;
  constructor(private authService: AuthService, private router:Router) {}
  ngOnInit(): void {
    this.role = this.authService.role();

    // Suscribirse a los cambios de navegación
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.role = this.authService.role();
      });
  }
  
  logout() {
    this.authService.logout();
    this.router.navigate(["login"]);
  }

  showLogoutButton() {
    return this.authService.isAuthenticated();
  }  
  login(){
    this.router.navigate(["login"]);
  }
}
