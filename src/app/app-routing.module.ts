import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ContactComponent } from "./components/contact/contact.component";
import { SearchComponent } from "./components/search/search.component";
import { UploadComponent } from "./components/upload/upload.component";
import { HomeComponent } from "./components/home/home.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "contact", component: ContactComponent },
  { path: "upload", component: UploadComponent },
  { path: "search", component: SearchComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
