import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Environments } from '../../environments/environments';
import { FormControl, FormGroup } from '@angular/forms';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit, OnChanges {

  @Input() datatasksListen: any [] = [];
  @Input() cicloListen: any;

  items: MenuItem[] | undefined;
  modelTaskPomodoro: any = [];
  count: number = 1;
  cicloCount: number = 1;
  tarea: string = '';
  action_btn: string ='Añadir';
  _disabled_tasks: boolean = false;

  tasksForm = new FormGroup (
    { 
      nombreTasks: new FormControl(''),
      descripcionTasks: new FormControl(''),
      ciclo: new FormControl(1),
    }
  )

  ngOnInit(): void {
    this.botonDistMenu();
    const xc: any = localStorage.getItem('cicloCount');
    if(xc == undefined || xc == null) localStorage.setItem('cicloCount', (1).toString());
    const xca: any = localStorage.getItem('countCicloActual');
    if(xca == undefined || xca == null) localStorage.setItem('countCicloActual', (1).toString());
    const xt: any = localStorage.getItem('tarea');
    this.cicloCount = xc;
    this.count      = xca;
    this.tarea      = xt;
  }

  modelDataListe: any = []
  ngOnChanges(changes: SimpleChanges): void {
      if(changes) {
        if( this.datatasksListen ) {
          this.modelDataListe = this.datatasksListen;
          this.count = this.modelDataListe.countCicloActual; 
          this.cicloCount = this.modelDataListe.cicloCount;
          this.tarea = this.modelDataListe.tarea;
        }
        

        if( this.cicloListen == undefined || this.cicloListen == null ) this.cicloListen = 1;
        // console.warn('this.cicloListen esto estoy enviando a tasks')
        // console.warn(this.cicloListen)
        const xc: any = localStorage.getItem('cicloCount');        
        const xca: any = localStorage.getItem('countCicloActual');        
        this.count = xca;
        this.cicloCount = xc;

      }
  }

  constructor( private env: Environments ) {}

  botonDistMenu() {
    this.items = [
      {
          label: 'Options',
          items: [
              {
                  label: 'Crear tarea',
                  icon: 'pi pi-add',
                  command: () => {
                    this._disabled_tasks = !this._disabled_tasks;              
                  }
              },
              // {
              //     label: 'Delete',
              //     icon: 'pi pi-times',
              //     command: () => {
                      
              //     }
              // }
          ]
      },
      // {
      //     label: 'Navigate',
      //     items: [
      //         {
      //             label: 'Angular',
      //             icon: 'pi pi-external-link',
      //             url: 'http://angular.io'
      //         },
      //         {
      //             label: 'Router',
      //             icon: 'pi pi-upload',
      //             routerLink: '/fileupload'
      //         }
      //     ]
      // }
  ];
  }

  submit() {
    switch(this.action_btn) {
      case 'Añadir':
        this.guardarTasks();
        break;
      case '':
        break;
    }
  }

  guardarTasks() {
    this.modelTaskPomodoro = this.tasksForm.value;
    this.cicloCount = this.modelTaskPomodoro.ciclo;
    this.tarea = this.modelTaskPomodoro.nombreTasks;
    /** Persistencia de datos */
    localStorage.setItem( 'cicloCount', this.cicloCount.toString());
    localStorage.setItem( 'tarea',      this.tarea);
    this.limpiar();
  }

  limpiar() {
    this.tasksForm.controls['nombreTasks'].setValue('');
    this.tasksForm.controls['descripcionTasks'].setValue('');
    this.tasksForm.controls['ciclo'].setValue(1);
    this.action_btn   = 'Añadir';
    this._disabled_tasks = false;
  }

 
}
