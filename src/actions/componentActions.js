import chalk from 'chalk';
import { onGenerateComponent } from '../services/templateService';
import componentClassTemplate from '../templates/componentClassTemplate';
import componentFunctionalTemplate from '../templates/componentFunctionalTemplate';
import componentLogicTemplate from '../templates/componentLogicTemplate';
import componentStyleTemplate from '../templates/componentStyleTemplate';

export function generateComponent(componentName, cmd, componentConfig) {

  const { path, subfolder } = componentConfig;
  const componentNameLowered = componentName.charAt(0).toLowerCase() + componentName.slice(1);
  const suffix = path.charAt(0).toUpperCase() + path.slice(1,-1);
  const componentSuffix = path === 'core-components' ? '' : suffix;
  const componentSubfolder = subfolder.trim() !== '' ? `${subfolder.trim().toLowerCase()}/` : '';
  const componentPath = `src/${path}/${componentSubfolder}${componentNameLowered}`;


  if (!componentName.match(/^[A-Za-z]+$/)) {
    console.error(chalk.red.bold('ERROR: Component name should contain only letters'));
    return;
  }

  const componentTemplates = [];


  if (componentConfig.type.toString() === 'class') {
    componentTemplates.push({
      template: componentClassTemplate,
      templateType: `Class:"${componentName}${componentSuffix}.js"`,
      componentPath: `${componentPath}/${componentName}${componentSuffix}.js`,
      componentName
    });
  }

  if (componentConfig.type.toString() === 'function') {
    componentTemplates.push({
      template: componentFunctionalTemplate,
      templateType: `Fn:"${componentName}${componentSuffix}.js"`,
      componentPath: `${componentPath}/${componentName}${componentSuffix}.js`,
      componentName
    });
  }

  if (componentConfig.hasStyle.toString() === 'true') {
    componentTemplates.push({
      template: componentStyleTemplate,
      templateType: `Style:"${componentName}Style.js"`,
      componentPath: `${componentPath}/${componentName}Style.js`,
      componentName
    });
  }

  if (cmd.hasLogic.toString() === 'true') {
    componentTemplates.push({
      template: componentLogicTemplate,
      templateType: `Logic:"${componentName}Logic.js"`,
      componentPath: `${componentPath}/${componentName}Logic.js`,
      componentName
    });
  }

  onGenerateComponent(componentTemplates);
}
