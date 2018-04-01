import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Question } from '../question.model';
import { Answer } from '../../answer/answer.model';
import { environment } from '../../../environments/environment';
import * as urljoin from 'url-join';

import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';

@Injectable()

export class QuestionService {

  private questionsUrl: string;

  constructor(
    private http: HttpClient
  ) {
    this.questionsUrl = urljoin(environment.apiUrl, 'questions');
  }

  getQuestions(): Observable<HttpResponse<void | Question[]>> {
    return this.http.get<void | Question[]>(this.questionsUrl, { observe: 'response' })
      .pipe(
        catchError(this.handleError)
      )
  }

  getQuestion(id): Observable<HttpResponse<void | Question>> {
    const url = urljoin(this.questionsUrl, id);
    return this.http.get<void | Question>(url, { observe: 'response' })
      .pipe(
        catchError(this.handleError)
      )
  }

  addQuestion(question: Question): Observable<HttpResponse<any>> {
    const body = JSON.stringify(question);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(this.questionsUrl, body, { headers, observe: 'response', reportProgress: true })
      .pipe(
        catchError(this.handleError)
      )
  }

  addAnswer(answer: Answer): Observable<HttpResponse<any>> {
    const a = {
      description: answer.description,
      question: {
        _id: answer.question._id
      }
    };
    const body = JSON.stringify(a);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const url = urljoin(this.questionsUrl, answer.question._id.toString(), 'answers');

    return this.http.post(url, body, { headers, observe: 'response', reportProgress: true })
      .pipe(
        catchError(this.handleError)
      )
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      debugger
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      debugger
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      // console.error(
      //   `Backend returned code ${error.status}, ` +
      //   `body was: ${error.error}`);
      const errMsg = error.message ? error.message :
      error.status ? `${error.status} - $ {error.status.text}` : 'Server error';

      console.error(errMsg);
    }
    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable(
      'Something bad happened; please try again later.');
  };

}
