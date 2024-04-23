import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GestionMatieresService {

  constructor(private http: HttpClient) { }
  public updateMatiere(matiere:any) {
      this.http.put("http://localhost:8080/enicar/gestionNotes/updateMatiere",matiere)
  }
  public getAllMatieres() {
      return this.http.get("http://localhost:8080/enicar/gestionNotes/getAllMatieres");
  }
  public getMatiereBynom(m : any) {
    return this.http.get("http://localhost:8080/enicar/gestionNotes/getMatiere/"+m);
}
  public removeMatiere(id:any) {
      this.http.delete("http://localhost:8080/enicar/gestionNotes/removeMatiere/"+id);

  }
  public addMatiere(matiere:any) {
    return this.http.post("http://localhost:8080/enicar/gestionNotes/addMatiere",matiere);
  }
  public getEnseiMat(id : any){
    return this.http.get("http://localhost:8080/enicar/gestionNotes/getEnseignantByMatiere/"+id);
  }
  public addEnsToMatiere(enseignant:any,idMat:any) {
    return this.http.post("http://localhost:8080/enicar/gestionNotes/addMatiereToEnseignant/"+idMat,enseignant);
  }

}
