import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';

export class User {
  constructor(
    public id: string,
    public firstname: string,
    public lastname: string,
    public adresse: string,
    public email: string,
    public phone: string,
    public classe: string,
  ) {
  }
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users: User[];
  closeResult : string;
  editForm : FormGroup;
  deleteId : string;

  constructor(private httpClient: HttpClient, private modalService: NgbModal, private fb:FormBuilder ){}

  ngOnInit(): void {
    this.getUsers();
    this.editForm = this.fb.group({
      firstname: [''],
      lastname: [''],
      adresse: [''],
      email: [''],
      phone: [''],
      classe: ['']
    } );
  }

  getUsers(){

    this.httpClient.get<any>('http://localhost:8080/user/users').subscribe(
    response => {
      console.log(response);
      this.users = response;
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
    const url = 'http://localhost:8080/user/signup';
    this.httpClient.post(url, f.value)
      .subscribe((result) => {
        this.ngOnInit(); //reload the table
      });
    this.modalService.dismissAll(); //dismiss the modal
  }

  openDetails(targetModal:any, user: User) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static',
     size: 'lg'
   });
    document.getElementById('fname').setAttribute('value', user.firstname);
    document.getElementById('lname').setAttribute('value', user.lastname);
    document.getElementById('adresse2').setAttribute('value', user.adresse);
    document.getElementById('email2').setAttribute('value', user.email);
    document.getElementById('phone2').setAttribute('value', user.phone);
    document.getElementById('classe2').setAttribute('value', user.classe);
 }
  openEdit(targetModal:any, user: User) {
  this.modalService.open(targetModal, {
   centered: true,
   backdrop: 'static',
   size: 'lg'
 });
 this.editForm.patchValue( {
  firstname: user.firstname, 
  lastname: user.lastname,
  adresse: user.adresse,
  email: user.email,
  phone: user.phone,
  classe: user.classe
});
}

onSave() {
  const editURL = 'http://localhost:8080/user//useres/{id}' + this.editForm.value.id + '/edit';
  console.log(this.editForm.value);
  this.httpClient.put(editURL, this.editForm.value)
    .subscribe((results) => {
      this.ngOnInit();
      this.modalService.dismissAll();
    });
}
openDelete(targetModal:any, user: User) {
  this.deleteId = user.id;
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'lg'
  });
}
onDelete() {
  const deleteURL = 'http://localhost:8080/user/useres/{id}' + this.deleteId + '/delete';
  this.httpClient.delete(deleteURL)
    .subscribe((results) => {
      this.ngOnInit();
      this.modalService.dismissAll();
    });
}
}
