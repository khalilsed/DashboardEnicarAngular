import { Component, OnInit } from '@angular/core';
import { GestionEtudiantEtrangerService } from 'src/app/services/gestion-etudiant-etranger.service';
import { GestionEtudiantLocalService } from 'src/app/services/gestion-etudiant-local.service';
import { GestionResultatsService } from 'src/app/services/gestion-resultats.service';

@Component({
  selector: 'app-consulter-notes',
  templateUrl: './consulter-notes.component.html',
  styleUrls: ['./consulter-notes.component.scss']
})
export class ConsulterNotesComponent implements OnInit {
  pageItems: any;
  startIndex = 0;
  taille: any;
  currentItem: any;
  endIndex = 5;
  closeResult: string;
  userId: any;
  public focus;
  username: any;
  notes: any = [];
  matieres: any = [];
  moys: any = [];
  constructor(private gestionEtudiantLocalService: GestionEtudiantLocalService, private gestionResutatsService: GestionResultatsService, private gestionEtudiantEtrangerService: GestionEtudiantEtrangerService) {
    this.username = localStorage.getItem('userName');
  }

  async ngOnInit() {
    let i = 0;
    let j = 0;
    let k = 0;
    let test = false;
    if (localStorage.getItem("userNat") == "etranger") {
      await this.gestionEtudiantEtrangerService.getUser(this.username).toPromise().then(data => {
        this.notes = data['notes'];
        let matiere =
        {
          "matiere": this.notes[0].mat.nom,
          "notes": [],
          "coef": this.notes[0].mat.coef,
          "moy": "",

        }
        this.matieres.push(matiere);
        for (k = 0; k < this.notes.length; k++) {
          for (j = 0; j < this.matieres.length; j++) {
            if (this.notes[k].mat.nom == this.matieres[j].matiere) {
              test = true;
            }
          }
          if (!test) {
            let matiere =
            {
              "matiere": this.notes[k].mat.nom,
              "coef": this.notes[k].mat.coef,
              "moy": "",
              "notes": []
            }
            this.matieres.push(matiere);
          }
          test=false;
        }
        for (i = 0; i < this.notes.length; i++) {
          for (j = 0; j < this.matieres.length; j++) {
            if (this.notes[i].mat.nom == this.matieres[j].matiere) {
              let note = {
                "vnote": this.notes[i].vnote,
                "type": this.notes[i].type
              }
              if (this.notes[i].type == "cc") {
                let n;
                let pos=this.matieres[j].notes.find((n)=>n.type=="tp");
                if(pos==undefined){
                  pos=0;
                }
                this.matieres[j].notes.splice(pos, 0, note);
              }
              if (this.notes[i].type == "tp") {
                let pos=this.matieres[j].notes.find((n)=>n.type=="examen");
                
                if(pos==undefined){
                  pos=1;
                }
                console.log(pos);
                this.matieres[j].notes.splice(pos, 0, note);
              }
              if (this.notes[i].type == "examen") {
                this.matieres[j].notes.splice(2, 0, note);
              }

            }
          }
        }
      });
    }
    if (localStorage.getItem("userNat") == "local") {
      await this.gestionEtudiantLocalService.getUser(this.username).toPromise().then(data => {
        this.notes = data['notes'];
        let matiere =
        {
          "matiere": this.notes[0].mat.nom,
          "notes": [],
          "coef": this.notes[0].mat.coef,
          "moy": "",

        }
        this.matieres.push(matiere);
        for (k = 1; k < this.notes.length; k++) {
          for (j = 0; j < this.matieres.length; j++) {
            if (this.notes[k].mat.nom == this.matieres[j].matiere) {
              test = true;
            }
          }
          if (!test) {
            let matiere =
            {
              "matiere": this.notes[k].mat.nom,
              "coef": this.notes[k].mat.coef,
              "moy": "",
              "notes": []
            }
            this.matieres.push(matiere);
          }
        }
        console.log(this.matieres);
        for (i = 0; i < this.notes.length; i++) {
          for (j = 0; j < this.matieres.length; j++) {
            if (this.notes[i].mat.nom == this.matieres[j].matiere) {
              let note = {
                "vnote": this.notes[i].vnote,
                "type": this.notes[i].type
              }
              if (this.notes[i].type == "cc") {
                this.matieres[j].notes.splice(0, 0, note);
              }
              if (this.notes[i].type == "tp") {
                this.matieres[j].notes.splice(1, 0, note);
              }
              if (this.notes[i].type == "examen") {
                this.matieres[j].notes.splice(2, 0, note);
              }

            }
          }
        }
      });
    }
    for (i = 0; i < this.matieres.length; i++) {
      if (!this.verifCc(this.matieres[i].notes)) {
        let note = {
          "vnote": "_",
          "type": "cc"
        }
        this.matieres[i].notes.splice(0, 0, note);
      }
      if (!this.verifTp(this.matieres[i].notes)) {
        let note = {
          "vnote": "_",
          "type": "tp"
        }
        this.matieres[i].notes.splice(1, 0, note);
      }
      if (!this.verifExamen(this.matieres[i].notes)) {
        let note = {
          "vnote": "_",
          "type": "examen"
        }
        this.matieres[i].notes.splice(2, 0, note);
      }
    }
    for (j = 0; j < this.matieres.length; j++) {
      this.matieres[j].moy = this.calculMoy(this.matieres[j]);
    }
    if(this.matieres.length<=5){
      this.pageItems= new Array(0);
    }
    else{
    if (this.matieres.length % 5 == 0) {
      this.pageItems = new Array(Math.trunc(this.matieres.length / 5));
      
    }
    else { this.pageItems = new Array(Math.trunc(this.matieres.length / 5) + 1) }}
    this.currentItem = 0;
    this.taille = this.pageItems.length;
    this.gestionResutatsService.moyMatieres = this.matieres;
  }
  updateIndex(y) {
    this.currentItem = y;
    this.startIndex = y * 5;
    this.endIndex = this.startIndex + 5;


  }
  verifCc(v: any) {
    let i = 0;
    for (i; i < v.length; i++) {
      if (v[i].type == "cc") {
        return true;
      }
    }
    return false;
  }
  verifTp(v: any) {
    let i = 0;
    for (i; i < v.length; i++) {
      if (v[i].type == "tp") {
        return true;
      }
    }
    return false;
  }
  verifExamen(v: any) {
    let i = 0;
    for (i; i < v.length; i++) {
      if (v[i].type == "examen") {
        return true;
      }
    }
    return false;
  }
  
  calculMoy(m: any) {
    let i = 0;
    let moy = 0
    let coef = 0;
    let n;
    for (i; i < m.notes.length; i++) {
      if (m.notes[i].vnote == "_") {
        n = 0;
      } else {
        n = m.notes[i].vnote;
      }
      if (m.notes[i].type == "tp") {
        coef = 0.2;
      } else if (m.notes[i].type == "cc") {
        coef = 0.3;
      } else {
        coef = 0.5;
      }


      moy += (n * coef);

    }

    return moy;
  }
  

}
