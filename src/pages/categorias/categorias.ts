import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriaService } from '../../services/domain/categoria.service';
import { CategoriaDTO } from '../../models/categoria.dto';

/**
 * Generated class for the CategoriasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  items: CategoriaDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public categoriaService: CategoriaService) {
  }


//evento de quando a página acabar de ser carregada
  ionViewDidLoad() {
    
    this.categoriaService.findAll()
    //Como findAll é assincrono, temos que nos inscrever para fazer alguma coisa
    //para quando obtivermos a resposta do metodo, assim usaremos o .subscribe
    //no subscribe estará a função callback , que fará algo com a response quando chegar
    //no nosso caso vamos usar um arrow function que equivale ao lambda do java
    //essa funcao poderia ser feita fora , tipo f(), e dentro do subscribe só passar ela:
    // f(response) { console.log(reponse);}
      .subscribe(
      response => {
       this.items=response;
      }, 
      error =>{
        console.log(error);
      } 
      )
    
  }

  

}
