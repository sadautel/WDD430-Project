import { Component, EventEmitter, Output } from "@angular/core";



@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class headerComponent{

    @Output() selectedFeatureEvent = new EventEmitter<string>();
    
    onSelect(selectedEvent: string){
        this.selectedFeatureEvent.emit(selectedEvent);
    }
}