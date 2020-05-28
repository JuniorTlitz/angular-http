import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  loadedPosts = [];

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: {title: string; content: string}){
    // Send HTTP request
    this.http
      .post(
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
      .get('https://ng-complete-guide-9309e.firebaseio.com/posts.json')
      .pipe(map(responseData => {
        const postsArray = [];
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
        console.log(posts);
      });
  }

}
