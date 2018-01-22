import { Component, OnInit } from '@angular/core';
import { PostService } from './../services/post.service';
import { Post } from './post';
import { Epic } from './epic';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  epics: Epic[];
  IdEpic : Epic;

  constructor(private service: PostService) { }

  ngOnInit() {
    this.service.getAll().subscribe(epics => this.epics = epics);
    //.subscribe(posts => this.posts = posts)
    //console.log("reveived posts " + this.epics)
    //console.log("First post " + this.epics[0])
    
  }
  
  run() {
    this.epics.forEach(function (e) {
      console.log("e.id: " + e.id);
      console.log("e.name: " + e.name);
      console.log("e.description: " + e.description);
    })

    let epic : Epic = this.epics[0];
    console.log("epics[0].name: " + epic.name);

    console.log("getById(2): ")
    console.log("IdEpic.name: " + this.IdEpic.id + " description: " + this.IdEpic.description);
  }

  getById() {
    console.log("sende GetById-Befehl an server...");
    this.service.getById(2).subscribe(epic => this.IdEpic = epic);
  }

  create() {
    let e : Epic = new Epic(2,"created Epic", "Dieses Epic wurde in post.component erstellt",3);
    this.service.create(e).subscribe();
    console.log("create() in Component aufgerufen");
  }

  update() {
    let rand : number = Math.floor(Math.random()*(100-1+1)+1);
    console.log("set priority for epic 2 as " + rand);
    let e : Epic = new Epic(2,"created Epic", "Dieses Epic wurde in post.component erstellt",rand);
    this.service.update(e).subscribe();
  }

  delete() {
    console.log("sende Delete-Befehl an server...");
    this.service.delete(2).subscribe();
  }

  
}
