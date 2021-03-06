import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Nav, Platform } from 'ionic-angular';
import { AuthService } from '../services/auth.service';



@Component({  //Esse arquivo é o controladr da pagina app.html
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: string = 'HomePage';  // esse cara é quem vai dizer qual será a página inicial a ser aberta
                                  // quando meu aplicativo for iniciado

  pages: Array<{title: string, component: string}>;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public authService: AuthService) {
    this.initializeApp();

    // Um menu será aberto com essas opções de páginas para navegação
    this.pages = [
      { title: 'Profile', component: 'ProfilePage' },
      { title: 'Categorias', component: 'CategoriasPage' },
      { title: 'Logout', component: '' },
      

    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page : {title:string, component:string}) {
    switch(page.title){
      case 'Logout':
        this.authService.logout();
        this.nav.setRoot('HomePage');
      break;

      default:
      this.nav.setRoot(page.component);
    }
  }


}
