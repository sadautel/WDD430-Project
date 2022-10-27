import { Injectable, EventEmitter } from '@angular/core';
import { MOCKDOCUMENTS } from '../documents/MOCKDOCUMENTS';
import { Document } from './document.model';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documentSelectedEvent = new EventEmitter<Document>();
  documentChangedEvent = new EventEmitter<Document[]>();
  documentListChangedEvent = new Subject<Document[]>();
  maxDocumentId: number;
  private documents: Document[];
 

  constructor() { 
   this.documents = MOCKDOCUMENTS;
   this.maxDocumentId = this.getMaxId();
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
    if (document === undefined || document === null) {
      return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }
    this.documents.splice(pos, 1);
    const documentsListClone = this.documents.slice()
    this.documentListChangedEvent.next(this.documents.slice());
  }

  getMaxId(): number {
    let maxId = 0;
    for (const document of this.documents) {
      const currentId = +document.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addDocument(newDocument: Document) {
    if (newDocument === undefined || newDocument === null) {
      return;
    }
    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);
    const documentListClone = this.documents.slice();

    this.documentListChangedEvent.next(documentListClone);
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (originalDocument === undefined || originalDocument === null || newDocument === undefined || newDocument === null) {
      return;
    }
    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }
    newDocument.id = originalDocument.id;
    document[pos] = newDocument;
    const documentListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentListClone);
  }

}