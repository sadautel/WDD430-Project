import {EventEmitter,  Injectable} from '@angular/core';
  import {Contact} from './contact.model';
  import {MOCKCONTACTS} from './MOCKCONTACTS';
  import { Subject } from 'rxjs';
  import { HttpClient, HttpHeaders } from '@angular/common/http';
  @Injectable({
    providedIn: 'root'
})
  export class ContactService {
     private contacts: Contact [] =[];
     contactChangedEvent = new EventEmitter<Contact[]>();
     contactListChangedEvent = new Subject<Contact[]>();
     maxContactId: number;


     constructor(private http: HttpClient) {
      this.getContacts();
      this.maxContactId = this.getMaxId();
    }

    getContacts() {
      this.http.get('https://wdd430cms-91f1e-default-rtdb.firebaseio.com/contacts.json')
        .subscribe(
          // success method
          (contacts: Contact[]) => {
            this.contacts = contacts;
            this.maxContactId = this.getMaxId();
            this.contacts.sort((a, b) => (a.name < b.name) ? 1 : (a.name > b.name) ? -1 : 0)
            this.contactListChangedEvent.next(this.contacts.slice());
          },
          // error method
          (error: any) => {
            console.log(error);
          }
        )
    }

     getContact(id: string): Contact| null{
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
      this.storeContacts();
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
      this.storeContacts();
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
      this.storeContacts();
    }  
    
    storeContacts() {
      let contacts = JSON.stringify(this.contacts);
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
  
      this.http.put('https://wdd430cms-91f1e-default-rtdb.firebaseio.com/contacts.json', contacts, { headers: headers })
        .subscribe( () => {
            this.contactListChangedEvent.next(this.contacts.slice());
          }
        )
    }
    
    
  }