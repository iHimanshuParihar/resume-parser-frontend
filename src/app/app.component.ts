import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    const value = localStorage.getItem("isLogin");
    if (value) this.loggedIn = JSON.parse(value);
  }

  title = "resume-parser";
  loggedIn: boolean = false;

  isLogin(event: any) {
    this.loggedIn = event;
  }
}
