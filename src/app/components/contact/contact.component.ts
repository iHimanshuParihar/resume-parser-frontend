import { Component, ViewChild, ElementRef } from "@angular/core";
import Swal from "sweetalert2";

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.css"],
})
export class ContactComponent {
  @ViewChild("nameRef") nameRef!: ElementRef;
  @ViewChild("emailRef") emailRef!: ElementRef;
  @ViewChild("queryRef") queryRef!: ElementRef;

  send() {
    if (
      this.nameRef.nativeElement.innerHTML == "" ||
      this.emailRef.nativeElement.innerHTML == "" ||
      this.queryRef.nativeElement.innerHTML == ""
    ) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Please fill all the fields",
        text: "before sending your message.",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your letter received!",
        text: "We'll contact you soon.",
        showConfirmButton: false,
        timer: 1500,
      });

      this.nameRef.nativeElement.innerHTML = "";
      this.emailRef.nativeElement.innerHTML = "";
      this.queryRef.nativeElement.innerHTML = "";
    }
  }
}
