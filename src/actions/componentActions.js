import chalk from 'chalk';
import { onGenerateComponent } from '../services/templateService';
import componentClassTemplate from '../templates/componentClassTemplate';
import componentFunctionalTemplate from '../templates/componentFunctionalTemplate';
import componentLogicTemplate from '../templates/componentLogicTemplate';
import componentStyleTemplate from '../templates/componentStyleTemplate';

export function generateComponent(componentName, cmd, componentConfig) {
  const componentNameLowered = componentName.charAt(0).toLowerCase() + componentName.slice(1);
  const path = `src/${componentConfig.path}/${componentNameLowered}`;
  let suffix = componentConfig.path;
  suffix = suffix.charAt(0).toUpperCase() + suffix.slice(1)
  const componentSuffix = componentConfig.path === 'core-components' ? '' : suffix;

  if (!componentName.match(/^[A-Za-z]+$/)) {
    console.error(chalk.red.bold('ERROR: Component name should contain only letters'));
    return;
  }

  const componentTemplates = [];


  if (componentConfig.type.toString() === 'class') {
    componentTemplates.push({
      template: componentClassTemplate,
      templateType: `Class:"${componentName}${componentSuffix}.js"`,
      componentPath: `${path}/${componentName}${componentSuffix}.js`,
      componentName
    });
  }

  if (componentConfig.type.toString() === 'function') {
    componentTemplates.push({
      template: componentFunctionalTemplate,
      templateType: `Fn:"${componentName}${componentSuffix}.js"`,
      componentPath: `${path}/${componentName}${componentSuffix}.js`,
      componentName
    });
  }

  if (componentConfig.hasStyle.toString() === 'true') {
    componentTemplates.push({
      template: componentStyleTemplate,
      templateType: `Style:"${componentName}Style.js"`,
      componentPath: `${path}/${componentName}Style.js`,
      componentName
    });
  }

  if (cmd.hasLogic.toString() === 'true') {
    componentTemplates.push({
      template: componentLogicTemplate,
      templateType: `Logic:"${componentName}Logic.js"`,
      componentPath: `${path}/${componentName}Logic.js`,
      componentName
    });
  }

  onGenerateComponent(componentTemplates);
}
