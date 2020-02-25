import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { PostService } from '../post.service';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-post-dashboard',
  templateUrl: './post-dashboard.component.html',
  styleUrls: ['./post-dashboard.component.css']
})
export class PostDashboardComponent implements OnInit {

  title: string
  image: string
  content: string
  authState: any = null

  buttonText: string = "Create Post"

  uploadPercent: Observable<number>
  downloadURL: Observable<string>

  constructor(private auth: AuthService, private postService: PostService, private storage: AngularFireStorage) { }

  ngOnInit() {
  }
  createPost(){
    const data = {
      author: this.auth.authState.displayName || this.auth.authState.email,
      authorId: this.auth.currentUserId,
      content: this.content,
      // id: this.auth.authState,
      image: this.image,
      published: new Date(),
      title: this.title
    };

    this.postService.create(data);
    this.title = "";
    this.content = "";
    this.image = "";
    this.buttonText = "Post Created!";
    setTimeout(() => (this.buttonText= "Creat Post"), 2000);
  }

  uploadImage(event){
    const file = event.target.files[0]
    const path = `posts/${file.name}`
    const fileRef = this.storage.ref(path)
    // console.log(event.target.files);
    if(file.type.split('/')[0] !== 'image'){
      return alert('only image files')
    }else {
      const task = this.storage.upload(path, file)
      this.downloadURL = fileRef.getDownloadURL()
      this.uploadPercent = task.percentageChanges()
      console.log('image Uploaded');
      this.downloadURL.subscribe(url => this.image = url)
      
    }
    
  }
}
