import { Component, OnInit } from "@angular/core";
import { ResumeService } from "src/app/services/resume.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-upload",
  templateUrl: "./upload.component.html",
  styleUrls: ["./upload.component.css"],
})
export class UploadComponent implements OnInit {
  selectedFile: any;
  isDragging: boolean = false;
  isUpload: boolean = false;
  fileName: any;
  resumes: any = [];
  constructor(private resumeService: ResumeService) {}

  ngOnInit(): void {}

  handleFileChange(event: any) {
    const files = event.target.files;
    if (files.length === 1) {
      this.selectedFile = files[0];
    } else {
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

  uploadFile() {
    if (this.selectedFile) {
      console.log(this.selectedFile);
      this.resumeService
        .uploadResume(this.selectedFile)
        .subscribe((res: any) => {
          if (res.code === 0) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Resume Uploaded and Analyzed Successfully",
              showConfirmButton: false,
              timer: 1500,
            });
          }
          this.clearInput();
        });
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Please select a file before uploading.",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }

  clearInput() {
    const fileInput = document.getElementById("customFile") as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  }

  getAllResumes() {
    this.resumeService.getAllResumes().subscribe((res: any) => {
      if (res.code === 0) {
        this.resumes = res.result.map((resume: any) => {
          const randomImageNumber = this.getRandomNumber();
          const imagePath = `../../../assets/${randomImageNumber}.png`;
          return { ...resume, imagePath };
        });
      }
    });
  }

  getRandomNumber() {
    return Math.floor(Math.random() * 8) + 1;
  }

  deleteResume(resumeId: any, path: any) {
    const data = {
      resumeId: resumeId,
      path: path,
    };
    this.resumeService.deleteResume(data).subscribe((res) => {
      if (res.code === 0) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Resume Deleted Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Something went wrong! please try again.",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  }
}
