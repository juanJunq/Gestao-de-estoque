import { Data } from "../model/interfaceData";
import EstoqueService from "../service/serviceEstoque";
const estoqueService = new EstoqueService();

export async function adicionarProduto(data: Data){
    try{
        await estoqueService.criar(data);
        console.log("\n\nProduto adicionado com sucesso\n\n");
    } catch(error) {
        console.error("\n\nErro ao adicionar produto: ", error);
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
            console.log(`\n\nProduto ${produto.nome} removido com sucesso\n\n`);
        } else {
            console.log("\n\nRemocao cancelada\n\n");
        }
    } catch(error) {
        console.error("\n\nErro ao remover produto: ", error);
    }
}

export async function listarProduto(): Promise<void>{
    try{
        const produtos = await estoqueService.listar();
        if(!produtos || produtos.length === 0){
            console.log("\n\nNenhum item no estoque\n\n");
            return;
        }
        console.log("\nProdutos no estoque:");
        produtos.forEach(produto => {
            console.log(`\tNome: ${produto.nome}`);
            console.log(`\tPeso: ${produto.peso} kg`);
            console.log(`\tValor: R$ ${produto.valor}`);
            console.log(`\tQuantidade: ${produto.quantidade}`);
            console.log("-------------------------------");
        });
    } catch(error) {
        console.error("\n\nErro ao listar os produtos\n\n");
    }
}

export async function exibirValorTotal(): Promise<void>{
    try{
        const valorTotal = await estoqueService.calculaValorTotal();
        console.log(`\n\nValor total do estoque: R$ ${valorTotal.toFixed(2)}\n\n`);
    } catch(error){
        console.error("\n\nErro ao calcular o valor total do estoque\n\n", error);
    }
}

export async function exibirPesoTotal(): Promise<void>{
    try{
        const pesoTotal = await estoqueService.calcularPesoTotal();
        console.log(`\n\nPeso total do estoque: ${pesoTotal.toFixed(2)} kg\n\n`);
    } catch(error){
        console.error("\n\nErro ao calcular o peso total do estoque\n\n", error);
    }
}

export async function exibirMediaValor(): Promise<void>{
    try{
        const media = await estoqueService.calcularMediaValor();
        console.log(`\n\nMedia dos valores dos itens do estoque: R$ ${media.toFixed(2)}\n\n`);
    } catch(error){
        console.error("\n\nErro ao calcular a media dos valores dos itens do estoque: ", error);
    }
}

export async function exibirMediaPeso(): Promise<void> {
    try{
        const media = await estoqueService.calcularMediaPeso();
        console.log(`\n\nMedia dos pesos dos itens do estoque: ${media.toFixed(2)} kg\n\n`);
    } catch(error){
        console.error("\n\nErro ao calcular a media dos pesos dos itens do estoque: ", error);
    }
}

export async function exibirQuantidadeTotalDeItens(): Promise<void> {
    try{
        const quantidadeTotal = await estoqueService.calcularQuantidadeTotalDeItens();
        console.log(`\n\nQuantidade total de itens no estoque: ${quantidadeTotal}\n\n`);
    } catch(error){
        console.log("\n\nErro ao exibir quantidade total de itens do estoque: ", error);
    }
}

export async function exibirQuantidadeTotalDeProdutos(): Promise<void>{
    try{
        const quantidadeTotal = await estoqueService.calcularQuantidadeTotalDeProdutos();
        console.log(`\n\nQuantidade de produtos(unicos) no estoque: ${quantidadeTotal}\n\n`);
    } catch(error){
        console.log("\n\nErro ao exibir quantidade total de produtos do inventario: ", error);
    }
}
