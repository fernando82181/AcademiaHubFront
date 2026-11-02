import { Injectable } from "@angular/core";
import { environment } from "../../../enviroments/enviroments";
import { HttpClient } from "@angular/common/http";
import { LoginRequest, LoginResponse } from "../models/auth.model";
import { Observable, tap } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private readonly apiUrl = `${environment.apiUrl}/api/auth`;
  constructor(private http: HttpClient) { }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.apiUrl}/login`,
      credentials
    ).pipe(
      tap(response => {
        sessionStorage.setItem('access_token', response.accessToken);
        sessionStorage.setItem('user_email', response.correo);
        sessionStorage.setItem('user_roles', JSON.stringify(response.roles));
      })
    );
  }
  getToken(): string | null {
    return sessionStorage.getItem('access_token');
  }

  // Cerrar sesión
  logout(): void {
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('user_email');
    sessionStorage.removeItem('user_roles');
  }

  // Comprobar si existe una sesión
  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

}