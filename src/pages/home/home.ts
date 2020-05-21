import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController } from 'ionic-angular';
import { CredenciaisDTO } from '../../models/credenciais.dto';
import { AuthService } from '../../services/auth.service';

@IonicPage() //permite que no app.component.ts possamos utilizar a referenciação da classe
// HomePage como uma string sem precisar realizarmos um import
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'  // aqui é onde indicamos a referência a qual arquivo 
  // HTML ele está controlando
})
export class HomePage {

  // Criando um objeto CredenciaisDTO e instanciando valores vazios
  creds: CredenciaisDTO = {
    email: "",
    senha: ""
  };

  //Isso aqui é ma injeção de dependência através do construtor
  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    public authService: AuthService) {

  }

  login() {
    //Em Typescript todo objeto tem que ser preceddo pelo THIS, não posso chamar o objeto diretamente
    //Como o push empilha a página uma em cima da outra, ele coloca automaticamente uma seta para voltar
    //this.navCtrl.push('CategoriasPage');

    //Com o setRoot ele não empilha a página então não aparece a setinha para voltar
    //aparece só o menu 
    console.log(this.creds);
    this.authService.authenticate(this.creds)
      .subscribe(
        response => {
          console.log(response.headers.get('Authorization'));
          this.navCtrl.setRoot('CategoriasPage');
        },
        error => {}
      )
  };


  //Quando entrarmos na pagina HomePage, o menu lateral será desabilitado
  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }

  //Quando deixarmosa pagina HomePage, o menu lateral será habilitado
  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }

}
