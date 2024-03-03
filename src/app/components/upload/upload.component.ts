import { Component, OnInit } from "@angular/core";
import { ResumeService } from "src/app/services/resume.service"; // Importing ResumeService for uploading and deleting resumes
import Swal from "sweetalert2"; // Importing SweetAlert2 for displaying alerts

@Component({
  selector: "app-upload",
  templateUrl: "./upload.component.html",
  styleUrls: ["./upload.component.css"],
})
export class UploadComponent implements OnInit {
  selectedFile: any; // Holds the selected file
  isDragging: boolean = false; // Flag to indicate if dragging is in progress
  loadingData: boolean = false; // Flag to indicate if data is being loaded
  isUpload: boolean = false; // Flag to indicate if upload is in progress
  fileName: any; // Holds the name of the selected file
  resumes: any = []; // Array to hold uploaded resumes

  constructor(private resumeService: ResumeService) {}

  ngOnInit(): void {
    this.getAllResumes(); // Fetching all resumes on component initialization
  }

  // Function to handle file selection
  handleFileChange(event: any) {
    const files = event.target.files;
    if (files.length === 1) {
      this.selectedFile = files[0];
    } else {
      // Display error message if more than one file is selected
      Swal.fire({
        position: "top",
        icon: "error",
        title: "Please select one file.",
        showConfirmButton: false,
        timer: 1500,
      });
      this.clearInput();
    }
  }

  // Function to upload file
  uploadFile() {
    if (this.selectedFile) {
      this.loadingData = true;
      this.resumeService
        .uploadResume(this.selectedFile)
        .subscribe((res: any) => {
          if (res.code === 0) {
            this.loadingData = false;
            // Display success message after successful upload
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Resume Uploaded and Analyzed Successfully",
              showConfirmButton: false,
              timer: 1500,
            });
          }
          this.clearInput();
          this.getAllResumes(); // Refreshing uploaded resumes list
        });
    } else {
      // Display error message if no file is selected for upload
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Please select a file before uploading.",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }

  // Function to clear input field after file selection
  clearInput() {
    const fileInput = document.getElementById("customFile") as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  }

  // Function to fetch all uploaded resumes
  getAllResumes() {
    this.resumeService.getAllResumes().subscribe((res: any) => {
      if (res.code === 0) {
        this.resumes = res.result.map((v: any) => {
          const randomImageNumber = this.getRandomNumber();
          const imagePath = `../../../assets/${randomImageNumber}.png`;
          return { ...v, imagePath };
        });
      }
    });
  }

  // Function to construct full resume path
  getFullResumePath(relativePath: string): string {
    const basePath = "https://resume-parser-uzs7.onrender.com";
    return `${basePath}/${relativePath}`;
  }

  // Function to generate a random number for image selection
  getRandomNumber() {
    return Math.floor(Math.random() * 8) + 1;
  }

  // Function to delete a resume
  deleteResume(resumeId: any, path: any) {
    // Confirming deletion with a modal
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        // If deletion is confirmed, call deleteResume method of ResumeService
        const data = {
          resumeId: resumeId,
          filePath: path,
        };
        this.resumeService.deleteResume(data).subscribe((res) => {
          if (res.code === 0) {
            // Display success message after successful deletion
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Resume Deleted Successfully",
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            // Display error message if deletion fails
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Something went wrong! please try again.",
              showConfirmButton: false,
              timer: 1500,
            });
          }
          this.getAllResumes(); // Refreshing uploaded resumes list
        });
      }
    });
  }
}
