import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ResumeService } from "src/app/services/resume.service";
import Swal from "sweetalert2";
@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"],
})
export class SearchComponent implements OnInit {
  skills: any = ["mongo db", "angular", "javascript"];
  isSearched: boolean = false;
  loadingData: boolean = false;
  searchedData: any;
  experienceFilter: any = "0";
  resumes: any = [];

  constructor(
    private resumeService: ResumeService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    // this.search();
  }

  search() {
    if (this.searchedData) {
      this.isSearched = true;
      this.loadingData = true;
      const data = {
        designation: this.searchedData,
        experience: +this.experienceFilter,
      };
      this.resumeService.searchResumes(data).subscribe((res) => {
        if (res.code === 0) {
          this.resumes = res.result.map((v: any) => {
            const randomImageNumber = this.getRandomNumber();
            const imagePath = `../../../assets/${randomImageNumber}.png`;
            return { ...v, imagePath };
          });
          this.loadingData = false;
        }
      });
    } else {
      Swal.fire({
        position: "top",
        icon: "error",
        title: "Search field can't be empty!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }
  refresh() {
    this.isSearched = false;
    this.resumes = [];
    this.searchedData = "";
  }

  async openFilterModal() {
    const result = await Swal.fire({
      title: "Minimum Experince Required ?",
      input: "range",
      inputLabel: "Years",
      inputAttributes: {
        min: "0",
        max: "15",
        step: "1",
      },
      inputValue: 0,
      showCancelButton: true,
      confirmButtonText: "Apply",
      cancelButtonText: "Cancel",
    });
    if (result.isConfirmed) {
      this.experienceFilter = result.value;
    } else {
      if (!this.experienceFilter) {
        this.experienceFilter = "0";
      }
    }
  }

  getRandomNumber() {
    return Math.floor(Math.random() * 8) + 1;
  }

  getFullResumePath(relativePath: string): string {
    const basePath = "http://localhost:3000";
    return `${basePath}/${relativePath}`;
  }

  openContact(email: any, phone: any) {
    Swal.fire({
      position: "center",
      title: `Contact Info : \n\n Email: ${email}\n\nPhone: ${phone}`,
      showConfirmButton: true,
      confirmButtonText: "Close",
    });
  }
}
