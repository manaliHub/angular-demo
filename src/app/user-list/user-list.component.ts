import { Component } from "@angular/core";

import { users } from "../users";
import { posts } from "../posts";
import { comments } from "../comments";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.css"]
})
export class UserListComponent {
  users = users;
  filteredPosts: any;
  filteredComments: any;

  /*share() {
    window.alert("The product has been shared!");
  }*/

  showUserPosts(userId: number) {
    this.filteredPosts = posts.filter(p => userId == p.userId);
  }

  showPostComments(postId: number) {
    this.filteredComments = comments.filter(c => postId == c.id);
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
