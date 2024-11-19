import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
    public handleDeleteError(error: HttpErrorResponse): Observable<boolean> {
    if (error.status === 409) {
      alert(error.error);
    } else {
      console.error('Error inesperado:', error);
    }
    return of(false); 
  }
}
