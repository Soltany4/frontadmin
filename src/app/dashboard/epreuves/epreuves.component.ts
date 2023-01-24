import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';

export class Epreuve {
  constructor(
    public id: string,
    public name: string,
    public note: any,

  ) {
  }
}

@Component({
  selector: 'app-epreuves',
  templateUrl: './epreuves.component.html',
  styleUrls: ['./epreuves.component.css'],

})
export class EpreuvesComponent implements OnInit {

  epreuves: Epreuve[];
  closeResult : string;
  editForm : FormGroup;
  deleteId : string;

  constructor(private httpClient: HttpClient, private modalService: NgbModal, private fb:FormBuilder ){}

  ngOnInit(): void {
    this.getEpreuves();
    this.editForm = this.fb.group({
      id: [''],
      name: [''],
      note: [],

    } );
  }

  getEpreuves(){

    this.httpClient.get<any>('http://localhost:8888/epreuve').subscribe(
    response => {
      console.log(response);
      this.epreuves = response;
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
    const url = 'http://localhost:8888/epreuves/addnew';
    this.httpClient.post(url, f.value)
      .subscribe((result) => {
        this.ngOnInit(); //reload the table
      });
    this.modalService.dismissAll(); //dismiss the modal
  }

  openDetails(targetModal:any, epreuve: Epreuve) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static',
     size: 'lg'
   });
    document.getElementById('id2').setAttribute('value', epreuve.id);
    document.getElementById('name2').setAttribute('value', epreuve.name);
    document.getElementById('note2').setAttribute('value', epreuve.note);
 }
  openEdit(targetModal:any, epreuve: Epreuve) {
  this.modalService.open(targetModal, {
   centered: true,
   backdrop: 'static',
   size: 'lg'
 });
 this.editForm.patchValue( {
  id: epreuve.id, 
  name: epreuve.name,
  note: epreuve.note,

});
}

onSave() {
  const editURL = 'http://localhost:8888/epreuve/' + this.editForm.value.id + '/edit';
  console.log(this.editForm.value);
  this.httpClient.put(editURL, this.editForm.value)
    .subscribe((results) => {
      this.ngOnInit();
      this.modalService.dismissAll();
    });
}
openDelete(targetModal:any, epreuve: Epreuve) {
  this.deleteId = epreuve.id;
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'lg'
  });
}
onDelete() {
  const deleteURL = 'http://localhost:8888/epeuve/' + this.deleteId + '/delete';
  this.httpClient.delete(deleteURL)
    .subscribe((results) => {
      this.ngOnInit();
      this.modalService.dismissAll();
    });
}
}
