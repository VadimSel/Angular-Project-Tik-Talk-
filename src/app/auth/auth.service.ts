import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TokenResponse } from '../app.types';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  baseApiUrl = 'https://icherniakov.ru/yt-course/auth/';

  token: string | null = null
  refreshToken: string | null = null

  get isAuth() {
    return !!this.token
  }

  login(payload: {
    username: string;
    password: string;
  }): Observable<TokenResponse> {
    const fd = new FormData();

    fd.append('username', payload.username);
    fd.append('password', payload.password);

    return this.http.post<TokenResponse>(`${this.baseApiUrl}token`, fd)
      .pipe(
        tap(val => {
          this.token = val.access_token
          this.refreshToken = val.refresh_token
        })
      )
  }
}
