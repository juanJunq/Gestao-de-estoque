import writeCSV from "../model/writeCSV";
import readCSV from "../model/readCSV";
import { Data } from "../model/interfaceData";
import fs, { existsSync, read, readFileSync, writeFile } from 'fs';
import { error } from "console";

const filePath = './model/estoque.csv';

export default class EstoqueService {
    async criar(data: Data) {
        if (typeof data.nome !== 'string' ||
            isNaN(data.peso) || data.peso <= 0 ||
            isNaN(data.valor) || data.valor <= 0 ||
            isNaN(data.quantidade) || data.quantidade <= 0) {
            throw new Error("Dados invalidos");
        }
        if (!existsSync(filePath)) {
            await writeCSV(filePath, []);
        }
        const dadosExistentes: Data[] = (await readCSV(filePath))
            .filter(item => item.nome && item.peso && item.valor && item.quantidade);
        const nomesExistentes = dadosExistentes.map((item) => item.nome.toLowerCase().trim());
        if (nomesExistentes.includes(data.nome.toLowerCase().trim())) {
            throw new Error("Item ja existente");
        }
        dadosExistentes.push(data);
        await writeCSV(filePath, dadosExistentes);
    }
    async buscar(nome: string): Promise<Data | null> {
        if (!fs.existsSync(filePath)) {
            throw new Error("Arquivo nao encontrado");
        }
        const produtos = await readCSV(filePath);
        return produtos.find(
            produto => produto.nome.toLowerCase().trim() === nome.toLowerCase().trim()) || null;
    }
    async remover(nome: string): Promise<void> {
        if (!fs.existsSync(filePath)) {
            throw new Error("Arquivo nao encontrado");
        }
        const produtos = await readCSV(filePath);
        const produtosFiltrados = produtos.filter(
            produto => produto.nome.toLowerCase().trim() !== nome.toLowerCase().trim()
        );
        if (produtos.length === produtosFiltrados.length) {
            throw new Error("Produto nao encontrado");
        }
        await writeCSV(filePath, produtosFiltrados);
    }
    async listar(): Promise<Data[]> {
        if (!fs.existsSync(filePath)) {
            throw new Error("Arquivo nao encontrado");
        }
        const produtos = await readCSV(filePath);
        return produtos;
    }
    async calculaValorTotal(): Promise<number> {
        if (!fs.existsSync(filePath)) {
            throw new Error("Arquivo nao encontrado");
        }
        const produtos = await readCSV(filePath);
        if (produtos.length === 0) {
            throw new Error("Estoque vazio");
        }
        const valorTotal = produtos.reduce((soma, produto) => {
            const valorProduto = produto.valor * produto.quantidade;
            return soma + (isNaN(valorProduto) ? 0 : valorProduto);
        }, 0);
        return valorTotal;
    }
    async calcularPesoTotal(): Promise<number> {
        if (!fs.existsSync(filePath)) {
            throw new Error("Arquivo nao encontrado");
        }
        const produtos = await readCSV(filePath);
        if (produtos.length === 0) {
            throw new Error("Estoque vazio");
        }
        const pesoTotal = produtos.reduce((soma, produto) => {
            const pesoProduto = produto.peso * produto.quantidade;
            return soma + (isNaN(pesoProduto) ? 0 : pesoProduto);
        }, 0);
        return pesoTotal;
    }
    async calcularMediaValor(): Promise<number> {
        if (!fs.existsSync(filePath)) {
            throw new Error("Arquivo nao encontrado");
        }
        const produtos = await readCSV(filePath);
        if (produtos.length === 0) {
            throw new Error("Estoque vazio");
        }
        const somaValores = produtos.reduce((total, produto) => {
            return total + produto.valor * produto.quantidade;
        }, 0);
        const totalItens = produtos.reduce((total, produto) =>
            total + produto.quantidade, 0);
        return somaValores / totalItens;
    }
    async calcularMediaPeso(): Promise<number>{
        if(!fs.existsSync(filePath)){
            throw new Error("Arquivo de estoque nao encontrado");
        }
        const produtos = await readCSV(filePath);
        if(produtos.length === 0){
            throw new Error("Estoque vazio");
        }
        const somaPesos = produtos.reduce((total, produto) => {
            return total + produto.peso * produto.quantidade;
        }, 0);
        const totalItens = produtos.reduce((total, produto) =>
            total + produto.quantidade, 0);
        return somaPesos / totalItens;
    }
    async calcularQuantidadeTotalDeItens(): Promise<number>{
        if(!fs.existsSync(filePath)){
            throw new Error("Arquivo nao encontrado");
        }
        const produtos = await readCSV(filePath);
        if(produtos.length === 0){
            throw new Error("Estoque vazio");
        }
        const quantidadeTotal = produtos.reduce((soma, produto) => {
            const quantidadeProduto = produto.quantidade;
            return soma + (isNaN(quantidadeProduto) ? 0 : quantidadeProduto);
        }, 0);
        return quantidadeTotal;
    }
    async calcularQuantidadeTotalDeProdutos(): Promise<number>{
        if(!fs.existsSync(filePath)){
            throw new Error("Arquivo nao encontrado");
        }
        const produtos = await readCSV(filePath);
        if(produtos.length === 0){
            throw new Error("Estoque vazio");
        }
        const produtosUnicos = new Set(produtos.map(produto => produto.nome.toLowerCase().trim()));
        return produtosUnicos.size;
    }
}