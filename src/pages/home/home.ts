import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage() //permite que no app.component.ts possamos utilizar a referenciação da classe
             // HomePage como uma string sem precisar realizarmos um import
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'  // aqui é onde indicamos a referência a qual arquivo 
                            // HTML ele está controlando
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

}
