import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appDropDown]',
})
export class DropDownDirective {
  @Input() appDropDown: HTMLUListElement;
  isDropDownOpen = false;
  @HostListener('click') onClick() {
    if (this.isDropDownOpen) {
      this.appDropDown.classList.remove('show');
    } else {
      this.appDropDown.classList.add('show');
    }
    this.isDropDownOpen = !this.isDropDownOpen;
  }
}
