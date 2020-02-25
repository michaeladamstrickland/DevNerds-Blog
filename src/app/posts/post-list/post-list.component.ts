import { Component, OnInit } from '@angular/core';
import { Post } from "../post";
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from "@angular/router";
import { PostService } from '../post.service';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts: Observable<Post[]>;
  editing: boolean = false;
  post: Post;

  constructor(private postService: PostService, 
    public auth: AuthService, 
    //  private router: Router,
     private route: ActivatedRoute
     ) { }

  ngOnInit() {
    this.posts = this.postService.getPosts()
    console.log(this + "this is from the list component");
    
  }
  
  getPost(){
    const id = this.route.snapshot.paramMap.get('id');
    return this.postService.getPostData(id).subscribe(data => this.post = data);
  }

  updatePost() {
    const formData = {
      title: this.post.title,
      content: this.post.content,
    }
    const id = this.route.snapshot.paramMap.get('id');
    this.postService.update(id, formData)
    this.editing = false;
  }

  delete(id: string) {
    this.postService.delete(id)
  }
}
