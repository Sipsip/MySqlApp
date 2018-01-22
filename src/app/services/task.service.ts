import { Injectable } from '@angular/core';
import { Task } from '../task/task';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';

//Für nicht-vererbte http-requests:
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class TaskService extends DataService {

  constructor(http: HttpClient) {
    super('http://localhost:3000/api/tasks', http);
  }

  getAll(): Observable<Task[]> {
    return super.getAll()
      .map(taskList => taskList = taskList
        .map(taskDB => taskDB = new Task(taskDB.TaskID, taskDB.Name, taskDB.Description, taskDB.Priority, taskDB.Workload, taskDB.WorkedTime, taskDB.StoryID, taskDB.SprintID, taskDB.UserID)));
  }

  getById(id: number): Observable<Task> {
    return super.getById(id)
      .map(taskDB => taskDB = new Task(taskDB.TaskID, taskDB.Name, taskDB.Description, taskDB.Priority, taskDB.Workload, taskDB.WorkedTime, taskDB.StoryID, taskDB.SprintID, taskDB.UserID))
  }

  create(task): Observable<Task> {
    var transferObject: any = {};
    //ID wird nicht berücksichtigt, da auto-increment
    //transferObject.TaskId = task.id;
    transferObject.Name = task.name;
    transferObject.Description = task.description;
    transferObject.Priority = task.priority;
    transferObject.Workload = task.workload;
    transferObject.WorkedTime = task.workedTime;
    transferObject.StoryID = task.storyId;
    transferObject.SprintID = task.sprintId;
    transferObject.UserID = task.userId;
    console.log(JSON.stringify(transferObject));
    return super.create(JSON.stringify(transferObject));;
  }

  update(task): Observable<Task> {
    var transferObject: any = {};
    transferObject.TaskID = task.id;
    transferObject.Name = task.name;
    transferObject.Description = task.description;
    transferObject.Priority = task.priority;
    transferObject.Workload = task.workload;
    transferObject.WorkedTime = task.workedTime;
    transferObject.StoryID = task.storyId;
    transferObject.SprintID = task.sprintId;
    transferObject.UserID = task.userId;
    console.log(JSON.stringify(transferObject));
    return super.update(JSON.stringify(transferObject));;
  }

  delete(id: number): Observable<number> {
    return super.delete(id);
  }

  getByStoryId(id: number): Observable<Task[]> {
    const url = `${this.url}/byStory/${id}`;

    let result: Observable<any[]> = this.http.get<Task[]>(url)
      .pipe(
      tap(h => {
        const outcome = h ? `fetched` : `did not find`;
        this.log(`${outcome} Object id=${id}`);
      }),
      catchError(this.handleError('getAll', []))
      );
    return result.map(taskList => taskList = taskList
      .map(taskDB => taskDB = new Task(taskDB.TaskID, taskDB.Name, taskDB.Description, taskDB.Priority, taskDB.Workload, taskDB.WorkedTime, taskDB.StoryID, taskDB.SprintID, taskDB.UserID)));
  }
}
