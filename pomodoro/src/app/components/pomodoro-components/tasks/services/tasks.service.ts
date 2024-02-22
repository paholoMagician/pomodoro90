import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environments } from 'src/app/components/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor( private url: Environments, private http: HttpClient ) { }

  guardarPomodoro( model:any [] ) {
    return this.http.post( this.url.apiurl() + 'Pomodoro/guardarPomodoro', model );
  }

  obtenerPomodoro( id:any ) {
    return this.http.get( this.url.apiurl() + 'Pomodoro/obtenerPomodoros/' + id );
  }
  
  eliminarPomodoro( id:any ) {
    return this.http.delete( this.url.apiurl() + 'Pomodoro/eliminarPomodoro/' + id );
  }

}
