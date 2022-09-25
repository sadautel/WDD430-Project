import { Component, OnInit } from '@angular/core';
import {Contact} from  '../contact.model';
@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contact: Contact[] = [
    new Contact('1', 'Rex Barzee', 'jacksonk@byui.edu', '208-496-3771', '../../assets/images/jacksonk.jpg'),
    new Contact('2', 'R. Kent Jackson', 'barzeer@byui.edu', '208-496-3768', '../../assets/images/barzeer.jpg')
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
