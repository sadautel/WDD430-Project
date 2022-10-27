import { Component,  OnDestroy,  OnInit } from '@angular/core';
import {Contact} from  '../contact.model';
import { ContactService } from '../contact.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy {
  contact: Contact[];
  private subscription: Subscription;
  constructor(private contactService: ContactService, private Route:ActivatedRoute, private Router: Router) { }

  ngOnInit(){
    this.contact = this.contactService.getContacts();
    this.subscription= this.contactService.contactListChangedEvent.subscribe((contacts: Contact[]) => {
      this.contact = contacts;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}