import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {Contact} from  '../contact.model';
import { ContactService } from '../contact.service';
@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  @Output() selectedContactEvent = new EventEmitter<Contact>();
  contact: Contact[];

  constructor(private contactService: ContactService) { }

  ngOnInit(){
    this.contact = this.contactService.getContacts();
  }

  onContactSelected(contact: Contact){
    this.contactService.contactSelectedEvent.emit(contact);
  }

}
