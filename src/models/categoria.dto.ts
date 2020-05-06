//Export - para que a classe possa ser importada em outras classes
//Interface - models precisam ser interfaces
export interface CategoriaDTO{
//mesmo sabendo que o id na api é um inteiro posso deixar aqui como string
//isso não irá influenciar e me dará mais flexibilidade
    id : string;
    nome : string;
}