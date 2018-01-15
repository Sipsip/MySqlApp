import { Injectable } from '@angular/core';
import { Task } from '../task/task';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TaskService {

  constructor() { }

  getTasks(): Observable<Task[]> {
    
    return null;
  }

  getTask(id: number): Observable<Task> {
    
    return null;
  }

  create(task: Task) {
  }

  update(task: Task) {
  }

  delete(id: number) {
  }
}
