import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { CategoriaDTO } from "../../models/categoria.dto";
//O import do Observable é incompleto se deixarmos assim : "rxjs/Observable
//por isso devemos trocar por Rx
import { Observable } from "rxjs/Rx";

//para esta classe possa ser injetada em outros lugares
@Injectable()
export class CategoriaService {

    constructor(public http: HttpClient) {

    }

    //Metodo responsavel para pegar as categorias, 
    //como o http.get é Assincrono e retorna um Observable<Object>, assim meu metodo devera 
    //retornar um Observable<CategoriaDTO[]> e o meu get deverá ser tipado get<CategoriaDTO[]>

    findAll(): Observable<CategoriaDTO[]> {
        //se eu usasr a crase ` posso concatenar variaveis a textos
        return this.http.get<CategoriaDTO[]>(`${API_CONFIG.baseUrl}/categorias`);
    }

}