import fs from 'fs';
import csv from 'csv-parser';
import { Data } from "./interfaceData";

export const readCSV = async (filePath: string): Promise<Data[]> =>{
    return new Promise((resolve, reject) => {
        const results: Data[] = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => 
                results.push({
                    nome: data['Nome'],
                    peso: Number(data['Peso']),
                    valor: Number(data['Valor']),
                    quantidade: Number(data['Quantidade'])
                }))
            .on('end', () => resolve(results))
            .on('error', (error) => reject(error));
    });
};

export default readCSV;