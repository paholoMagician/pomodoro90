import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environments } from 'src/app/components/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class WebPushNotificationsService {

  private _swRegistration:any;
  private _isSubscribed: any;
  private applicationServerPublicKey: any;

  constructor( private env: Environments, private http: HttpClient ) { 
    this.applicationServerPublicKey = 'BHKgyYWZCd6f6gc5rcllVm79dfXMTzZWROGo512h8xikyCYAdQcjeVqn6m2PdLSC4vuz5cmAiaDPowi48DQ9pPc';
  }

  private checkServiceWorkerPushEnabled(): boolean { 
    return ('serviceWorker' in navigator && 'PushManager' in window);
  }

}
