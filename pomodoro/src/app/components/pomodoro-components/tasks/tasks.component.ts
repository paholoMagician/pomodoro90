import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Environments } from '../../environments/environments';
import { FormControl, FormGroup } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { TasksService } from './services/tasks.service';
import { EncryptService } from '../../shared/services/encrypt.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit, OnChanges {

  _show_spinner: boolean = false;

  @Input() datatasksListen: any [] = [];
  @Input() cicloListen: any;

  items: MenuItem[] | undefined;
  modelTaskPomodoro: any     = [];
  count:             number  = 1;
  cicloCount:        number  = 1;
  tarea:             string  = '';
  action_btn:        string  ='Añadir';
  _disabled_tasks:   boolean = false;
  listaPomodoro:     any     = [];

  tasksForm = new FormGroup ({ 
    nombreTasks:      new FormControl(''),
    descripcionTasks: new FormControl(''),
    ciclo:            new FormControl(1),
  })

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
    const xid: any = sessionStorage.getItem('c_c_r_u');
    const decryptId: any = this.ncrypt.decryptWithAsciiSeed( xid, this.env.seed, this.env.hashlvl );
    this.obtenerPomo( decryptId );
  }

  modelDataListe: any = []
  ngOnChanges(changes: SimpleChanges): void {
      if(changes) {

        if( this.datatasksListen ) {
          this.modelDataListe = this.datatasksListen;
          this.count          = this.modelDataListe.countCicloActual; 
          this.cicloCount     = this.modelDataListe.cicloCount;
          this.tarea          = this.modelDataListe.tarea;
        }

        if( this.cicloListen == undefined || this.cicloListen == null ) this.cicloListen = 1;
        const xc:  any  = localStorage.getItem('cicloCount');
        const xca: any  = localStorage.getItem('countCicloActual');
        this.count      = xca;
        this.cicloCount = xc;

      }
  }

  constructor( private env: Environments, private pomodoro: TasksService, private ncrypt: EncryptService ) {}

  botonDistMenu() {
    this.items = [
      {
          label: 'Options',
          items: [
              {
                  label: 'Crear tarea',
                  // icon: 'pi pi-add',
                  command: () => {
                    this._disabled_tasks = !this._disabled_tasks;              
                  }
              },
              // {
              //     label: 'Seguimiento de tareas',
              //     // icon: 'pi pi-times',
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

  modelPomodoro: any = []
  guardarPomo() {

    const xid: any = sessionStorage.getItem('c_c_r_u');
    const decryptId: any = this.ncrypt.decryptWithAsciiSeed( xid, this.env.seed, this.env.hashlvl );
    let pomoMin: any = localStorage.getItem('nPomo');
    let sbreakmin: any = localStorage.getItem('nSBreak');
    let lbreakmin: any = localStorage.getItem('nLBreak');

    this.modelPomodoro = {
      nombretarea:      this.tasksForm.controls['nombreTasks'].value,
      descripciontarea: this.tasksForm.controls['descripcionTasks'].value,
      ciclos:           this.tasksForm.controls['ciclo'].value,
      fechacrea:        new Date(),
      idusercrea:       decryptId,
      pomomin:          pomoMin,
      sbreakmin:        sbreakmin,
      lognbreakmin:     lbreakmin,
      pomominterminal: 0,
      lognbreakminterminal: 0,
      sbreakminterminal: 0,
      estado: 0
    }

    console.warn(this.modelPomodoro);
    this.pomodoro.guardarPomodoro(this.modelPomodoro).subscribe({
      next: ( x:any ) => console.warn('Se ha guardado la tarea en db!'),
      error: (e)      => console.error(e),
      complete: () => this.obtenerPomo( decryptId )
    })

  }

  guardarTasks() {
    const xid: any = sessionStorage.getItem('c_c_r_u');
    this.modelTaskPomodoro = this.tasksForm.value;
    this.cicloCount = this.modelTaskPomodoro.ciclo;
    this.tarea = this.modelTaskPomodoro.nombreTasks;
    localStorage.setItem( 'cicloCount', this.cicloCount.toString());
    localStorage.setItem( 'tarea',      this.tarea);
    if( xid != undefined || xid != null ) this.guardarPomo();
    setTimeout(() => {
      this.limpiar();
    }, 1000);
  }

  eliminarPom( id:any ) {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "Si eliminas estos datos ya no los podrás recuperar.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo!"
    }).then((result) => {
      if (result.isConfirmed) {
        this._show_spinner = true;
        this.pomodoro.eliminarPomodoro(id).subscribe({
          next: (x) => {
            Swal.fire({
              title: "Eliminado!",
              text:  "Este pomodoro ha sido eliminado.",
              icon:  "success"
            });
            this._show_spinner = false;
          }, error: (e) => {
            Swal.fire({
              title: "Oops!",
              text:  "Algo ha pasado.",
              icon:  "error"
            });
            this._show_spinner = false;
            console.error(e);
          }, complete: () => {
            const xid: any = sessionStorage.getItem('c_c_r_u');
            const decryptId: any = this.ncrypt.decryptWithAsciiSeed( xid, this.env.seed, this.env.hashlvl );
            this.obtenerPomo(decryptId);
          }
        })
      }
    });    
  }

  obtenerPomo( id:any ) {
    this._show_spinner = true;
    this.pomodoro.obtenerPomodoro(id).subscribe({
      next: (x) => {
        this.listaPomodoro = x;
        console.log(this.listaPomodoro);
        this._show_spinner = false;
      }, error: (e) => {
        this._show_spinner = false;
        console.error(e);
      }
    })
  }

  limpiar() {
    this.tasksForm.controls['nombreTasks'].setValue('');
    this.tasksForm.controls['descripcionTasks'].setValue('');
    this.tasksForm.controls['ciclo'].setValue(1);
    this.action_btn   = 'Añadir';
    this._disabled_tasks = false;
  }

 
}
