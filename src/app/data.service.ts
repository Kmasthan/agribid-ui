import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Environmet } from '../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { error } from 'node:console';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  handleError!: any;

  constructor(private httpClient: HttpClient) { }

  errorBuilder(error: any): any {
    // Transform the error structure
    const transformedError = {
      message: error.error?.message || error.message,
    };
    return transformedError;
  }

  // postData() is to perform the @POST request
  postData(path: string, object: any): Observable<any> {
    const url = `${Environmet.apiUrl}/${path}`;
    return this.httpClient.post(url, object).pipe(
      map((response) => response),
      catchError(this.handleError)
    );
  }

  // postMethodToGetTheData() is to get the Data using POST request for security purpose
  postMethodToGetTheData(path: string, object: any): Observable<any> {
    const url = `${Environmet.apiUrl}/${path}`;
    return this.httpClient.post(url, object).pipe(
      map((response) => response),
      catchError((error) => {
        return throwError(() => this.errorBuilder(error));
      })
    );
  }


  // getObjectsWithPath() is to get the Data using GET request
  getObjects(path: string, params: HttpParams): Observable<any> {
    const url = `${Environmet.apiUrl}/${path}`;
    return this.httpClient.get(url, { params }).pipe(
      map((response) => response),
      catchError(this.handleError)
    )
  }

  // getObjectsWithPath() is to get the Data using GET request
  getObjectsWithPath(path: string): Observable<any> {
    const url = `${Environmet.apiUrl}/${path}`;
    return this.httpClient.get(url).pipe(
      map((response) => response),
      catchError(this.handleError)
    )
  }
}
