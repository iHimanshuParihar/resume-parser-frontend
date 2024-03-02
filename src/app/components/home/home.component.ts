import { Component, HostListener, OnInit } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  //Below are the varaible decalred that were used in the below functions.
  isNavActive = false;
  isMenuActive: boolean = false;
  notHome: boolean = false;
  selectedSection: string = "Home";

  //ngOnnit is used if we want to call any function when this page reloads or is rendered for first time.
  ngOnInit() {
    const notHomeString = sessionStorage.getItem("notHome");
    if (notHomeString) {
      this.notHome = JSON.parse(notHomeString);
    }
    const selectedTab = sessionStorage.getItem("selectedTab");
    if (selectedTab) {
      this.selectedSection = selectedTab;
    }
    console.log(this.selectedSection);
  }

  constructor() {} //used for importing services / intializations etc.

  @HostListener("window:scroll", ["$event"]) //this is the hostlistner used to observe the scroll and cath that so we can detect the correct scroll.

  //below function is used for the css part when scrolled the color changes.So the scroll length is mentionin below condtions
  onScroll() {
    if (window.scrollY > 150) {
      this.isNavActive = true;
      if (!this.notHome) {
        sessionStorage.setItem("selectedTab", "About");
        this.selectedSection = "About";
      }
    } else {
      this.isNavActive = false;
      if (!this.notHome) {
        sessionStorage.setItem("selectedTab", "Home");
        this.selectedSection = "Home";
      }
    }
  }

  //Below function is used to toggle hamburger menu when screen resolution is less than 780px
  toggleMenu() {
    this.isMenuActive = !this.isMenuActive;
  }

  //Below function is used for  showing which nav item is active
  selectSection(section: string) {
    this.selectedSection = section;
    if (section === "Home" || section === "About") {
      this.notHome = false;
    } else {
      this.notHome = true;
    }
    sessionStorage.setItem("notHome", JSON.stringify(this.notHome));
    sessionStorage.setItem("selectedTab", section);
    this.isMenuActive = false;
  }

  // The below 2 function are for closing the hamburger menu which was opened when screen resolution was leas than 780px and was not closed
  @HostListener("window:resize", ["$event"])
  onResize(event: Event): void {
    this.updateMenuState();
  }

  updateMenuState(): void {
    const windowWidth = window.innerWidth;
    if (windowWidth <= 780) {
      this.isMenuActive = false;
    }
  }
}
