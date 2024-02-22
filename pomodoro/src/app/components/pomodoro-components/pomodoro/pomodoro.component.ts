import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-pomodoro',
  templateUrl: './pomodoro.component.html',
  styleUrls: ['./pomodoro.component.scss']
})

export class PomodoroComponent implements OnInit, OnChanges {

  @ViewChild('audioPlayer') audioPlayer!: ElementRef;
  
  @Output() finishPomodoroEvent = new EventEmitter<number>();
  
  @Input() minPOM: any;
  @Input() autoPomodoroListen: any; 

  timer: any;
  actionbutton: string = 'START';
  pomodoroMinutesCicle: number = 1;
  
  isRunning: boolean = false;

  segundos: number = 0;
  horas:    number = 0;

  ngOnInit() { 
    let xpnom: any = localStorage.getItem( 'nPomo' );
    let xciclo: any = localStorage.getItem( 'cicloCount' );
    let xcountCicloActual: any = localStorage.getItem( 'countCicloActual' );
    let xtarea: any = localStorage.getItem( 'tarea' );
    this.pomodoroMinutesCicle = xpnom;
    if( this.autoPomodoroListen == undefined || this.autoPomodoroListen == null ) this.autoPomodoroListen = false;
    if(this.autoPomodoroListen) {
      if ( (xciclo != 1 && xcountCicloActual != 1) || xtarea != '') {
        this.startTimer();
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes) {
      if( this.minPOM == undefined || this.minPOM == null ) this.minPOM = 1;
      this.pomodoroMinutesCicle = this.minPOM;
      setTimeout(() => {
        this.playAudio();
      }, 1000);
    }
  }
  
  startTimer(): void {
    
    let x:any = localStorage.getItem('countCicloActual');
    if ( x == undefined || x == null ) localStorage.setItem('countCicloActual', (1).toString());
    if (!this.isRunning) {
      this.actionbutton = 'PAUSE';
      this.timer = setInterval(() => {
        if (this.segundos > 0) {
          this.segundos--;
        } else {
          if (this.pomodoroMinutesCicle > 0) {
             this.pomodoroMinutesCicle--;
             this.segundos = 59;
          }        
          else {
            clearInterval(this.timer);
            if( x > 0 && x % 4 !== 0 ) {
              this.finishPomodoroEvent.emit(1);
            }
            else if (x % 4 === 0) {
              this.finishPomodoroEvent.emit(2);
            }
          }
        }
      }, 1000);
      this.isRunning = true;
    } else {
      this.actionbutton = 'START';
      clearInterval(this.timer);
      this.autoPomodoroListen = false;
    }
    
  }
  
  formatTime(value: number): string {
    return value.toString().padStart(2, '0');
  }

  playAudio(): void {
    const audioElement: HTMLAudioElement = this.audioPlayer.nativeElement;
    audioElement.play();
  }

  reedirigir() {
    let x:any = localStorage.getItem('countCicloActual');
    if ( x == undefined || x == null ) localStorage.setItem('countCicloActual', (1).toString());
    clearInterval(this.timer);
    if( x > 0 && x % 4 !== 0 ) this.finishPomodoroEvent.emit(1);
    else if (x % 4 === 0)      this.finishPomodoroEvent.emit(2);
  }

}
