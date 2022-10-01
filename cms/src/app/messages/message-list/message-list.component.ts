import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {Message} from  '../message.model';
@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {

  messages: Message[] = [
    new Message('1', 'Reunion', 'Please let me know what to bring', 'Savannah'),
    new Message('2', 'Birthday', 'Please let me know what to bring', 'Savie'),
  ];
  constructor() { }

  ngOnInit(): void {
  }

  onAddMessage(message: Message) {
    //push message to array of messages
    this.messages.push(message);
  }

}
