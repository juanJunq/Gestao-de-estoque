import writeCSV from "../model/writeCSV";
import readCSV from "../model/readCSV";
import { Data } from "../model/interfaceData";
import fs, { existsSync, read, readFileSync, writeFile } from 'fs';
import { error } from "console";

const filePath = './model/estoque.csv';
const prompt = require('prompt-sync')({sigint: true});

export default class EstoqueService{
    async criar(data: Data){
        if(typeof data.nome !== 'string' || 
            isNaN(data.peso) || data.peso <= 0 ||
            isNaN(data.valor) || data.valor <= 0 || 
            isNaN(data.quantidade) || data.quantidade <= 0)
        {
            throw new Error("Dados invalidos");
        }
        if(!existsSync(filePath)) {
            await writeCSV(filePath, []);
        }
        const dadosExistentes : Data[] = (await readCSV(filePath))
            .filter(item => item.nome && item.peso && item.valor && item.quantidade);
        const nomesExistentes = dadosExistentes.map((item) => item.nome.toLowerCase().trim());
        if(nomesExistentes.includes(data.nome.toLowerCase().trim())){
            throw new Error("Item ja existente");
        }
        dadosExistentes.push(data);
        await writeCSV(filePath, dadosExistentes);
        console.log("\n\nItem adicionado com sucesso\n\n");
    }
    async buscar(nome: string): Promise <Data | null>{
        if(!fs.existsSync(filePath)){
            return null;
        }
        const produtos = await readCSV(filePath);
        return produtos.find(
            produto => produto.nome.toLowerCase().trim() === nome.toLowerCase().trim()) || null;
    }
    async remover(nome: string): Promise <void>{
        if(!fs.existsSync(filePath)){
            throw new Error("Arquivo nao encontrado");
        }
        const produtos = await readCSV(filePath);
        const produtosFiltrados = produtos.filter(
            produto => produto.nome.toLowerCase().trim() !== nome.toLowerCase().trim()
        );
        if(produtos.length === produtosFiltrados.length){
            throw new Error("Produto nao encontrado");
        }
        await writeCSV(filePath, produtosFiltrados);
        console.log("\n\nProduto removido com sucesso\n\n");
    }
}



// const main = async () => {
//     const estoqueService = new EstoqueService();
//     try{
//         const itens : Data[] = await readCSV('./service/input.csv');
//         console.log('Dados lidos', itens);
//         for(const item of itens){
//             try{
//                 await estoqueService.criar(item);
//             } catch(error){
//                 console.error("Erro ao adicionar");
//             }
//         }
//     } catch (error) {
//         console.error('Erro: ', error);
//     }
// };

// main();