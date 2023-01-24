import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';

export class Emplois {
  constructor(
    public id: string,
    public imageUrl: string,
  ) {
  }
}
@Component({
  selector: 'app-emplois',
  templateUrl: './emplois.component.html',
  styleUrls: ['./emplois.component.css']
})
export class EmploisComponent implements OnInit {

  emplois: Emplois[];
  closeResult : string;
  editForm : FormGroup;
  deleteId : string;

  constructor(private httpClient: HttpClient, private modalService: NgbModal, private fb:FormBuilder ){}

  ngOnInit(): void {
    this.getEmplois();
    this.editForm = this.fb.group({
      id: [''],
      imageUrl: [''],

    } );
  }

  getEmplois(){

    this.httpClient.get<any>('http://localhost:8888/Emplois').subscribe(
    response => {
      console.log(response);
      this.emplois = response;
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
    const url = 'http://localhost:8888/Emplois/addnew';
    this.httpClient.post(url, f.value)
      .subscribe((result) => {
        this.ngOnInit(); //reload the table
      });
    this.modalService.dismissAll(); //dismiss the modal
  }

  openDetails(targetModal:any, emplois: Emplois) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static',
     size: 'lg'
   });
    document.getElementById('id2').setAttribute('value', emplois.id);
    document.getElementById('imageUrl2').setAttribute('value', emplois.imageUrl);

 }
  openEdit(targetModal:any, emplois: Emplois) {
  this.modalService.open(targetModal, {
   centered: true,
   backdrop: 'static',
   size: 'lg'
 });
 this.editForm.patchValue( {
  firstname: emplois.id, 
  lastname: emplois.imageUrl,
 
});
}

onSave() {
  const editURL = 'http://localhost:8888/Emplois/' + this.editForm.value.id + '/edit';
  console.log(this.editForm.value);
  this.httpClient.put(editURL, this.editForm.value)
    .subscribe((results) => {
      this.ngOnInit();
      this.modalService.dismissAll();
    });
}
openDelete(targetModal:any, emplois: Emplois) {
  this.deleteId = emplois.id;
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'lg'
  });
}
onDelete() {
  const deleteURL = 'http://localhost:8888/Emplois/' + this.deleteId + '/delete';
  this.httpClient.delete(deleteURL)
    .subscribe((results) => {
      this.ngOnInit();
      this.modalService.dismissAll();
    });
}
}
