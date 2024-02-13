import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalConfiguracionesComponent } from '../modals/modal-configuraciones/modal-configuraciones.component';

@Component({
  selector: 'app-navside',
  templateUrl: './navside.component.html',
  styleUrls: ['./navside.component.scss']
})
export class NavsideComponent {

  _msj_button: boolean = true;

  @Output() nPomo   = new EventEmitter<any>();
  @Output() nSBreak = new EventEmitter<any>();
  @Output() nLBreak = new EventEmitter<any>();
  @Output() aPom = new EventEmitter<any>();
  @Output() aBre = new EventEmitter<any>();

  constructor(public dialog:         MatDialog) {}

  // aPom:this.timerForm.controls['autoPom'] .value,
  //       aBre:this.timerForm.controls['autoBreak'] .value,

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
