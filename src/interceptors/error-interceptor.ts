import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx"; //IMPORTANTE - IMPORTE ATUALIZADO
import { StorageService } from "../services/storage.service";
import { AlertController } from "ionic-angular";


@Injectable()
export class ErrorInterceptor implements HttpInterceptor{


        constructor(public storage: StorageService, public alertCtrl : AlertController){

        }
    
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //Ao interceptar a requisição a mesma deverá ser continuada (next.handle(req))
        //Caso aconteça algum erro , progada ele tb (Observable.throw(error)) para o 
        //controlador , o controlador por sua vez joga está mandando imprimir na tela
        //o erro (console.log(error) - da classe categorias.ts)
        return next.handle(req)
            //Aqui está o catch , onde o erro é capturado
            .catch(
            (error, caught) => {

                let errorObj = error;
                if (errorObj.error){
                    errorObj = errorObj.error; //So quero que mostre o atributo erro
                }

                if (!errorObj.status){ //Se não tiver o atributo status quer dizer que não está em formato JSON
                    errorObj = JSON.parse(errorObj);
                }

                console.log("Erro detectado pelo Interceptor:");
                console.log(errorObj);


                switch(errorObj.status){

                    case 401:
                        this.handle401();
                    break;

                    case 403:
                        this.handle403();
                    break;

                    default:
                        this.handleDefaultEror(errorObj);
                   
                }



                return Observable.throw(errorObj);
            }) as any;
    }


    handleDefaultEror(errorObj) {
        let alert = this.alertCtrl.create({
            title: 'Erro ' + errorObj.status + ': ' + errorObj.error,
            message: errorObj.message,
            enableBackdropDismiss: false , //para sair do Alert tenho que clicar no botão do alert e não clicar fora
            buttons:[
                {
                    text: 'OK',
                }
            ]
        });
        alert.present();
    }

    handle401(){
        let alert = this.alertCtrl.create({
            title: 'Erro 401: Falha de autenticação.',
            message: 'Email ou senha incorretos.',
            enableBackdropDismiss: false , //para sair do Alert tenho que clicar no botão do alert e não clicar fora
            buttons:[
                {
                    text: 'OK',
                }
            ]
        });
        alert.present();
        
    }
    
    // Como erro 403 Forbidden significa  Acesso negado/proibido, vou apagar o localUser
    handle403(){
        this.storage.setLocalUser(null);
    }



}

//Conforme  documentação do angular é preciso declarar o provider do interceptor 
//da forma como está aqui em baixo
export const ErrorInterceptorProvider = {
    provide : HTTP_INTERCEPTORS,
    useClass : ErrorInterceptor,
    multi : true,
};