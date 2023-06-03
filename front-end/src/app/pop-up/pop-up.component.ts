import {Component, ElementRef, EventEmitter, Input, Output} from '@angular/core';
import {User} from "../../models/user.models";
import {ActivatedRoute} from "@angular/router";
import {UsersService} from "../../services/users.service";
import {PopupService} from "../../services/pop-up.service";
import {UserConfigModel} from "../../models/user-config.model";

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss']
})
export class PopUpComponent {
   @Input() user: User = {
    firstName: "",
    lastName: "",
    id: "",
    stats: {
      statsByTheme: []
    },
    config: {} as UserConfigModel // Assign an empty UserConfigModel object
  };

  min:number=20;
  max:number=45;
  constructor(private route: ActivatedRoute, private userService: UsersService, private elementRef:ElementRef, private popUpService: PopupService) {}

  @Output() valider: EventEmitter<void> = new EventEmitter<void>();
  @Output() fermer: EventEmitter<void> = new EventEmitter<void>();



  ngOnInit() {
    /*const id = this.route.snapshot.queryParamMap.get('user')!;

    this.route.queryParams.subscribe(() => {
      this.userService.getUserById(id).subscribe(
        response => {
          // Handle the user data received in the response
          console.log(response);
          // Assign the user data to this.user
          this.user = response;
        },
        error => {
          // Handle any errors that occur during the HTTP request
          console.error(error);
        }
      );
    });*/
  }

  value = 0;
  updateValue() {
    if (this.value < 16) {
      this.value = 16;
    } else if (this.value > 35) {
      this.value = 35;
    }
  }

  changeFontSize() {
    const textElements: NodeListOf<HTMLElement> = this.elementRef.nativeElement.querySelectorAll('.resize');
    textElements.forEach((element: HTMLElement) => {
      const newValue =  30*(this.value/100+1);
      console.log(newValue);
      element.style.fontSize = newValue + 'px';
    });
    const button:HTMLElement = this.elementRef.nativeElement.querySelectorAll('.button-card');
    const newValue =  30*(this.value/100+1);
    console.log(newValue);
    button.style.fontSize = newValue + 'px';
  }

  onValider() {
    this.userService.updateUser(this.user);
    this.valider.emit();
    this.popUpService.openAdjustButton();
  }

  onClose(){
    this.fermer.emit();
    this.popUpService.closePopup();
  }

}
