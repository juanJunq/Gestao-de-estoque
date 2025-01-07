import { adicionarProduto, exibirPesoTotal, exibirValorTotal, listarProduto, removerProduto, 
    exibirMediaValor, exibirMediaPeso, exibirQuantidadeTotalDeItens, exibirQuantidadeTotalDeProdutos } from "./controller/controleEstoque";
import { Data } from "./model/interfaceData";
const prompt = require('prompt-sync')({sigint: true});

const main = async() => {
    let entrada: string;
    do{
        console.log("1 - Adicionar Produto");
        console.log("2 - Remover Produto");
        console.log("3 - Listar Produtos do Estoque");
        console.log("4 - Valor Total do Estoque");
        console.log("5 - Peso Total do Estoque");
        console.log("6 - Media dos Valores dos Produtos");
        console.log("7 - Media dos Pesos dos Produtos");
        console.log("8 - Quantidade Total de Itens");
        console.log("8 - Quantidade Total de Produtos");
        console.log("0 - Sair");
        entrada = prompt("Informe acao desejada: ");
        var W = parseInt(entrada, 10);
        switch(W){
            case 1:
                var N = prompt("Nome do produto: ");
                var P = prompt("Peso do produto: ");
                var V = prompt("Valor do produto: ");
                var Q = prompt("Quantidade do produto: ");
                const produto = {
                    nome: N,
                    peso: parseFloat(P),
                    valor: parseFloat(V),
                    quantidade: parseInt(Q, 10)
                } as Data;
                await adicionarProduto(produto);
                break;
            case 2:
                var N = prompt("Nome do produto a ser removido: ");
                await removerProduto(N, (produtoNome) => {
                    const resposta = prompt("Confirmar remocao? (s/n): ");
                    return resposta.toLowerCase() === 's';
                });
                break;
            case 3:
                await listarProduto();
                break;
            case 4:
                await exibirValorTotal();
                break;
            case 5:
                await exibirPesoTotal();
                break;
            case 6:
                await exibirMediaValor();
                break;
            case 7:
                await exibirMediaPeso();
                break;
            case 8:
                await exibirQuantidadeTotalDeItens();
                break;
            case 9:
                await exibirQuantidadeTotalDeProdutos();
                break;
            case 0:
                console.log("Saindo...");
                break;
        }
    } while (W !== 0);
}

main();