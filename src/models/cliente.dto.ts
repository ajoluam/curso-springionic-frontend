export interface ClienteDTO {

    id: string;
    nome: string;
    email: string;

    //Paa atributs opcionais d objeto colocamos uma "?" depois do nome, indicando que não precisa ser preenchido
    imageUrl? : string;

}