import { Component, OnInit } from '@angular/core';
import { PostService } from './../services/post.service';
import { Post } from './post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  posts: Post[];

  constructor(private service: PostService) { }

  ngOnInit() {
    this.service.getAll()
    //.subscribe(posts => this.posts = posts)
    console.log("reveived posts " + this.posts[0])
  }
  
}
