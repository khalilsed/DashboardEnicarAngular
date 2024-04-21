import { Component, OnInit } from '@angular/core';
import { GestionEnseignantService } from 'src/app/services/gestion-enseignant.service';
import { GestionEtudiantEtrangerService } from 'src/app/services/gestion-etudiant-etranger.service';
import { GestionEtudiantLocalService } from 'src/app/services/gestion-etudiant-local.service';
import { GestionGroupesService } from 'src/app/services/gestion-groupes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-notes',
  templateUrl: './gestion-notes.component.html',
  styleUrls: ['./gestion-notes.component.scss']
})
export class GestionNotesComponent implements OnInit {
  pageItems: any;
  startIndex = 0;
  taille: any;
  currentItem: any;
  endIndex = 5;
  closeResult: string;
  userId: any;
  groupes: any;
  etudiants: any = [];
  test: any = [];
  i: any;
  j: any;
  k:any;
  matiere: any = {};
  test1: any;
  test2: any;
  matEns:any;

  public focus;
  constructor(private gestionGroupesService: GestionGroupesService, private gestionEnseignantService: GestionEnseignantService, private gestionEtudiantLocalService: GestionEtudiantLocalService, private gestionEtudiantEtrangerService: GestionEtudiantEtrangerService) {
    this.userId = localStorage.getItem('userId');
  }

  async ngOnInit() {
    await this.gestionEnseignantService.getUser(this.userId).toPromise().then(data => {
      this.groupes = data['groupes'];
      this.matEns=data['mat'];
    })
    await this.gestionEtudiantLocalService.getAllUsers().toPromise().then(data => {
      this.test = data;
      for (this.i = 0; this.i < this.test.length; (this.i)++) {
        for (this.j = 0; this.j < this.groupes.length; (this.j)++) {
          if (this.test[this.i]["grp"].id == this.groupes[this.j].id) {
            this.etudiants.push(this.test[this.i]);
          }
        }
      }
    })
    await this.gestionEtudiantEtrangerService.getAllUsers().toPromise().then(data => {
      this.test = data;
      for (this.i = 0; this.i < this.test.length; (this.i)++) {
        for (this.j = 0; this.j < this.groupes.length; (this.j)++) {
          if (this.test[this.i]["grp"].id == this.groupes[this.j].id) {
            this.etudiants.push(this.test[this.i]);
          }
        }
      }
   
    })
    if(this.etudiants.length<=5){
      this.pageItems= new Array(0);
    }
    else{
    if (this.etudiants.length % 5 == 0) {
      this.pageItems = new Array(Math.trunc(this.etudiants.length / 5));
      
    }
    else { this.pageItems = new Array(Math.trunc(this.etudiants.length / 5) + 1) }}
    this.currentItem = 0;
    this.taille = this.pageItems.length;

 
  


  }
  confirmSwal(id) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
      title: 'vous êtes sûre ?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Non, annulée',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.gestionEtudiantEtrangerService.removeUser(id).subscribe(results => {
        })
        this.gestionEtudiantLocalService.removeUser(id).subscribe(results => {
        })
        swalWithBootstrapButtons.fire({
          title: 'Etudiant supprimé',
          text: "",
          icon: 'success',
          timer: 9000
        }).then(function () {
          window.location.reload();
        })
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Action annulée',
          '',
          'error'
        )

      }
    })

  }
  updateIndex(y) {
    this.currentItem = y;
    this.startIndex = y * 5;
    this.endIndex = this.startIndex + 5;


  }
}
