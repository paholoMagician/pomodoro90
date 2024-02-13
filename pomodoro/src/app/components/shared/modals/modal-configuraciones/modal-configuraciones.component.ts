import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Environments } from 'src/app/components/environments/environments';
import { NavsideComponent } from '../../navside/navside.component';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-modal-configuraciones',
  templateUrl: './modal-configuraciones.component.html',
  styleUrls: ['./modal-configuraciones.component.scss']
})
export class ModalConfiguracionesComponent implements OnInit {

  timerForm = new FormGroup (
    { 
      numPomodoro:   new FormControl(1),
      numShortBreak: new FormControl(1),
      numLongBreak:  new FormControl(1),
      autoPom:       new FormControl(),
      autoBreak:     new FormControl(),
    }
  )
  
  ngOnInit(): void {
    let xnLBreak: any = localStorage.getItem('nLBreak');
    this.timerForm.controls['numLongBreak'].setValue(xnLBreak);
    let xnSBreak: any = localStorage.getItem('nSBreak');
    this.timerForm.controls['numShortBreak'].setValue(xnSBreak);
    let xpnom: any    = localStorage.getItem('nPomo');
    this.timerForm.controls['numPomodoro'].setValue(xpnom);
    // let xAutoPom: any    = localStorage.getItem('aPom');
    // this.timerForm.controls['autoPom'].setValue(xAutoPom);
    // console.log(xAutoPom)
    // let xAutoBreak: any    = localStorage.getItem('aBre');
    // console.log(xAutoBreak)
    // this.timerForm.controls['autoBreak'].setValue(xAutoBreak);
    let xAutoPom: any = localStorage.getItem('aPom');
    this.timerForm.controls['autoPom'].setValue(xAutoPom === 'true');
    let xAutoBreak: any = localStorage.getItem('aBre');
    this.timerForm.controls['autoBreak'].setValue(xAutoBreak === 'true')
  }
  constructor( public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private env: Environments,
    public dialogRef: MatDialogRef<NavsideComponent>) {}


    submitTimer() {}

    closeDialog() {

      console.warn('datos enviados antes de cerrar el dialog')
      console.warn(this.timerForm.controls['autoPom'] .value)
      console.warn(this.timerForm.controls['autoBreak'] .value)

      const dataSendModal: any = { 
        pommin: this.timerForm.controls['numPomodoro']   .value,
        nSBreak: this.timerForm.controls['numShortBreak'].value,
        nLBreak:this.timerForm.controls['numLongBreak']  .value,
        aPom:this.timerForm.controls['autoPom']          .value,
        aBre:this.timerForm.controls['autoBreak']        .value,
      }

      console.log(dataSendModal)

      this.dialogRef.close(dataSendModal);
    }

}

