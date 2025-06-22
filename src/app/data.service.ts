import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Environmet } from '../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { SprinnerLoadingService } from './spinner-loading.service';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class DataService {



  constructor(private httpClient: HttpClient, private sprinnerLoadingService: SprinnerLoadingService) { }

  // Transform the error structure
  errorBuilder(error: any): any {
    const transformedError = {
      message: error.error?.message || error.message,
    };
    return transformedError;
  }

  // postData() is to perform the @POST request
  postData(path: string, object: any): Observable<any> {
    this.sprinnerLoadingService.setLoading(true);
    const url = `${Environmet.apiUrl}/${path}`;
    return this.httpClient.post(url, object).pipe(
      map((response) => {
        this.sprinnerLoadingService.setLoading(false);
        return response;
      }),
      catchError((error) => {
        this.sprinnerLoadingService.setLoading(false);
        return throwError(() => this.errorBuilder(error));
      })
    );
  }

  // postMethodToGetTheData() is to get the Data using POST request for security purpose
  postMethodToGetTheData(path: string, object: any): Observable<any> {
    this.sprinnerLoadingService.setLoading(true);
    const url = `${Environmet.apiUrl}/${path}`;
    return this.httpClient.post(url, object).pipe(
      map((response) => {
        this.sprinnerLoadingService.setLoading(false);
        return response;
      }),
      catchError((error) => {
        this.sprinnerLoadingService.setLoading(false);
        return throwError(() => this.errorBuilder(error));
      })
    );
  }


  // getObjectsWithPath() is to get the Data using GET request
  getObjects(path: string, params: HttpParams): Observable<any> {
    this.sprinnerLoadingService.setLoading(true);
    const url = `${Environmet.apiUrl}/${path}`;
    return this.httpClient.get(url, { params }).pipe(
      map((response) => {
        this.sprinnerLoadingService.setLoading(false);
        return response;
      }),
      catchError((error) => {
        this.sprinnerLoadingService.setLoading(false);
        return throwError(() => this.errorBuilder(error))
      })
    )
  }

  // getObjectsWithPath() is to get the Data using GET request
  getObjectsWithPath(path: string): Observable<any> {
    this.sprinnerLoadingService.setLoading(true);
    const url = `${Environmet.apiUrl}/${path}`;
    return this.httpClient.get(url).pipe(
      map((response) => {
        this.sprinnerLoadingService.setLoading(false);
        return response;
      }),
      catchError((error) => {
        this.sprinnerLoadingService.setLoading(false);
        return throwError(() => this.errorBuilder(error))
      })
    )
  }

  // deleteObjectWithId() is to delete the Data using DELETE request
  deleteObjectWithId(path: string): Observable<any> {
    this.sprinnerLoadingService.setLoading(true);
    const url = `${Environmet.apiUrl}/${path}`;
    return this.httpClient.delete(url).pipe(
      map((response) => {
        this.sprinnerLoadingService.setLoading(false);
        return response;
      }),
      catchError((error) => {
        this.sprinnerLoadingService.setLoading(false);
        return throwError(() => this.errorBuilder(error))
      })
    )
  }

  // updateObjectWithId() is to update the Data using PUT request
  updateObjectWithId(path: string, object: any): Observable<any> {
    this.sprinnerLoadingService.setLoading(true);
    const url = `${Environmet.apiUrl}/${path}`;
    return this.httpClient.put(url, object).pipe(
      map((response) => {
        this.sprinnerLoadingService.setLoading(false);
        return response;
      }),
      catchError((error) => {
        this.sprinnerLoadingService.setLoading(false);
        return throwError(() => this.errorBuilder(error))
      })
    )
  }
}
