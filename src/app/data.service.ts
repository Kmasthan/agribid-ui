import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environmet } from '../environments/environment';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  handleError!: any;

  constructor(private httpClient: HttpClient) { }

  // postData() is to perform the @POST request
  postData(path: string, data: any): Observable<any> {
    const url = `${Environmet.apiUrl}/${path}`;
    return this.httpClient.post(url, data).pipe(
      map((response) => response),
      catchError(this.handleError)
    );
  }
}
