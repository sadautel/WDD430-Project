import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {Message} from  '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  @Output() documentEvent = new EventEmitter<Message>();
  messages: Message[];
  
  constructor(private messageService: MessageService) { }

  ngOnInit(){
    this.messageService.messageChangedEvent.subscribe(
      (messages: Message[]) => {
        this.messages = messages;
      }
    );
    this.messageService.getMessages();
  }

  onAddMessage(message: Message) {
    //push message to array of messages
    this.messages.push(message);
  }

}
