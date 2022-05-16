import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  isSignedIn!: boolean
  isRegistered!: boolean
  isAdmin!: boolean
  userId!: String
  busId!: String

  constructor(private router:Router) {
    this.isSignedIn = false
    this.isRegistered = false
    this.isAdmin = false
    this.userId = ""
    this.busId = ""
  }

  getIsAdmin() {
    return this.isAdmin
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

  getToken(){
    return localStorage.getItem('token')
  }
  
  setToken(token:any){
    localStorage.setItem('token',token)
  }

  getRefreshToken(){
    return localStorage.getItem('refreshToken')
  }
  
  setRefreshToken(token:any){
    localStorage.setItem('refreshToken',token)
  }
  
  getIsRegistered() {
    return this.isRegistered
  }

  setIsRegistered(isRegistered: any) {
    this.isRegistered = isRegistered
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

  setIsAdmin(isAdmin: any) {
    this.isAdmin = isAdmin
  }

  logout(){
    this.setSignedIn(false)
    this.setIsAdmin(false)
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
    this.router.navigateByUrl('user/login');

  }
}
