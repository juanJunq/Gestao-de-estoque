import { Data } from "../model/interfaceData";
import EstoqueService from "../service/serviceEstoque";
const estoqueService = new EstoqueService();

export async function adicionarProduto(data: Data){
    try{
        await estoqueService.criar(data);
    } catch(error) {
        console.error("Erro ao adicionar produto");
    }
}

export async function removerProduto(nome: string, confirma: (produto: string) => boolean){
    try{
        const produto = await estoqueService.buscar(nome);
        if(!produto){
            console.log("\n\nProduto nao encontrado\n\n");
            return;
        }
        console.log(`Nome: ${produto.nome}`);
        console.log(`Peso: ${produto.peso}`);
        console.log(`Valor: ${produto.valor}`);
        console.log(`Quantidade: ${produto.quantidade}`);
        if(confirma(produto.nome)){
            await estoqueService.remover(nome);
        } else {
            console.log("Remocao cancelada");
        }
    } catch(error) {
        console.error("Erro ao remover");
    }
}