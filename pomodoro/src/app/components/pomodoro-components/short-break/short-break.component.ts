import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-short-break',
  templateUrl: './short-break.component.html',
  styleUrls: ['./short-break.component.scss']
})
export class ShortBreakComponent implements OnInit, OnChanges {
  
  @Input()  minShortB:       any;
  @Input()  autoShortListen: any;
  @Output() finishPomodoroShortBreakEvent = new EventEmitter<number>();
  @Output() cicloCountActual              = new EventEmitter<number>();
  @Output() dataTasksActualicer           = new EventEmitter<{ countCicloActual: number, cicloCount: number, tarea: string }>();
  timer: any;
  pomodoroBreakMinutesCicle: number = 1;
  actionbutton: string = 'START';
  segundos: number = 0;

  constructor(private swPush: SwPush) {}

  ngOnInit(): void {
    let xnSBreak: any = localStorage.getItem( 'nSBreak' );
    this.pomodoroBreakMinutesCicle = xnSBreak;
    console.log(this.autoShortListen)
    if ( this.autoShortListen == undefined || this.autoShortListen == null ) this.autoShortListen = false;
    console.log(this.autoShortListen)
    if( this.autoShortListen ) {
      this.startTimer();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
      if(changes) {
        this.pomodoroBreakMinutesCicle = this.minShortB;
      }
  }

  isRunning: boolean = false; // Variable booleana para controlar si el temporizador está en ejecución o pausado
  startTimer(): void {
    
    if (!this.isRunning) { // Si el temporizador no está en ejecución, iniciar
      this.actionbutton = 'PAUSE';
      this.timer = setInterval(() => {
        if (this.segundos > 0) {
          this.segundos--;
        } else {
          if (this.pomodoroBreakMinutesCicle > 0) {
            this.pomodoroBreakMinutesCicle--;
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
              this.finishPomodoroShortBreakEvent.emit(0);
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

              if (this.swPush.isEnabled) {
                this.swPush.requestSubscription({
                  serverPublicKey: 'BHKgyYWZCd6f6gc5rcllVm79dfXMTzZWROGo512h8xikyCYAdQcjeVqn6m2PdLSC4vuz5cmAiaDPowi48DQ9pPc'
                })
                .then(subscription => {
                  // Envía la notificación push
                  this.swPush.messages.subscribe(message => {
                    // Aquí puedes manejar el mensaje recibido si lo deseas
                    console.log(message);
                  });
                  return subscription;
                })
                .catch(error => console.error(error));
              }

              this.dataTasksActualicer.emit( { countCicloActual: 0, cicloCount: 0, tarea: '' } )
              this.finishPomodoroShortBreakEvent.emit(0);
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
    // this.finishPomodoroShortBreakEvent.emit(0);
    clearInterval(this.timer);
    let xcount:       any = localStorage.getItem('cicloCount');
    let xcountActual: any = localStorage.getItem('countCicloActual');
    if ( xcountActual == null || xcountActual == undefined ) localStorage.setItem( 'countCicloActual',  (1).toString() );
    if ( xcountActual < xcount  ) {
      // alert('estamos lelgando al final');
      Number(xcountActual ++);              
      localStorage.setItem( 'countCicloActual',  xcountActual);
      this.finishPomodoroShortBreakEvent.emit(0);
      this.cicloCountActual.emit(xcountActual);
    } else if ( xcount === xcountActual ) {
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
      this.dataTasksActualicer.emit( { countCicloActual: 0, cicloCount: 0, tarea: '' } )
      this.finishPomodoroShortBreakEvent.emit(0);
    }
  }


}
