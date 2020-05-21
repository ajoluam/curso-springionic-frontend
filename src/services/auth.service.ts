import { Injectable } from "@angular/core";
import { CredenciaisDTO } from "../models/credenciais.dto";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { LocalUser } from "../models/local_user";
import { StorageService } from "./storage.service";
import { JwtHelper } from "angular2-jwt";

@Injectable()
export class AuthService{

    jwtHelper : JwtHelper = new JwtHelper();

    constructor(public http: HttpClient, public storage : StorageService) {

    }

    // O método POST requer alguns parâmetro extras , inclusive o responseType
    //colocamos text porque não recebemos nada como resposta, se colacassemoa JSON
    //tomariamos um erro na hora de fazer o parse do JSON
    authenticate(creds : CredenciaisDTO){
        return this.http.post(
            `${API_CONFIG.baseUrl}/login`, 
            creds,
            {
                observe: 'response',
                responseType: 'text'
            });

    }

    successLogin(authorizationValue : string){
        //Para retirar a palavra BEARER que vem no token
        //Usaremos a biblioteza JWT para extrair o email do token
        let tok = authorizationValue.substring(7);
        let user : LocalUser = {
            token: tok,
            email: this.jwtHelper.decodeToken(tok).sub
        };

        this.storage.setLocalUser(user);

    }

    logout(){

        this.storage.setLocalUser(null);

    }

}