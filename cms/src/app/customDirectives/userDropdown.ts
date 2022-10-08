import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[userDropdown]'
})
export class UserDropdownDirective {
  @HostBinding('class.open') isOpen = false;

  @HostListener('click') toggleOpen(){
    this.isOpen = !this.isOpen;
  }

}