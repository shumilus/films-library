import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  url = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  convertQueryParams(params: any) {
    if (params) {
      let query = new HttpParams();
      Object.keys(params).forEach((key) => {
        if (params[key] && !Array.isArray(params[key])) {
          query = query.append(key, params[key]);
        }
        if (params[key] && Array.isArray(params[key])) {
          for (const elem of params[key]) {
            query = query.append(key, elem);
          }
        }
      });
      return query;
    } else {
      return params;
    }
  }

  get(path: string, params?: any, responseType: any = 'json'): Observable<any> {
    params = this.convertQueryParams(params);
    return this.http.get(path, {params, responseType: responseType,});
  }
}
