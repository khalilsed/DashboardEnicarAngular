import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GestionNotesService {

  constructor(private http: HttpClient) { }
  public updateNote(note:any) {
      this.http.put("http://localhost:8080/enicar/gestionNotes/updateNote",note)
  }
  public getAllNotes() {
      return this.http.get("http://localhost:8080/enicar/gestionNotes/getAllNotes");
  }
  public removeNote(id:any) {
      this.http.delete("http://localhost:8080/enicar/gestionNotes/removeNote/"+id);

  }
  public addNote(note:any,etud:any) {
    return this.http.post("http://localhost:8080/enicar/gestionNotes/addNote/"+etud,note);
  }}
