import { Injectable, EventEmitter } from '@angular/core';
import { MOCKDOCUMENTS } from '../documents/MOCKDOCUMENTS';
import { Document } from './document.model';
@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documentSelectedEvent = new EventEmitter<Document>();
  private documents: Document[];
  documentChangedEvent = new EventEmitter<Document[]>();

  constructor() { 
   this.documents = MOCKDOCUMENTS;
  }

  getDocuments() {
    return this.documents.slice();
  }

  getDocument(id: string){
    for(let document of this.documents){
      if (document.id === id){
        return document;
      }
    }
    return null;
  }

  deleteDocument(document: Document) {
    if (!document) {
       return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
       return;
    }
    this.documents.splice(pos, 1);
    this.documentChangedEvent.emit(this.documents.slice());
 }

}