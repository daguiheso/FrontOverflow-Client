import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { User } from '../user.model';
import { environment } from '../../../environments/environment';
import * as urljoin from 'url-join';

import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()

export class AuthService {

  usersUrl: string;
  currentUser?: User;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.usersUrl = urljoin(environment.apiUrl, 'auth');

    if (this.isLoggedIn()) {
      const { userId, firstName, lastName, email } = JSON.parse(localStorage.getItem('user'));
      this.currentUser = new User(email, null, firstName, lastName, userId);
    }
  }

  signin(user: User): Observable<HttpResponse<any>> {
    const body = JSON.stringify(user);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })

    return this.http.post(urljoin(this.usersUrl, 'signin'), body, { headers, observe: 'response' })
      .pipe(
        // tap(
        //   res => {
        //     this.login(res.body);
        //   },
        //   error => {
        //     debugger
        //   }
        // ),
        catchError(this.handleError)
      )
  }

  login = (user) => {
    this.currentUser = new User(user.email, null, user.firstName, user.lastName, user.userId);
    localStorage.setItem('token', user.token);
    localStorage.setItem('user', JSON.stringify(this.currentUser));
    this.router.navigateByUrl('/');
  }

  isLoggedIn() {
    return localStorage.getItem('token') !== null;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
      return new ErrorObservable(error.error);
    } else {
      const errMsg = error.message ? error.message :
        error.status ? `${error.status} - $ {error.status.text}` : 'Server error';

      console.error(errMsg);
      return new ErrorObservable(errMsg);
    }
  };

}
