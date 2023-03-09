import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  message = '';
  constructor() { }

  setMsg(msg: any) {
    this.message = msg;
  }
  getMsg() {
    return  this.message;
  }
}
