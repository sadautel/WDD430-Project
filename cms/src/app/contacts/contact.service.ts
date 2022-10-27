import {EventEmitter,  Injectable} from '@angular/core';
  import {Contact} from './contact.model';
  import {MOCKCONTACTS} from './MOCKCONTACTS';
  import { Subject } from 'rxjs';
  import { NumberValueAccessor } from '@angular/forms';

  @Injectable({
    providedIn: 'root'
})
  export class ContactService {
     private contacts: Contact [] =[];
     contactChangedEvent = new EventEmitter<Contact[]>();
     contactListChangedEvent = new Subject<Contact[]>();
     maxContactId: number;


     constructor() {
        this.contacts = MOCKCONTACTS;
        this.maxContactId = this.getMaxId();
     }

     getContacts(){
       return this.contacts.slice();
     }

     getContact(id: string) {
      for(let contact of this.contacts){
        if(contact.id === id){
          return contact;
        }
      }
      return null;
     } 
     deleteContact(contact: Contact) {
      if (contact === null || contact === undefined) {
        return;
      }
      const pos = this.contacts.indexOf(contact);
  
      if (pos < 0) {
        return;
      }
      this.contacts.splice(pos, 1);
      this.contactListChangedEvent.next(this.contacts.slice());
    }

    getMaxId(): number {
      let maxId = 0;
      for (const contact of this.contacts) {
        const currentId = +contact.id;
        if (currentId > maxId) {
          maxId = currentId;
        }
      }
      return maxId;
    }
  
    addContact(newContact: Contact) {
  
      if (newContact === null || newContact === undefined) {
        return;
      }
      this.maxContactId++;
      newContact.id = this.maxContactId.toString();
      this.contacts.push(newContact);
      const contactListClone = this.contacts.slice();
      this.contactListChangedEvent.next(contactListClone);
    }
  
    updateContact(originalContact: Contact, newContact: Contact) {
      if (originalContact === null || originalContact === undefined || newContact === null || newContact === undefined) {
  
        return;
      }
      const pos = this.contacts.indexOf(originalContact);
      if (pos < 0) {
        return;
      }
      newContact.id = originalContact.id;
      document[pos] = newContact;
      const contactListClone = this.contacts.slice();
      this.contactListChangedEvent.next(contactListClone);
    }    
  }