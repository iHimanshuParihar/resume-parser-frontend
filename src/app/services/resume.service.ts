import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ResumeService {
  constructor(private http: HttpClient) {}
  apiUrl = "https://resume-parser-uzs7.onrender.com";
  // apiUrl = "http://localhost:3000";

  uploadResume(file: File): Observable<any> {
    const formData = new FormData();
    formData.append("file", file);

    return this.http.post(`${this.apiUrl}/upload`, formData);
  }

  getAllResumes(): Observable<any> {
    return this.http.get(`${this.apiUrl}/resume/all`);
  }

  getResumeById(resumeId: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/resume/${resumeId}`);
  }

  searchResumes(query: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/search`, query);
  }

  deleteResume(data: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete`, { body: data });
  }

  sendEmail(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/contact`, data);
  }
}
