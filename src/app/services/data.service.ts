import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Post } from "./../post/post";
import { Epic } from "./../post/epic";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { Type } from '@angular/compiler/src/core';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class DataService {
  response: any;
  constructor(private url: string, private http: HttpClient) { }

  getAll(): Observable<any[]> {
    return this.http.get<Epic[]>(this.url)
      .pipe(
      tap(heroes => this.log(`fetched heroes`)),
      catchError(this.handleError('getAll', []))
      );
  }

  getById(id: number): Observable<any> {

/*
const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
    */

    const url = `${this.url}/${id}`;
    return this.http.get<any>(url)
      .pipe(
      tap(_ => this.log(`got Object id=${id}`)),
      catchError(this.handleError<Object>('getById'))
      );
  }

  create(resource): Observable<any> {
    return this.http.post(this.url, resource, httpOptions)
      .pipe(
      tap((resource) => this.log(`added Object w/ id=${resource.toString()}`)),
      catchError(this.handleError<Object>('create'))
      );
  }

  update(resource): Observable<any> {
    return this.http.put(this.url, resource, httpOptions)
      .pipe(
      tap((resource) => this.log(`updated Object w/ id=${resource.toString()}`)),
      catchError(this.handleError<Object>('update'))
      );
  }

  delete(id: number): Observable<any> {
    const url = `${this.url}/${id}`;
    return this.http.delete<any>(url, httpOptions)
      .pipe(
      tap(_ => this.log(`deleted Object id=${id}`)),
      catchError(this.handleError<Object>('delete'))
      );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.log("an Error occured:");
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


  private log(message: string) {
    console.log(message);
  }
}
