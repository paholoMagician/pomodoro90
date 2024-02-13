import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-long-break',
  templateUrl: './long-break.component.html',
  styleUrls: ['./long-break.component.scss']
})
export class LongBreakComponent implements OnInit, OnChanges {

  @Output() finishLongBreakEvent = new EventEmitter<number>();
  @Input()  lonShortB: any;
  @Output() cicloCountActual = new EventEmitter<number>();
  @Output() dataTasksActualicer = new EventEmitter<{ countCicloActual: number, cicloCount: number, tarea: string }>(); 
  @Input()  autoLongtListen: any;


  timer: any;
  actionbutton: string = 'START';
  pomodoroMinutesCicle: number = 2;
  
  isRunning: boolean = false; // Variable booleana para controlar si el temporizador está en ejecución o pausado

  segundos: number = 0;
  horas:    number = 0;

  ngOnInit(): void {
    let xnLBreak: any = localStorage.getItem( 'nLBreak' );
    this.pomodoroMinutesCicle = xnLBreak;
    console.log('LONG BREAK::::::: autoLongtListen');
    console.log(this.autoLongtListen);
    if( this.autoLongtListen ) {
      this.startTimer();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
      if (changes) {
        this.pomodoroMinutesCicle = this.lonShortB;
      }
  }
  
  startTimer(): void {
    
    if (!this.isRunning) { // Si el temporizador no está en ejecución, iniciar
      this.actionbutton = 'PAUSE';
      this.timer = setInterval(() => {
        if (this.segundos > 0) {
          this.segundos--;
        } else {
          if (this.pomodoroMinutesCicle > 0) {
            this.pomodoroMinutesCicle--;
            this.segundos = 3;
          } else {
            clearInterval(this.timer);
            let xcount:       any = localStorage.getItem('cicloCount');
            let xcountActual: any = localStorage.getItem('countCicloActual');
            if ( xcountActual == null || xcountActual == undefined ) localStorage.setItem( 'countCicloActual',  (1).toString() );
            if ( xcountActual < xcount  ) {
              // alert('estamos lelgando al final');
              Number(xcountActual ++);              
              localStorage.setItem( 'countCicloActual',  xcountActual);
              this.finishLongBreakEvent.emit(0);
              this.cicloCountActual.emit(xcountActual);
            }
            else if ( xcount === xcountActual ) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Tu tarea ha terminado",
                showConfirmButton: false,
                timer: 2000
              });
              localStorage.setItem('countCicloActual', (1).toString());
              localStorage.setItem('cicloCount', (1).toString());
              localStorage.setItem('tarea', '');
              this.dataTasksActualicer.emit(
                { countCicloActual: 0, cicloCount: 0, tarea: '' }
              )
              this.finishLongBreakEvent.emit(0);
            }
            
          }
        }
      }, 1000);
      this.isRunning = true; // Actualizar el estado a en ejecución
    } else { 
      // Si el temporizador está en ejecución, pausar
      this.actionbutton = 'START';
      clearInterval(this.timer); // Detener el intervalo
      this.isRunning = false; // Actualizar el estado a pausado
    }
    
  }
  
  formatTime(value: number): string {
    return value.toString().padStart(2, '0');
  }

  reedirigir() {
    clearInterval(this.timer);
    let xcount:       any = localStorage.getItem('cicloCount');
    let xcountActual: any = localStorage.getItem('countCicloActual');
    if ( xcountActual == null || xcountActual == undefined ) localStorage.setItem( 'countCicloActual',  (1).toString() );
    if ( xcountActual < xcount  ) {
      // alert('estamos lelgando al final');
      Number(xcountActual ++);              
      localStorage.setItem( 'countCicloActual',  xcountActual);
      this.finishLongBreakEvent.emit(0);
      this.cicloCountActual.emit(xcountActual);
    }
    else if ( xcount === xcountActual ) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Tu tarea ha terminado",
        showConfirmButton: false,
        timer: 2000
      });
      localStorage.setItem('countCicloActual', (1).toString());
      localStorage.setItem('cicloCount', (1).toString());
      localStorage.setItem('tarea', '');
      this.dataTasksActualicer.emit(
        { countCicloActual: 0, cicloCount: 0, tarea: '' }
      )
      this.finishLongBreakEvent.emit(0);
    }
    
  }


}
