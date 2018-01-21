import { DataService } from './data.service';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PostService extends DataService {
  constructor(http: HttpClient) {
    super('http://localhost:3000/api/users', http);
   }
}
