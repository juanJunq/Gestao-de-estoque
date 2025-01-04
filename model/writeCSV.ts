import { createObjectCsvWriter as createCsvWriter} from 'csv-writer';
import { Data } from "./interfaceData";

export const writeCSV = async (filePath: string, data: Data[]): Promise<void> => {
    const csvWriter = createCsvWriter({
        path: filePath,
        header: [
            {id: 'nome', title: 'Nome'},
            {id: 'peso', title: 'Peso'},
            {id: 'valor', title: 'Valor'},
            {id: 'quantidade', title: 'Quantidade'}
        ],
    });
    return csvWriter.writeRecords(data);
};

export default writeCSV;