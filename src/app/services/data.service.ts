import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Post } from "./../post/post";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class DataService {
  constructor(private url: string, private http: HttpClient) { }

/*Wie im Angular.io-tutorial:
getAll (): Observable<Post[]> {
  return this.http.get<Post[]>(this.url)
    .pipe(
      tap(heroes => this.log(`fetched heroes`)),
      catchError(this.handleError('getHeroes', []))
    );
}
  */
  getAll() {
    this.http.get(this.url)
    .subscribe(data => console.log("get User: " + data[0].Name))
    return null;
  }
/*
  getAll () {
    this.log("getAll() called");
    let results : any[];
    
    results = this.http.get(this.url).subscribe(data => {
      this.log("in http-method");
    });
    

    //this.log("getAll() response: "+ Object.keys(results).length);
    

    return results;
  }*/

  create(resource) {
    return this.http.post(this.url, JSON.stringify(resource))
      //.map(response => response.json())
  }

  update(resource) {
    return this.http.patch(this.url + '/' + resource.id, JSON.stringify({ isRead: true }))
      //.map(response => response.json())
  }

  delete(id) {
    return this.http.delete(this.url + '/' + id)
      //.map(response => response.json())
  }


  private handleError<T> (operation = 'operation', result?: T) {
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
