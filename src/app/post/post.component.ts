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

    let epicAny : any = this.epics[0];
    console.log("epics[0].name: " + epicAny.name);
    console.log("epics[0].Name: " + epicAny.Name);
  }

  create() {
    let e : Epic = new Epic(2,"created Epic", "Dieses Epic wurde in post.component erstellt",3);
    this.service.create(e).subscribe();
    console.log("create() in Component aufgerufen");
  }
}
