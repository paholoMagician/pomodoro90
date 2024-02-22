import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Environments } from 'src/app/components/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor( private http: HttpClient, private url: Environments, private route:Router ) { }

  logUser( model:any [] ) {
    return this.http.post( this.url.apiurl() + 'User/login', model );
  }

  validate() {
    let email:any    = sessionStorage.getItem('c_e_r_u_m');
    let nombre:any   = sessionStorage.getItem('c_n_r_u');
    let UserCod: any = sessionStorage.getItem('c_c_r_u');
    let edad: any    = sessionStorage.getItem('c_e_r_u');
    if( UserCod == undefined || UserCod == null || UserCod == '' ) {
      // alert('no existe')
      this.route.navigate(['login']);
    } else {
      // alert('si existe')
      this.route.navigate(['dashboard']);
    }
  }

  guardarUsuario(model:any[]) {
    return this.http.post( this.url.apiurl() + 'User/guardarUsuario', model );
  }



  closeSession() {
    sessionStorage.removeItem('c_e_r_u_m');
    sessionStorage.removeItem('c_n_r_u');
    sessionStorage.removeItem('c_c_r_u');
    sessionStorage.removeItem('c_e_r_u');
  }
  
}
