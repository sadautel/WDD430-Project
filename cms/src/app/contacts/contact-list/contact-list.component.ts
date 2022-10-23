import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {Contact} from  '../contact.model';
import { ContactService } from '../contact.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contact: Contact[];

  constructor(private contactService: ContactService, private Route:ActivatedRoute, private Router: Router) { }

  ngOnInit(){
    this.contact = this.contactService.getContacts();
    this.contactService.contactChangedEvent.subscribe((contacts: Contact[]) => {
      this.contact = contacts;
    });
  }
}
