import { Directive, HostListener, NgModule } from '@angular/core';
import { NavigationService } from "../services/navigation.service";

@Directive({
  selector: '[appBackbutton]'
})
export class BackbuttonDirective {

  constructor(
    private navigation: NavigationService
  ) { }


  @HostListener('click')
  onClick(): void {
    this.navigation.back()
  }

}




