import { DataService } from './data.service';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Epic } from "./../post/epic";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class PostService extends DataService {
  constructor(http: HttpClient) {
    super('http://localhost:3000/api/users', http);
   }

   getAll(): Observable<Epic[]> {
    return super.getAll()
    .map(epicList => epicList = epicList
      .map(epicDB => epicDB = new Epic(epicDB.EpicID, epicDB.Name, epicDB.Description, epicDB.Priority)));

   }
}
