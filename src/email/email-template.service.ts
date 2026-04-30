import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as Handlebars from 'handlebars';

@Injectable()
export class EmailTemplateService {
  private templateCache = new Map<string, Handlebars.TemplateDelegate>();

  render(templateName: string, context: Record<string, unknown>): string {
    let template = this.templateCache.get(templateName);

    if (!template) {
      const templatePath = path.join(
        process.cwd(),
        'src/email/templates',
        `${templateName}.hbs`,
      );

      const templateSource = fs.readFileSync(templatePath, 'utf-8');

      template = Handlebars.compile(templateSource);

      this.templateCache.set(templateName, template);
    }

    return template(context);
  }
}
