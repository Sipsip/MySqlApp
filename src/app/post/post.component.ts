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
  

}
