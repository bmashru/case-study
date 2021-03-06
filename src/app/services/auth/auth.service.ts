import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { ClientConfigService } from '../client-config/client-config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public static STORAGE_KEY = 'csauth';

  baseApiUrl: string;
  oAuthConfig: any;

  constructor(
    private clientConfigService: ClientConfigService,
    private http: HttpClient) {
    this.baseApiUrl = this.clientConfigService.get().baseApiUrl;
    this.oAuthConfig = this.clientConfigService.get().oAuthConfigs;
  }

  /**
   * This method is fetching OAUTH 2.0 through HTTP server call
   * @param authToken required to fetch token
   */
  public getAccessToken(authToken): Observable<any> {
    const body = this.oAuthConfig;
    body['auth_token'] = authToken;

    return this.http.post<any>(this.baseApiUrl + 'oauth/token.json',
      this.toHttpParams(body).toString(), { headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' }) }).pipe(
        map((response) => {
          return response;
        }),
        catchError(error => {
          return throwError(error);
        })
      );
  }

  /**
   * This method is used to check OAUTH 2.0 token validity
   */
  public isSessionAlive(): boolean {
    const MILLI_SECOND = 1000;
    const tokenObj = JSON.parse(localStorage.getItem(AuthService.STORAGE_KEY));
    return tokenObj && ((tokenObj.created_at + tokenObj.expires_in) * MILLI_SECOND) > new Date().getTime();
  }

  /**
   * This method is used to convert object into single set of HttpParms
   */
  private toHttpParams(obj: Object): HttpParams {
    return Object.getOwnPropertyNames(obj)
      .reduce((p, key) => p.set(key, obj[key]), new HttpParams());
  }
}
