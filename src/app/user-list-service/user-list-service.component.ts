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
  selectedUser: number;
  postsForUser: String;
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
  showUserPosts(id: number) {
    this.service.getPosts(id).subscribe(data => {
      this.posts = data;
      this.loading = false;
      this.showComments = this.posts.map(p => false);
      this.show = 3;
      this.selectedUser = id;

      //to display user name above all posts
      this.postsForUser = this.users.find(c => c.id == id).name;
    });

    this.filteredComments = null;
    console.log(this.showComments);
  }

  showPostComments(postId: number, index: number) {
    this.service.getComments(postId).subscribe(data => {
      this.comments = data;
    });
    if (this.showComments[index] == true) this.showComments[index] = false;
    else this.showComments[index] = true;
  }

  showUserAllPosts() {
    this.service.getPosts(this.selectedUser).subscribe(data => {
      this.posts = data;
      this.loading = false;
      this.showComments = this.posts.map(p => false);
      this.show = data.length;
    });

    this.filteredComments = null;
    console.log(this.showComments);
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
