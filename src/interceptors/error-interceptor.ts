import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx"; //IMPORTANTE - IMPORTE ATUALIZADO


@Injectable()
export class ErrorInterceptor implements HttpInterceptor{
    
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("Passou no Interceptor");
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

                return Observable.throw(errorObj);
            }) as any;
    }

}

//Conforme  documentação do angular é preciso declarar o provider do interceptor 
//da forma como está aqui em baixo
export const ErrorInterceptorProvider = {
    provide : HTTP_INTERCEPTORS,
    useClass : ErrorInterceptor,
    multi : true,
};