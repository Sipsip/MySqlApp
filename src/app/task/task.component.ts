import { Component, OnInit } from '@angular/core';
import { PostService } from './../services/post.service';
import { TaskService } from './../services/task.service';
import { Task } from './task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  tasks: Task[];
  tasksByStory: Task[];
  IdTask : Task;

  constructor(private service: TaskService) { }

  ngOnInit() {
    this.service.getAll().subscribe(tasks => this.tasks = tasks);
    
  }
  
  run() {
    console.log("------All Tasks------")
    this.tasks.forEach(function (e) {
      console.log("e.id: " + e.id);
      console.log("e.name: " + e.name);
      console.log("e.description: " + e.description);
    })
    console.log("------Tasks by Story------")
    this.tasksByStory.forEach(function (e) {
      console.log("e.id: " + e.id);
      console.log("e.name: " + e.name);
      console.log("e.description: " + e.description);
    })

    let task : Task = this.tasks[0];
    console.log("tasks[0].name: " + task.name);

    console.log("getById(2): ")
    if (this.IdTask != null) console.log("IdTask.name: " + this.IdTask.id + " description: " + this.IdTask.description);
  }

  getById() {
    console.log("sende GetById-Befehl an server...");
    this.service.getById(2).subscribe(task => this.IdTask = task);
  }

  create() {
    console.log("sende Create-Befehl an server...");
    let e : Task = new Task(2,"created Task", "Dieses Task wurde in task.component erstellt",3, 10, 5);
    this.service.create(e).subscribe();
  }

  update() {
    console.log("sende Update-Befehl an server...");
    let rand : number = Math.floor(Math.random()*(100-1+1)+1);
    console.log("set priority for task 2 as " + rand);
    let e : Task = new Task(2,"created Task", "Dieses Task wurde in task.component erstellt",rand, 10, 6);
    this.service.update(e).subscribe();
  }

  delete() {
    console.log("sende Delete-Befehl an server...");
    this.service.delete(2).subscribe();
  }

  byStoryId() {
    console.log("sende byStoryID-Befehl an server...");
    this.service.getByStoryId(1).subscribe(tasksByStory => this.tasksByStory = tasksByStory);
  }
}
