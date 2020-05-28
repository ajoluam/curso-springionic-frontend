import { Injectable } from "@angular/core";
//import { HttpClient, HttpHeaders } from "@angular/common/http";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/RX";
import { Observable } from "rxjs/RX";
import { ClienteDTO } from "../../models/cliente.dto";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";

@Injectable()
export class ClienteService {


    constructor(public http: HttpClient, public storage : StorageService) {

    }

    findByEmail(email : string) : Observable<ClienteDTO> {

        //Quando não estava interceptando a requisição para colocar o Token, precisava fazer isso manualmente  
        //   let token = this.storage.getLocalUser().token;
        //   let authHeader = new HttpHeaders({'Authorization': 'Bearer ' + token});

       return this.http.get<ClienteDTO>(
           `${API_CONFIG.baseUrl}/clientes/email?value=${email}`
           //{'headers': authHeader}
           );

    }

    


}