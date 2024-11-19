import { Bus } from './../models/bus';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { ErrorService } from './error.service';


@Injectable({
    providedIn: 'root'
})
export class BusService {
    private apiUrl = 'http://localhost:8080/api/buses';
    private httpOptions = {
        headers: new HttpHeaders({
            "Content-type": "application/json"
        })
    }
    constructor(private http: HttpClient, private errorService: ErrorService) { }

    getAllBuses(): Observable<Bus[]> {
        return this.http.get<Bus[]>(this.apiUrl, this.httpOptions);
    }

    getBusById(id: number): Observable<Bus> {
        return this.http.get<Bus>(`${this.apiUrl}/${id}`);
    }

    createBus(bus: Bus): Observable<Bus> {
        return this.http.post<Bus>(this.apiUrl, bus);
    }

    updateBus(id: number, bus: Bus): Observable<Bus> {
        return this.http.put<Bus>(`${this.apiUrl}/${id}`, bus);
    }


    deleteBus(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' }).pipe(
            map(() => true),
            catchError(this.errorService.handleDeleteError.bind(this))
        );
    }

}
