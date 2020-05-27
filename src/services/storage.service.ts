import { Injectable } from "@angular/core";
import { LocalUser } from "../models/local_user";
import { STORAGE_KEYS } from "../config/storage_keys.config";

@Injectable()
export class StorageService {


    //Método que retorna o usuário logado
    getLocalUser(): LocalUser {
        let usr = localStorage.getItem(STORAGE_KEYS.localUser);// retorna o valor da chave localuser salvo no localStorage
        if (usr == null) {
            return null;
        } else {
            return JSON.parse(usr);
        }
    }

    //Método que recebe o usuário logado e salva no storage 
    setLocalUser(obj : LocalUser){
        if (obj == null){
            localStorage.removeItem(STORAGE_KEYS.localUser);
        } else {
            localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
        }

    }





}