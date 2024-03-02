import { Component, ViewChild, ElementRef } from "@angular/core";
import { ResumeService } from "src/app/services/resume.service";
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

  constructor(private resumeService: ResumeService) {}

  isSending: boolean = false;
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
      const isValid = this.isValidEmail(this.emailRef.nativeElement.innerHTML);

      if (!isValid) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Invalid Email!",
          text: "Please Enter a valid Email!.",
          showConfirmButton: false,
          timer: 1500,
        });
        this.emailRef.nativeElement.innerHTML == "";
        return;
      }
      this.isSending = true;
      const data = {
        name: this.nameRef.nativeElement.innerHTML,
        email: this.emailRef.nativeElement.innerHTML,
        query: this.queryRef.nativeElement.innerHTML,
      };
      this.resumeService.sendEmail(data).subscribe((res) => {
        if (res.code === 0) {
          this.isSending = false;
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your letter received!",
            text: "We'll contact you soon.",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          this.isSending = false;
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Something Went Wrong!",
            text: "Please try again!.",
            showConfirmButton: false,
            timer: 1500,
          });
        }

        this.nameRef.nativeElement.innerHTML = "";
        this.emailRef.nativeElement.innerHTML = "";
        this.queryRef.nativeElement.innerHTML = "";
      });
    }
  }

  isValidEmail(email: string): boolean {
    const emailPattern: RegExp =
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }
}
