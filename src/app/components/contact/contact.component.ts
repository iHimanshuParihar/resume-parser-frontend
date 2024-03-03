import { Component, ViewChild, ElementRef } from "@angular/core";
import { ResumeService } from "src/app/services/resume.service"; // Importing the ResumeService for sending emails
import Swal from "sweetalert2"; // Importing SweetAlert2 for displaying alerts

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.css"],
})
export class ContactComponent {
  @ViewChild("nameRef") nameRef!: ElementRef; // Reference to the name input field
  @ViewChild("emailRef") emailRef!: ElementRef; // Reference to the email input field
  @ViewChild("queryRef") queryRef!: ElementRef; // Reference to the query input field

  constructor(private resumeService: ResumeService) {} // Injecting ResumeService

  isSending: boolean = false; // Flag to indicate if the email is being sent

  // Function to send the contact email
  send() {
    // Checking if all fields are filled
    if (
      this.nameRef.nativeElement.innerHTML == "" ||
      this.emailRef.nativeElement.innerHTML == "" ||
      this.queryRef.nativeElement.innerHTML == ""
    ) {
      // Displaying an error alert if any field is empty
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Please fill all the fields",
        text: "before sending your message.",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      // Checking if the email is valid
      const isValid = this.isValidEmail(this.emailRef.nativeElement.innerHTML);

      if (!isValid) {
        // Displaying an error alert if the email is invalid
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

      // Setting isSending flag to true to indicate email sending process
      this.isSending = true;

      // Constructing email data
      const data = {
        name: this.nameRef.nativeElement.innerHTML,
        email: this.emailRef.nativeElement.innerHTML,
        query: this.queryRef.nativeElement.innerHTML,
      };

      // Calling the sendEmail method of ResumeService to send the email
      this.resumeService.sendEmail(data).subscribe((res) => {
        // Handling response from the server
        if (res.code === 0) {
          // Displaying success alert if email is sent successfully
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
          // Displaying error alert if there's an issue with sending email
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

        // Clearing input fields after sending email
        this.nameRef.nativeElement.innerHTML = "";
        this.emailRef.nativeElement.innerHTML = "";
        this.queryRef.nativeElement.innerHTML = "";
      });
    }
  }

  // Function to validate email format
  isValidEmail(email: string): boolean {
    const emailPattern: RegExp =
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }
}
