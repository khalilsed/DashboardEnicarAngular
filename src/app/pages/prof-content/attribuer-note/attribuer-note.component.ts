import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GestionEnseignantService } from 'src/app/services/gestion-enseignant.service';
import { GestionEtudiantEtrangerService } from 'src/app/services/gestion-etudiant-etranger.service';
import { GestionEtudiantLocalService } from 'src/app/services/gestion-etudiant-local.service';
import { GestionGroupesService } from 'src/app/services/gestion-groupes.service';
import { GestionNotesService } from 'src/app/services/gestion-notes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-attribuer-note',
  templateUrl: './attribuer-note.component.html',
  styleUrls: ['./attribuer-note.component.scss']
})
export class AttribuerNoteComponent implements OnInit {
  name: any;
  
  public groupes:any;
  public etudiants:any=[];
  public matieres:any=[];
  userId:any;
  et:any;
  public show: boolean = true;
  groupeSelected:any;
  test1:any;
  test2:any;
  test:any;
  i:any;
  j:any;
  gp:any;
  matiere:any;

  constructor(private gestionEnseignantService:GestionEnseignantService,private gestionNotesService:GestionNotesService,private gestionGroupesService:GestionGroupesService,private gestionEtudiantLocalService:GestionEtudiantLocalService,private gestionEtudiantEtrangerService:GestionEtudiantEtrangerService) {
    this.name = localStorage.getItem('userNom');
    this.userId = localStorage.getItem('userId');
   
  }
  async onGroupeSelected(value){
    
    this.etudiants=[];
    this.matieres=[];
      this.groupeSelected=value;
      this.gestionEtudiantLocalService.getAllUsers().subscribe(data=> {
         this.test=data;
         for(this.i=0;this.i<this.test.length;(this.i)++){
            if(this.test[this.i].grp.id==value){
              this.etudiants.push(this.test[this.i]);
            }
         }  
      })
      
      this.gestionEtudiantEtrangerService.getAllUsers().subscribe(data=> {
        this.test=data;
        for(this.i=0;this.i<this.test.length;(this.i)++){
          if(this.test[this.i].grp.id==value){
            this.etudiants.push(this.test[this.i]);
          }
        }  
     })
      this.gestionGroupesService.getGroupe(value).subscribe(data=>{
        this.test1=data;
        console.log(this.test1["matieres"]);
        this.gestionEnseignantService.getUser(this.userId).subscribe(res=>{
        this.test2=data;
        console.log(this.test2["matieres"]);
          for(this.i=0;this.i<this.test1["matieres"].length;(this.i)++){
            for(this.j=0;this.j<this.test2["matieres"].length;(this.j)++){
              if(this.test1["matieres"][this.i].id==this.test2["matieres"][this.j].id ){
                console.log(this.test1["matieres"][this.i]);
                this.matieres.push(this.test1["matieres"][this.i]);
              }
            }  
          }  
          console.log(this.matieres);

        })
        
         })

  }
  async ngOnInit(){
    await this.gestionEnseignantService.getUser(this.userId).toPromise().then(data=>{
      this.groupes=data['groupes'];
        })
      
      

  }
  attribuerNoteForm = new FormGroup({

    groupe: new FormControl('', Validators.required),
    matiere: new FormControl('', Validators.required),
    etudiant: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    vnote:new FormControl('', [Validators.required,Validators.min(0),Validators.max(20)])
    

  })
  get Groupe(){
    return this.attribuerNoteForm.get('groupe');
  }
  get Matiere(){
    return this.attribuerNoteForm.get('matiere');
  }
  get Etudiant(){
    return this.attribuerNoteForm.get('etudiant');
  }
  get Type(){
    return this.attribuerNoteForm.get('type');
  }
  get Vnote(){
    return this.attribuerNoteForm.get('vnote');
  }
  attribuerNote(){
    let note={
      "mat":{"id":this.attribuerNoteForm.get('matiere').value},
      "vnote":this.attribuerNoteForm.get('vnote').value,
      "type":this.attribuerNoteForm.get('type').value
      
    }
    console.log(note);
    let resp = this.gestionNotesService.addNote(note,this.attribuerNoteForm.get('etudiant').value).subscribe(data=>{
     
  }) 
  }



  successSwal(){
    
    Swal.fire({
      icon: 'success',
      title: 'la note est attribuée avec succés',
      text: ''
    }).then(function () {
      window.location.reload();
    })
  }

  }
