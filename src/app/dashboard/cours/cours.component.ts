import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';

export class Cour {
  constructor(
    public id: string,
    public name: string,
    public chaps: string,
    public nb_heure: string,

  ) {
  }
}

@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.css'],
})
export class CoursComponent implements OnInit {

  cours: Cour[];
  closeResult : string;
  editForm : FormGroup;
  deleteId : string;

  constructor(private httpClient: HttpClient, private modalService: NgbModal, private fb:FormBuilder ){}

  ngOnInit(): void {
    this.getCours();
    this.editForm = this.fb.group({
      id: [''],
      name: [''],
      chaps: [''],
      nb_heure: [],
  
    } );
  }

  getCours(){

    this.httpClient.get<any>('http://localhost:8888/matiere').subscribe(
    response => {
      console.log(response);
      this.cours = response;
    }
  );
  }
  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onSubmit(f: NgForm) {
    const url = 'http://localhost:8888/matiere/addnew';
    this.httpClient.post(url, f.value)
      .subscribe((result) => {
        this.ngOnInit(); //reload the table
      });
    this.modalService.dismissAll(); //dismiss the modal
  }

  openDetails(targetModal:any, cour: Cour) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static',
     size: 'lg'
   });
    document.getElementById('id2').setAttribute('value', cour.id);
    document.getElementById('name2').setAttribute('value', cour.name);
    document.getElementById('chaps2').setAttribute('value', cour.chaps);
    document.getElementById('nb_heure2').setAttribute('value', cour.nb_heure);
 

 }
  openEdit(targetModal:any, cour: Cour) {
  this.modalService.open(targetModal, {
   centered: true,
   backdrop: 'static',
   size: 'lg'
 });
 this.editForm.patchValue( {
  id: cour.id, 
  name: cour.name,
  chaps: cour.chaps,
  nb_heure: cour.nb_heure,

});
}

onSave() {
  const editURL = 'http://localhost:8888/matieres/' + this.editForm.value.id + '/edit';
  console.log(this.editForm.value);
  this.httpClient.put(editURL, this.editForm.value)
    .subscribe((results) => {
      this.ngOnInit();
      this.modalService.dismissAll();
    });
}
openDelete(targetModal:any, cour: Cour) {
  this.deleteId = cour.id;
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'lg'
  });
}
onDelete() {
  const deleteURL = 'http://localhost:8888/matieres/' + this.deleteId + '/delete';
  this.httpClient.delete(deleteURL)
    .subscribe((results) => {
      this.ngOnInit();
      this.modalService.dismissAll();
    });
}
}
