import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import {PostModule} from './post.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  loadedPosts: PostModule[] = [];

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: PostModule){
    // Send HTTP request
    this.http
      .post<{ name: string }>(
        'https://ng-complete-guide-9309e.firebaseio.com/posts.json',
        postData
      )
      .subscribe(responseData => {
        console.log(responseData);
      });
  }

  onFetchPosts(){
    this.fetchPosts();
  }

  onClearPosts(){}

  private fetchPosts(){
    this.http
      .get<{ [key: string]: PostModule }>('https://ng-complete-guide-9309e.firebaseio.com/posts.json')
      .pipe(map(responseData => {
        const postsArray: PostModule[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            postsArray
              .push({ ...responseData[key], id: key });
          }
        }
        return postsArray;
        })
      )
      .subscribe(posts => {
        this.loadedPosts = posts;
      });
  }

}
