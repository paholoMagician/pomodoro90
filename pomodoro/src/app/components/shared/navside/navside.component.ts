import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalConfiguracionesComponent } from '../modals/modal-configuraciones/modal-configuraciones.component';
import { LoginModalComponent } from '../../dashboard/login-modal/login-modal.component';
import { EncryptService } from '../services/encrypt.service';
import { Environments } from '../../environments/environments';
import { LoginService } from '../../dashboard/login-modal/services/login.service';

@Component({
  selector: 'app-navside',
  templateUrl: './navside.component.html',
  styleUrls: ['./navside.component.scss']
})
export class NavsideComponent implements OnInit {

  _msj_button: boolean = true;

  @Output() nPomo   = new EventEmitter<any>();
  @Output() nSBreak = new EventEmitter<any>();
  @Output() nLBreak = new EventEmitter<any>();
  @Output() aPom = new EventEmitter<any>();
  @Output() aBre = new EventEmitter<any>();


  @Input() usuario_listen: any;

  constructor( public dialog:         MatDialog, 
               private loginService: LoginService,
               private ncrypt: EncryptService,
               private env: Environments) {}

    ngOnInit(): void {
        this.decrypt();
    }

    cerrarSession() {
      this.loginService.closeSession();
      this.usuario_listen = undefined;
    }

  decrypt() {
    let x: any = sessionStorage.getItem('c_n_r_u');
    if ( x != undefined || x != null ) this.usuario_listen = this.ncrypt.decryptWithAsciiSeed(x, this.env.seed, this.env.hashlvl);
  }

  openDataLogin() {
    
    const dialogRef = this.dialog.open( LoginModalComponent, {
      minHeight: '600px',
      maxHeight: '75vh',
      minWidth:  '350px',
      maxWidth: '500px',
      data:   [],
    });

    dialogRef.afterClosed().subscribe( (result:any) => {      
      if( result != undefined || result != null ) {
        this.usuario_listen = result.nombreUsuario;
      }
    });

  }

  openDataEquiposDialog() {

    const dialogRef = this.dialog.open( ModalConfiguracionesComponent, {
      height: 'auto',
      width:  '400px',
      data:   [],
    });

    dialogRef.afterClosed().subscribe( (result:any) => {
      
      if( result ) {        
        this.nPomo.emit( result.pommin );
        this.nSBreak.emit( result.nSBreak );
        this.nLBreak.emit( result.nLBreak );
        this.aBre.emit( result.aBre );
        this.aPom.emit( result.aPom );
        localStorage.setItem( 'nPomo',   result.pommin );
        localStorage.setItem( 'nSBreak', result.nSBreak );
        localStorage.setItem( 'nLBreak', result.nLBreak );
        localStorage.setItem( 'aBre',    result.aBre );
        localStorage.setItem( 'aPom',    result.aPom );
      }

    });

  }

}
