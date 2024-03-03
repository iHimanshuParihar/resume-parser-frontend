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
  loadingData: boolean = false;
  isUpload: boolean = false;
  fileName: any;
  resumes: any = [];
  constructor(private resumeService: ResumeService) {}

  ngOnInit(): void {
    this.getAllResumes();
  }

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
      this.loadingData = true;
      this.resumeService
        .uploadResume(this.selectedFile)
        .subscribe((res: any) => {
          if (res.code === 0) {
            this.loadingData = false;
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Resume Uploaded and Analyzed Successfully",
              showConfirmButton: false,
              timer: 1500,
            });
          }
          this.clearInput();
          this.getAllResumes();
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
        this.resumes = res.result.map((v: any) => {
          const randomImageNumber = this.getRandomNumber();
          const imagePath = `../../../assets/${randomImageNumber}.png`;
          return { ...v, imagePath };
        });
      }
    });
  }

  getFullResumePath(relativePath: string): string {
    const basePath = "https://resume-parser-uzs7.onrender.com";
    return `${basePath}/${relativePath}`;
  }
  getRandomNumber() {
    return Math.floor(Math.random() * 8) + 1;
  }

  deleteResume(resumeId: any, path: any) {
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        const data = {
          resumeId: resumeId,
          filePath: path,
        };
        console.log(data);
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
          this.getAllResumes();
        });
      }
    });
  }
}
