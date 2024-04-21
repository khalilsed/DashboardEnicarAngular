import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GestionEtudiantLocalService {

  constructor(private http: HttpClient) { }
  public updateUser(user: any) {
    return this.http.put("http://localhost:8080/enicar/gestionNotes/updateEtudiantLocal", user)
  }
  public getAllUsers() {
    return this.http.get("http://localhost:8080/enicar/gestionNotes/getAllEtudiantLocals");
  }
  public removeUser(id: any) {
    return this.http.delete("http://localhost:8080/enicar/gestionNotes/removeEtudiantLocal/" + id);
  }
  public addUser(user: any,idGroupe:any) {
    return this.http.post("http://localhost:8080/enicar/gestionNotes/addEtudiantLocal/"+idGroupe, user);
  }
  public getUserLogged(username: any, password: any) {
    return this.http.get("http://localhost:8080/enicar/gestionNotes/getEtudiantLocalLogged?username=" + username + "&password=" + password);
  }
  public getUser(username: any) {
    return this.http.get("http://localhost:8080/enicar/gestionNotes/getEtudiantLocal?username=" + username);
  }
}