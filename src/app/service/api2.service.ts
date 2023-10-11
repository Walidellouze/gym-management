import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Coach } from '../models/register2.model';

@Injectable({
  providedIn: 'root'
})
export class Api2Service {

  private baseUrl: string = "http://localhost:3000/enquiry2"
  constructor(private http: HttpClient) { }

  postRegistration(registerObj: Coach) {
    return this.http.post<Coach>(`${this.baseUrl}`, registerObj)
  }

  getRegisteredCoach() {
    return this.http.get<Coach[]>(`${this.baseUrl}`)
  }

  updateRegisterCoach(registerObj: Coach, id: number) {
    return this.http.put<Coach>(`${this.baseUrl}/${id}`, registerObj)
  }

  deleteRegistered(id: number) {
    return this.http.delete<Coach>(`${this.baseUrl}/${id}`)
  }

  getRegisteredCoachId(id: number) {
    return this.http.get<Coach>(`${this.baseUrl}/${id}`)
  }

}

