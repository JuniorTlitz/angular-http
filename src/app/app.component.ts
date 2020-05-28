import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  loadedPosts = [];

  constructor(private http: HttpClient) {
  }

  ngOnInit() {}

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

  onFetchPosts(){}

  onClearPosts(){}

}
