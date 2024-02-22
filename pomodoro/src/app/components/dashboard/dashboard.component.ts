import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Environments } from '../environments/environments';
import { SwPush } from '@angular/service-worker';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  pomodoro_view: boolean = true;
  short_break_view: boolean = false;
  long_break_view: boolean = false;
  colorBg: string = '#9FEC6F';
  activeButton: string = 'pomodoro';
  breakEmitAutoStart:any;
  pomoEmitAutoStart:any;
  cicloActuaDash: any;
  pomMin: any;
  shBrMin: any;
  laBrMin: any;

  constructor( private env: Environments, private swPush: SwPush ) { }

  ngOnInit(): void {
    let xtarea: any = localStorage.getItem('tarea');
    let xnpomo: any = localStorage.getItem('nPomo');
    let xsbreak: any = localStorage.getItem('nSBreak');
    let xlbreak: any = localStorage.getItem('nLBreak');
    let xaBre: any = localStorage.getItem('aBre');
    let xapom: any = localStorage.getItem('aPom');
    if( xtarea == undefined  || xtarea == null)  localStorage.setItem( 'tarea',   '' );
    if( xnpomo == undefined  || xnpomo == null)  localStorage.setItem( 'nPomo',   (25)   .toString() );
    if( xsbreak == undefined || xsbreak == null) localStorage.setItem( 'nSBreak', (5)    .toString() );
    if( xlbreak == undefined || xlbreak == null) localStorage.setItem( 'nLBreak', (15)   .toString() );
    if( xaBre == undefined   || xaBre == null)   localStorage.setItem( 'aBre',    (false).toString() );
    if( xapom == undefined   || xapom == null)   localStorage.setItem( 'aPom',    (false).toString() );

    // /**services worker */
    // if (this.swPush.isEnabled) {
    //   // Pregunta al usuario si desea recibir notificaciones push
    //   if (confirm('¿Deseas recibir notificaciones push?')) {
    //     // Si el usuario acepta, solicita la suscripción a las notificaciones push
    //     this.swPush.requestSubscription(
    //       {
    //         serverPublicKey: 'BHKgyYWZCd6f6gc5rcllVm79dfXMTzZWROGo512h8xikyCYAdQcjeVqn6m2PdLSC4vuz5cmAiaDPowi48DQ9pPc'
    //       }
    //     )
    //     .then(subscription => {
    //       // Maneja la suscripción exitosa
    //       console.log('Suscripción exitosa:', subscription); 
    //       // Aquí puedes enviar la suscripción al servidor si es necesario
    //     })
    //     .catch(error => {
    //       // Maneja los errores de la solicitud de suscripción
    //       console.error('Error al solicitar suscripción:', error);
    //     });
    //   }
    // }

  }

  handleFinishPomodoro(event: any): void {

    if ( event == 1 ) {
      this.colorBg          = '#E9E621';
      this.pomodoro_view    = false;
      this.short_break_view = true;
      this.long_break_view  = false;
      this.setActiveButton('shortBreak');
    }
    
    else if ( event == 0 ) {
      this.colorBg          = '#9FEC6F';
      this.pomodoro_view    = true;
      this.short_break_view = false;
      this.long_break_view  = false;
      this.setActiveButton('pomodoro');
    }
    
    else if ( event == 2 ) {
      this.colorBg          = '#E8318F';
      this.pomodoro_view    = false;
      this.short_break_view = false;
      this.long_break_view  = true;
      this.setActiveButton('longBreak');
    }

  }

  tomaCicloActua(event:any) {
    this.cicloActuaDash = event;
  }

  minutosPomodoro(event:any) {
    this.pomMin = event;
  }
  
  shortBreakminutosPomodoro(event:any) {
    this.shBrMin = event;
  }

  largeBreakminutosPomodoro(event:any) {
    this.laBrMin = event;
  }

  autoPomodoroEmit(event:any) {
    this.pomoEmitAutoStart = event;
  }

  breakPomodoroEmit(event:any) {
    this.breakEmitAutoStart = event;
  }

  datatasks:any = []
  captureDatForTasks(event:any) {
    this.datatasks = event;
  }

  setActiveButton(button: string): void {
    this.activeButton = button;
    if( button == 'shortBreak' ) {
      this.pomodoro_view    = false;
      this.short_break_view = true;
      this.long_break_view  = false;
      this.colorBg          = '#E9E621';
    } else if ( button == 'pomodoro' ) {
      this.pomodoro_view    = true;
      this.short_break_view = false;
      this.long_break_view  = false;
      this.colorBg          = '#9FEC6F';
    } else if ( button == 'longBreak' ) {
      this.pomodoro_view    = false;
      this.short_break_view = false;
      this.long_break_view  = true;
      this.colorBg          = '#E8318F';
    }
  }
  
  showApps(data:any) {
    switch( data ) {
      case 1:
        this.pomodoro_view    = true;
        this.short_break_view = false;
        this.long_break_view  = false;
        break;
      case 2:
        this.pomodoro_view    = false;
        this.short_break_view = true;
        this.long_break_view  = false;
        break;
      case 3:
        this.pomodoro_view    = false;
        this.short_break_view = false;
        this.long_break_view  = true;
        break;
    }
  }

}
