import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {

  @ViewChild('f') documentForm!: NgForm;
  subscription: Subscription;
  originalDocument: Document;
  document: Document;
  editMode: boolean = false;

  constructor(
    private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      let id = params.id;
      if (!id || id == null) {
        this.editMode = false;
        return;
      }

      this.originalDocument = this.documentService.getDocument(id);

      if (this.originalDocument == null || !this.originalDocument) {
        return;
      }
      this.editMode = true;
      this.document = JSON.parse(JSON.stringify(this.originalDocument));
      console.log(this.document);

    });
  }


  onSubmit(form:NgForm){
    const value = form.value;
    const newDocument = new Document(
      value.id,
      value.name,
      value.description,
      value.url,
      null
    );
    if (this.editMode && this.originalDocument) {
      this.documentService.updateDocument(this.originalDocument, newDocument);
    } else {
      this.documentService.addDocument(newDocument);
    }
  
    this.router.navigate(['/documents']);
  }
 
  onCancel(){
    this.router.navigate(['/documents']);
  }
}



