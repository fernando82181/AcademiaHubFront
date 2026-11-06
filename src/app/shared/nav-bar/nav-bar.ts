import { isPlatformBrowser } from '@angular/common';
import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/service/auth.service';

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-nav-bar',
  styleUrl: './nav-bar.css',
  templateUrl: './nav-bar.html',
})
export class NavBar implements OnInit {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly profileImageStorageKey = 'academiahub_profile_image';

  profileImageUrl = '';
  profilePanelOpen = false;
  profileError = '';
  userEmail = '';

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    if (!this.isBrowser) {
      return;
    }

    this.userEmail = sessionStorage.getItem('user_email') ?? '';
    try {
      this.profileImageUrl = localStorage.getItem(this.getProfileImageStorageKey()) ?? '';
    } catch {
      this.profileError = 'No se pudo cargar la imagen de perfil guardada.';
    }
  }

  toggleProfilePanel(): void {
    this.profilePanelOpen = !this.profilePanelOpen;
    this.profileError = '';
  }

  onAvatarSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) {
      return;
    }

    this.profileError = '';
    const supportedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!supportedTypes.includes(file.type)) {
      this.profileError = 'Selecciona una imagen JPG, PNG, GIF o WebP.';
      input.value = '';
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      this.profileError = 'La imagen debe pesar 2 MB o menos.';
      input.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== 'string') {
        this.profileError = 'No se pudo leer la imagen seleccionada.';
        return;
      }

      try {
        localStorage.setItem(this.getProfileImageStorageKey(), reader.result);
        this.profileImageUrl = reader.result;
      } catch {
        this.profileError = 'No se pudo guardar la imagen en este navegador.';
      }
    };
    reader.onerror = () => {
      this.profileError = 'No se pudo leer la imagen seleccionada.';
    };
    reader.readAsDataURL(file);
    input.value = '';
  }

  removeAvatar(): void {
    this.profileError = '';
    try {
      localStorage.removeItem(this.getProfileImageStorageKey());
      this.profileImageUrl = '';
    } catch {
      this.profileError = 'No se pudo quitar la imagen guardada.';
    }
  }

  logout(): void {
    this.authService.logout();
    this.profilePanelOpen = false;
    void this.router.navigate(['/login']);
  }

  private getProfileImageStorageKey(): string {
    return `${this.profileImageStorageKey}:${this.userEmail || 'default'}`;
  }
}
