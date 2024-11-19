import { ErrorService } from './error.service';
import { Ruta } from './../models/ruta';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class RutaService {
    private apiUrl = 'http://localhost:8080/api/rutas';

    constructor(private http: HttpClient, private errorService: ErrorService) { }

    getAllRutas(): Observable<Ruta[]> {
        return this.http.get<Ruta[]>(this.apiUrl);
    }

    getRutaById(id: number): Observable<Ruta> {
        return this.http.get<Ruta>(`${this.apiUrl}/${id}`);
    }

    createRuta(ruta: Ruta): Observable<Ruta> {
        return this.http.post<Ruta>(this.apiUrl, ruta);
    }

    updateRuta(id: number, ruta: Ruta): Observable<Ruta> {
        return this.http.put<Ruta>(`${this.apiUrl}/${id}`, ruta);
    }

    deleteRuta(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' }).pipe(
            map(() => true),
            catchError(this.errorService.handleDeleteError.bind(this))
        );
    }
}