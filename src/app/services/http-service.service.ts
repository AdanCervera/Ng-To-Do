import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  //Local
  BASE_URL_IDENTITY = "https://localhost:7056/api";

  constructor(private http: HttpClient) { }

  public post<T>(url: string, model?: any, params?: HttpParams): Observable<T> {
    let headers = new HttpHeaders();
    const URL = this.BASE_URL_IDENTITY;
    return this.http.post<T>(`${URL}/${url}`, model, { headers, params }).pipe(
      catchError((err: HttpErrorResponse) => {
        return this.handleError(err);
      })
    )
  }

  public put<T>(url: string, model?: any, params?: HttpParams): Observable<T> {
    let headers = new HttpHeaders();
    const URL =  this.BASE_URL_IDENTITY;
    return this.http.put<T>(`${URL}/${url}`, model, { headers, params }).pipe(
      catchError((err: HttpErrorResponse) => {
        return this.handleError(err);
      })
    )
  }

  public get<T>(url: string, params?: HttpParams): Observable<T> {
    let headers = new HttpHeaders();
    const URL =  this.BASE_URL_IDENTITY;
    return this.http.get<T>(`${URL}/${url}`, { headers, params }).pipe(
      catchError((err: HttpErrorResponse) => {
        return this.handleError(err);
      })
    )
  }

  public delete<T>(url: string, params?: HttpParams): Observable<T> {
    let headers = new HttpHeaders();
    const URL = this.BASE_URL_IDENTITY;
    return this.http.delete<T>(`${URL}/${url}`, { headers, params }).pipe(
      catchError((err: HttpErrorResponse) => {
        return this.handleError(err);
      })
    )
  }


  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
