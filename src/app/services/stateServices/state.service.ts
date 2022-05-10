import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  isSignedIn!: boolean
  isRegistered!:boolean
  userId!: String
  busId!: String

  constructor() {
    this.isSignedIn = false
    this.isRegistered=false
    this.userId = ""
    this.busId = ""
  }

  getSignedIn() {
    return this.isSignedIn
  }

  getUserId() {
    return this.userId
  }

  getBusId() {
    return this.busId
  }

  getIsRegistered(){
    return this.isRegistered
  }

  setIsRegistered(isRegistered:any){
    this.isRegistered=isRegistered
  }

  setSignedIn(status: boolean) {
    this.isSignedIn = status
    // console.log(this.isSignedIn);
  }

  setUserId(userId: any) {
    this.userId = userId
    // console.log("Service" + userId);
  }

  setBusId(busId: any) {
    this.busId = busId
  }
}
