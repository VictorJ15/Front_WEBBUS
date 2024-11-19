import { Asignacion } from './../models/asignacion';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
import { AsignacionDto } from '../models/dto/asignacionDto';
import { ErrorService } from './error.service';


@Injectable({
  providedIn: 'root'
})
export class AsignacionService {
  private httpOptions = {
    headers:new  HttpHeaders({
      "Content-type": "application/json"
    })
  }
  private apiUrl = 'http://localhost:8080/api/asignaciones';

  constructor(private http: HttpClient, private errorService: ErrorService) {}

  getAllAsignaciones(): Observable<Asignacion[]> {
    return this.http.get<Asignacion[]>(this.apiUrl, this.httpOptions);
  }

  getAsignacionById(id: number): Observable<Asignacion> {
    return this.http.get<Asignacion>(`${this.apiUrl}/${id}`);
  }

  createAsignacion(asignacion: AsignacionDto): Observable<Asignacion> {
    return this.http.post<Asignacion>(this.apiUrl, asignacion, this.httpOptions);
  }

  updateAsignacion(id: number, asignacion: AsignacionDto): Observable<Asignacion> {
    return this.http.put<Asignacion>(`${this.apiUrl}/${id}`, asignacion);
  }

  deleteAsignacion(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' }).pipe(
        map(() => true),
        catchError(this.errorService.handleDeleteError.bind(this))        
    );
  }

  getAsignacionesByConductor(id:number): Observable<Asignacion[]>{
    return this.http.get<Asignacion[]>(`${this.apiUrl}/conductor/${id}`);
  }

  getAsignacionesByBus(id:number) : Observable<Asignacion[]>{
    return this.http.get<Asignacion[]>(`${this.apiUrl}/bus/${id}`);
  }
  getAsignacionesByRuta(id:number) :Observable<Asignacion[]>{
    return this.http.get<Asignacion[]>(`${this.apiUrl}/ruta/${id}`);
  }
  getAsignacionesByHorario(id:number) :Observable<Asignacion[]>{
    return this.http.get<Asignacion[]>(`${this.apiUrl}/horario/${id}`);
  }
}
