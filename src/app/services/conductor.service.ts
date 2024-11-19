import { ErrorService } from './error.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Conductor } from '../models/conductor';
import { Bus } from '../models/bus';

@Injectable({
  providedIn: 'root'
})
export class ConductorService {
  private httpOptions = {
    headers:new  HttpHeaders({
      "Content-type": "application/json"
    })
  }
  private apiUrl = 'http://localhost:8080/api/conductores';

  constructor(private http: HttpClient, private errorService: ErrorService) { }


  getAllConductores(): Observable<Conductor[]> {
    return this.http.get<Conductor[]>(this.apiUrl, this.httpOptions);
  }

  getConductorById(id: number): Observable<Conductor> {
    return this.http.get<Conductor>(`${this.apiUrl}/${id}`);
  }

  createConductor(conductor: Conductor): Observable<Conductor> {
    return this.http.post<Conductor>(this.apiUrl, conductor);
  }

  updateConductor(id: number, conductor: Conductor): Observable<Conductor> {
    return this.http.put<Conductor>(`${this.apiUrl}/${id}`, conductor);
  }
  
  deleteConductor(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' }).pipe(
        map(() => true),
        catchError(this.errorService.handleDeleteError.bind(this))        
    );
}
}
