/*import { Component } from "@angular/core";

import { users } from "../users";
import { posts } from "../posts";
import { comments } from "../comments";

@Component({
  selector: "app-user-list-service",
  templateUrl: "./user-list-service.component.html",
  styleUrls: ["./user-list-service.component.css"]
})
export class UserListServiceComponent {
  users = users;
  filteredPosts: any;
  filteredComments: any;

  

  showUserPosts(userId: number) {
    this.filteredPosts = posts.filter(p => userId == p.userId);
  }

  showPostComments(postId: number) {
    this.filteredComments = comments.filter(c => postId == c.id);
  }
}*/

//from here

import { Component, OnInit } from "@angular/core";

import { Posts } from "../posts";
import { Comments } from "../comments";
import { Service } from "../service";
import { Users } from "../users";

@Component({
  selector: "app-user-list-service",
  templateUrl: "./user-list-service.component.html",
  styleUrls: ["./user-list-service.component.css"]
})
export class UserListServiceComponent implements OnInit {
  users: Users[];
  firstName: string;
  posts: Posts[];
  comments: Comments[];
  filteredComments: any;
  showComments: boolean[];
  show = 3;
  // TODO - Add loader to show server behaviour.
  private loading: boolean = false;
  constructor(private service: Service) {}

  ngOnInit() {
    this.service.getUsers().subscribe(data => {
      this.users = data;
      this.loading = false;
    });
  }
  /*share() {
    window.alert("The service has been shared!");
  }*/

  /*showUserPosts(id: number) {
    this.service.getPosts(id).subscribe(data => {
      this.posts = data;
      this.loading = false;
      
    });
    this.filteredComments = null;
  }*/

  showUserPosts(id: number) {
    this.service.getPosts(id).subscribe(data => {
      this.posts = data;
      this.loading = false;
      this.showComments = this.posts.map(p => false);
    });

    this.filteredComments = null;
    console.log(this.showComments);
  }

  /* showPostComments(postId: number) {
    this.service.getComments(postId).subscribe(data => {
      this.comments = data;
    });
  }*/

  showPostComments(postId: number, index: number) {
    this.service.getComments(postId).subscribe(data => {
      this.comments = data;
    });
    if( this.showComments[index] == true)
    this.showComments[index] = false;
    else
    this.showComments[index] = true;
  }

  showAllPosts() {}
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
