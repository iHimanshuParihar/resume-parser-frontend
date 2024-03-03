import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap"; // Importing NgbModal for modal functionality
import { ResumeService } from "src/app/services/resume.service"; // Importing ResumeService for searching resumes
import Swal from "sweetalert2"; // Importing SweetAlert2 for displaying alerts

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"],
})
export class SearchComponent implements OnInit {
  isSearched: boolean = false; // Flag to indicate if search has been performed
  loadingData: boolean = false; // Flag to indicate if data is being loaded
  searchedData: any; // Holds the searched data
  experienceFilter: any = "0"; // Holds the experience filter value
  resumes: any = []; // Array to hold search results

  constructor(
    private resumeService: ResumeService, // Injecting ResumeService
    private modalService: NgbModal // Injecting NgbModal service for opening modal
  ) {}

  ngOnInit() {
    // Initialize component
  }

  // Function to perform search
  search() {
    if (this.searchedData) {
      this.isSearched = true;
      this.loadingData = true;
      const data = {
        designation: this.searchedData,
        experience: +this.experienceFilter,
      };
      // Call searchResumes method of ResumeService to search resumes
      this.resumeService.searchResumes(data).subscribe((res) => {
        if (res.code === 0) {
          // Process search results
          this.resumes = res.result.map((v: any) => {
            const randomImageNumber = this.getRandomNumber();
            const imagePath = `../../../assets/${randomImageNumber}.png`;
            return { ...v, imagePath };
          });
          this.loadingData = false;
        }
      });
    } else {
      // Display error message if search field is empty
      Swal.fire({
        position: "top",
        icon: "error",
        title: "Search field can't be empty!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }

  // Function to clear search results and search field
  refresh() {
    this.isSearched = false;
    this.resumes = [];
    this.searchedData = "";
  }

  // Function to open filter modal for experience
  async openFilterModal() {
    const result = await Swal.fire({
      title: "Minimum Experience Required ?",
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

  // Function to generate a random number for image selection
  getRandomNumber() {
    return Math.floor(Math.random() * 8) + 1;
  }

  // Function to construct full resume path
  getFullResumePath(relativePath: string): string {
    const basePath = "https://resume-parser-uzs7.onrender.com";
    return `${basePath}/${relativePath}`;
  }

  // Function to open contact modal with email and phone details
  openContact(email: any, phone: any) {
    Swal.fire({
      position: "center",
      title: `Contact Info : \n\n Email: ${email}\n\nPhone: ${phone}`,
      showConfirmButton: true,
      confirmButtonText: "Close",
    });
  }
}
