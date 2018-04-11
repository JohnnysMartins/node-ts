export class Usuario {
    private id: number;
    private senha: string;
    private email: string;
    private nome: string;

    constructor(nome: string, email: string, senha: string, id?:number) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        if (id) {
            this.id = id;
        }
    }

    public getSenha(): string{
        return this.senha;
    }

    public getEmail(): string{
        return this.email;
    }

    public getNome(): string{
        return this.nome;
    }

    public getId(): number{
        return this.id;
    }
}