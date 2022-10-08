import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import { Document } from '../document.model';
@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {

  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  document: Document[] = [
    new Document("1", "CS 260 - Object Oriented Programming", "Document 1", "www.byui.edu"),
    new Document("2", "WDD 430 - Web Full Stack Development", "Document 2", "www.byui.edu"),
    new Document("3", "CIT 420 - Data Warehousing", "Document 3", "www.byui.edu"),
    new Document("4", "CIT 460 - Enterpise Development", "Document 4", "www.byui.edu"),
    new Document("5", "CIT 495 - Senior Project", "Document 5", "www.byui.edu")
  ]
  constructor() { }

  ngOnInit(): void {
  }

  onSelectedDocument(document: Document){
    this.selectedDocumentEvent.emit(document);
  }

}
