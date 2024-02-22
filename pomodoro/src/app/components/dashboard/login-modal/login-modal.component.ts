import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Environments } from '../../environments/environments';
import { NavsideComponent } from '../../shared/navside/navside.component';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginService } from './services/login.service';
import { DashboardService } from '../services/dashboard.service';
import { FocusTrackingService } from '../services/focus-tracking.service';
import Swal from 'sweetalert2'
import { EncryptService } from '../../shared/services/encrypt.service';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})


@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {

  token:any;
  tokeng:any;
  _show_spinner:  boolean = false;
  isLoginActive:  boolean = false;
  isSignUpActive: boolean = false;

  publicIpAddress: string | null = null;
  _log:boolean     = true;
  _login:boolean   = true;
  _signUp:boolean  = false;
  btnDis:boolean   = true;
  msjSignUp:string = '';
  modelUbicacion: any = [];
  modelUser: any   = [];

  modelLogin:any = [];
  response:any=[];

  versionamiento: string = '';

  public loginForm = new FormGroup({
    email:    new FormControl(''),
    password: new FormControl('')
  });

  public signForm = new FormGroup({
    nombre:    new FormControl(''),
    email:    new FormControl(''),
    password: new FormControl(''),
    repassword: new FormControl(''),
    edad: new FormControl()
  });

  constructor( public dialog: MatDialog,
    private login: LoginService,
    private dash: DashboardService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private focusTrackingService: FocusTrackingService,
    private ncrypt: EncryptService,
    private env: Environments,
    public dialogRef: MatDialogRef<NavsideComponent>) {}


  ngOnInit(): void {
      
  }

  
  onInputFocus() {
    this.focusTrackingService.inputHasFocus = true;
  }
  
  onInputBlur() {
    this.focusTrackingService.inputHasFocus = false;
  }
              
  onSubmitLogin() {
    this.loginUser();
  }

  onSubmitSignUp() {
    this.signUser();
  }

  desabilitar() {
    setTimeout(() => {
      this.btnDis = true;
    }, 500);
  }

  toggleLogin() {
    this.isLoginActive = !this.isLoginActive;
    this.isSignUpActive = false;
  }

  toggleSignUp() {
    this.isSignUpActive = !this.isSignUpActive;
    this.isLoginActive = false;
  }
  
  loginUser() {

    this._show_spinner = true;

    this.modelLogin = {
      "email":    this.loginForm.controls['email'].value,
      "password": this.loginForm.controls['password'].value,
    }

    console.warn(this.modelLogin)

    this.login.logUser( this.modelLogin ).subscribe({

      next: (x) => {        
        this.response = x;
        this._show_spinner = false;
        Toast.fire({
          icon: 'success',
          title: '¡Bienvenido!',
        })      
      }, error: (e) => {      
        console.error(e);
        this.response = e;
        this._show_spinner = false;
        Toast.fire({
          icon: 'error',
          title: 'Credenciales incorrectas intentalo de nuevo...',
          footer: 'O contacta con el proveedor del sistema. www.orangeapp.como/tickets'
        })      
      },complete: () => {        
        const cryptCuser: any = this.ncrypt.encryptWithAsciiSeed(this.response.iduser, this.env.seed, this.env.hashlvl );
        const cryptemail: any = this.ncrypt.encryptWithAsciiSeed(this.response.email, this.env.seed, this.env.hashlvl );
        const cryptname:  any = this.ncrypt.encryptWithAsciiSeed(this.response.nombreUsuario, this.env.seed, this.env.hashlvl );
        const cryptedad:  any = this.ncrypt.encryptWithAsciiSeed(this.response.edad, this.env.seed, this.env.hashlvl );        
        sessionStorage.setItem('c_c_r_u',   cryptCuser);
        sessionStorage.setItem('c_e_r_u_m', cryptemail);
        sessionStorage.setItem('c_n_r_u',   cryptname);
        sessionStorage.setItem('c_e_r_u',   cryptedad);        
        this.closeDialog();
      }

    })
  }

  closeDialog() {
    this._show_spinner = true;
    setTimeout(() => {
      this._show_spinner = false;
      this.dialogRef.close(this.response);
    }, 1500);
  }

  signUser() {
    this._show_spinner = true;
    let date = new Date();
    let dia:  any = date.getDay();
    let mes:  any = date.getMonth();
    let anio: any = date.getFullYear();

    this.token = 'US-'+this.generarTOKEN()+dia+mes+anio;

    this.modelUser = {
      nombreUsuario:  this.signForm.controls['nombre']  .value,
      email :         this.signForm.controls['email']   .value,
      password:       this.signForm.controls['password'].value,
      edad :          this.signForm.controls['edad']    .value,
      estadoConexion: 1
    }

    console.warn(this.modelUser);

    this.login.guardarUsuario(this.modelUser).subscribe({
      next: (x) => {
        Swal.fire (
          '¿En hora buena?',
          'Haz creado tu cuenta exitósamente',
          'success'
        )
      }, error: (e) => {
        Swal.fire (
          'Oops Algo ha ocurrido!',
          'Intenalo de nuevo más tarde',
          'error'
        )
      }, complete: () => {
        const email: any = this.signForm.controls['email']   .value;
        const pass: any  = this.signForm.controls['password'].value;
        setTimeout(() => {
          this._show_spinner = false;
          this._login  = true;
          this._signUp = false;
          this.loginForm.controls['email']   .setValue(email);
          this.loginForm.controls['password'].setValue(pass);
        }, 1000);
      }
    })

  }

  generarTOKEN(): string {
    this.tokeng = this.dash.generateRandomString(15);
    return this.tokeng;
  }

  passwordMatchValidator() {
    const password = this.signForm.controls['password'].value;
    const repassword = this.signForm.controls['repassword'].value;
    if (password === repassword) {
      this.btnDis = false;
    } else {
      this.btnDis = true;
    }
  }


}
