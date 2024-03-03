import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ResumeService {
  constructor(private http: HttpClient) {}

  apiUrl = "https://resume-parser-uzs7.onrender.com"; // Base URL for API endpoints
  // apiUrl = "http://localhost:3000"; // Local API URL for development

  // Method to upload a resume file
  uploadResume(file: File): Observable<any> {
    const formData = new FormData();
    formData.append("file", file);
    return this.http.post(`${this.apiUrl}/upload`, formData);
  }

  // Method to retrieve all resumes
  getAllResumes(): Observable<any> {
    return this.http.get(`${this.apiUrl}/resume/all`);
  }

  // Method to retrieve a resume by its ID
  getResumeById(resumeId: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/resume/${resumeId}`);
  }

  // Method to search resumes based on a query
  searchResumes(query: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/search`, query);
  }

  // Method to delete a resume
  deleteResume(data: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete`, { body: data });
  }

  // Method to send a contact email
  sendEmail(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/contact`, data);
  }
}
