
export interface LoginRequest {
    correo: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
    tokenType: string;
    expiresIn: number;
    correo: string;
    roles: string[];
}
