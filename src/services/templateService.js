import { existsSync, outputFileSync } from 'fs-extra';
import chalk from 'chalk';
import errorMsg from '../messages/errorMessages'
import replace from 'replace';

export function onGenerateComponent(componentTemplates) {
  for (let i = 0; i < componentTemplates.length; i++) {
    const { template, templateType, componentPath, componentName } = componentTemplates[i];

    if (existsSync(componentPath)) {
      console.error(chalk.red(`${templateType} ${errorMsg.onCheckComponentBeignInPathPartial} ${componentPath}".`));
    } else {
      try {
        outputFileSync(componentPath, template);
        const replaceDefaultOptions = {
          regex: 'TemplateName',
          replacement: componentName,
          paths: [componentPath],
          recursive: false,
          silent: true,
        };
        replace(replaceDefaultOptions);
        
        console.log(chalk.green(`${templateType}`), chalk.keyword('orange')(`-->`) , chalk.magenta(`${componentPath}`))
      } catch (error) {
        console.error(chalk.red(`${templateType} ${errorMsg.onCreateComponentPartial}`));
      }
    }
  }
}