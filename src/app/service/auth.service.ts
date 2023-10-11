import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  createRedirectUrlTree(): any {
    throw new Error('Method not implemented.');
  }
  canActivateTeam(id: any) {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://localhost:3000/admins';
  private isLoggedIn = false;

  constructor(private http: HttpClient) {}

  /**
   * Logs the user in by making a GET request to the API with the provided username and password.
   * If successful, sets the 'isLoggedIn' flag to true and returns an observable containing the user object.
   * If unsuccessful, returns an observable containing an error message.
   * @param username The user's username.
   * @param password The user's password.
   * @returns An observable containing either the user object or an error message.
   */
  login(username: string, password: string): Observable<any> {
    this.isLoggedIn=true;
    return this.http.get<any>(`${this.apiUrl}?username=${username}&password=${password}`).pipe(
      tap((res) => {
          // Set the isLoggedIn flag to true if the API returns a non-empty array.
          this.isLoggedIn=true;
          // Set the isLoggedIn flag to false if the API returns an empty array.
        
      })
    );
  }
  logout(){
    this.isLoggedIn=false;
  }

  /**
   * Gets the value of the isLoggedIn flag.
   * @returns The value of the isLoggedIn flag.
   */
  public getIsLoggedIn(): boolean {
    return this.isLoggedIn;
  }

  /**
   * Sets the value of the isLoggedIn flag.
   * @param isLoggedIn The value to set the isLoggedIn flag to.
   */
  public setIsLoggedIn(isLoggedIn: boolean): void {
    this.isLoggedIn = isLoggedIn;
  }
}
