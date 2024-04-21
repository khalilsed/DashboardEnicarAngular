import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GestionMatieresService } from 'src/app/services/gestion-matieres.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-matieres',
  templateUrl: './gestion-matieres.component.html',
  styleUrls: ['./gestion-matieres.component.scss']
})
export class GestionMatieresComponent implements OnInit {
  closeResult: string;
  pageItems: any;
  startIndex = 0;
  taille: any;
  endIndex = 5;
  currentItem: any;
  public focus;
  matieres:any;
  matiereEn:any;
  constructor(private modalService: NgbModal,private gestionMatieresService:GestionMatieresService) { }

  async ngOnInit(){
    await this.gestionMatieresService.getAllMatieres().toPromise().then(results=>{
      this.matieres=results;
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
    })
  }
  openAjout(content, type, modalDimension) {
  
    if (modalDimension === 'lg' && type === 'modal_mini') {
      this.modalService.open(content, { backdrop: false, windowClass: 'modal-mini', size: 'lg', centered: true },).result.then((result) => {
        this.closeResult = 'Closed with: $result';

      }, (reason) => {
        this.closeResult = 'Dismissed $this.getDismissReason(reason)';
      });
    } else if (modalDimension === '' && type === 'Notification') {
      this.modalService.open(content, { backdrop: false, windowClass: 'modal-danger', centered: true }).result.then((result) => {
        this.closeResult = 'Closed with: $result';
      }, (reason) => {
        this.closeResult = 'Dismissed $this.getDismissReason(reason)';
      });
    } else {
      this.modalService.open(content, { backdrop: false, centered: true }).result.then((result) => {
        this.closeResult = 'Closed with: $result';
      }, (reason) => {
        this.closeResult = 'Dismissed $this.getDismissReason(reason)';
      });
    }

  }
  openEns(content, type, modalDimension,matiere) {
    this.matiereEn=matiere;
    if (modalDimension === 'lg' && type === 'modal_mini') {
      this.modalService.open(content, { backdrop: false, windowClass: 'modal-mini', size: 'lg', centered: true },).result.then((result) => {
        this.closeResult = 'Closed with: $result';

      }, (reason) => {
        this.closeResult = 'Dismissed $this.getDismissReason(reason)';
      });
    } else if (modalDimension === '' && type === 'Notification') {
      this.modalService.open(content, { backdrop: false, windowClass: 'modal-danger', centered: true }).result.then((result) => {
        this.closeResult = 'Closed with: $result';
      }, (reason) => {
        this.closeResult = 'Dismissed $this.getDismissReason(reason)';
      });
    } else {
      this.modalService.open(content, { backdrop: false, centered: true }).result.then((result) => {
        this.closeResult = 'Closed with: $result';
      }, (reason) => {
        this.closeResult = 'Dismissed $this.getDismissReason(reason)';
      });
    }

  }

  openAjoutEnseig(content, type, modalDimension,matiere) {
    this.matiereEn=matiere;
    console.log(this.matieres);
    if (modalDimension === 'lg' && type === 'modal_mini') {
      this.modalService.open(content, { backdrop: false, windowClass: 'modal-mini', size: 'lg', centered: true },).result.then((result) => {
        this.closeResult = 'Closed with: $result';
      }, (reason) => {
        this.closeResult = 'Dismissed $this.getDismissReason(reason)';
      });
    } else if (modalDimension === '' && type === 'Notification') {
      this.modalService.open(content, { backdrop: false, windowClass: 'modal-danger', centered: true }).result.then((result) => {
        this.closeResult = 'Closed with: $result';
      }, (reason) => {
        this.closeResult = 'Dismissed $this.getDismissReason(reason)';
      });
    } else {
      this.modalService.open(content, { backdrop: false, centered: true }).result.then((result) => {
        this.closeResult = 'Closed with: $result';
      }, (reason) => {
        this.closeResult = 'Dismissed $this.getDismissReason(reason)';
      });
    }

  }

  updateIndex(y) {
    this.currentItem = y;
    this.startIndex = y * 5;
    this.endIndex = this.startIndex + 5;
  }
  addFormMatiere = new FormGroup({
    nom: new FormControl('', Validators.required),
    coef: new FormControl('', [Validators.required])
  })
  get Nom() {
    return this.addFormMatiere.get('nom');
  }
  get Coef() {
    return this.addFormMatiere.get('coef');
  }
  add_matiere() {
    let m={
      "nom":this.addFormMatiere.get('nom').value,
      "coef":this.addFormMatiere.get('coef').value
    }   
    let resp=this.gestionMatieresService.addMatiere(m).subscribe(()=>{
      this.successSwalAjout();
    });
    
  }
  successSwalAjout() {
    Swal.fire(
      'Cette matiére est ajouté!',
      '',
      'success'
    ).then(function () {
      window.location.reload();
    })

  }
  addFormEnsToMat = new FormGroup({
    nomMat: new FormControl('', Validators.required)
  })
  get NomEns(){
    return this.addFormEnsToMat.get('nomEns');
  }
  add_EnsToMat(){
    console.log(this.matiereEn.id)
    let resp=this.gestionMatieresService.addEnsToMatiere(this.addFormEnsToMat.get("nomEns").value,this.matiereEn.id).subscribe();
    
  }

}
