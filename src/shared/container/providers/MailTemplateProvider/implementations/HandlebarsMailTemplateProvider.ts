import handlebars from 'handlebars';
// Utilizaremos o fs do node pra ler os dados do arquivo
import fs from 'fs';

import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';
import IMailTemplateProvider from '../models/IMailTemplateProvider';

class HandlebarsMailTemplateProvider implements IMailTemplateProvider {
  public async parse({
    // E agora receberá file
    file,
    variables,
  }: IParseMailTemplateDTO): Promise<string> {
    // E agora vamos trabalhar no arquivo para lê-lo
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });

    // E agora vamos compilar o templateFileContent
    const parseTemplate = handlebars.compile(templateFileContent);

    return parseTemplate(variables);
  }
}

export default HandlebarsMailTemplateProvider;
