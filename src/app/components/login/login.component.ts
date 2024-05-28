import { Component, EventEmitter, Output, inject } from "@angular/core";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  email = "advait@gmail.com";
  password = "advait@123";
  @Output() isLogin = new EventEmitter<boolean>();
  cred: any = {
    email: "",
    pass: "",
  };

  route = inject(Router);
  login() {
    if (this.cred.email === "") {
      Swal.fire({
        position: "top",
        icon: "error",
        title: "Email Required",
        showConfirmButton: false,
        timer: 1500,
      });
    }

    if (this.cred.pass === "") {
      Swal.fire({
        position: "top",
        icon: "error",
        title: "Password Required",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    if (this.cred.pass === this.password && this.cred.email === this.email) {
      Swal.fire({
        position: "top",
        icon: "success",
        title: "Login Successful",
        showConfirmButton: false,
        timer: 1500,
      });
      this.isLogin.emit(true);
      localStorage.setItem("isLogin", JSON.stringify(true));
      this.route.navigate(["/home"]);
    } else {
      Swal.fire({
        position: "top",
        icon: "error",
        title: "Invalid Credentials",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }
}
