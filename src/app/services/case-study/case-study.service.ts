import { Injectable } from '@angular/core';
import { ClientConfigService } from '../client-config/client-config.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CaseStudyService {

  baseApiUrl: string;
  tokenObj: any;

  constructor(
    private clientConfigService: ClientConfigService,
    private http: HttpClient) {
    this.baseApiUrl = this.clientConfigService.get().baseApiUrl;
    this.tokenObj = JSON.parse(localStorage.getItem(AuthService.STORAGE_KEY));
  }

  public getCaseStudy(): Observable<any> {
    return this.http.get<any>(this.baseApiUrl + 'case_study/companies/58cba141ba169e0eab2657c9/' +
    'company_case_studies/595c859eba169ec47e4f20d4/user_company_case_studies/595ce021ba169edb9c733e90' +
    '?include[company_case_study][include]=questions',
      { headers: new HttpHeaders({ 'Authorization': `Bearer ${this.tokenObj.access_token}` }) }).pipe(
        map((response) => {
          return response;
        }),
        catchError(error => {
          return throwError(error);
        })
      );
  }
}
