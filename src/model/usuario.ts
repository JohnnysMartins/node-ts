export class Usuario {
    private senha: string;
    private email: string;
    private nome: string;

    constructor(nome: string, email: string, senha: string) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
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
}