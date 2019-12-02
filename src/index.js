import chalk from 'chalk';
import program from 'commander';
import { generateComponent } from './actions/componentActions';
import { onGenerateConfigs } from './services/configService';

export async function interfacePrompt(args) {
  let commandNotFound = true;
  const { component } = await onGenerateConfigs();

  program
    .command('component <name>')
    .alias('c')
    .option('-p, --path', '', component.path)
    .option('-s, --hasStyle','',component.hasStyle)
    .option('-l, --hasLogic','',component.hasLogic)
    .action((componentName, cmd) => generateComponent(componentName, cmd, component))
    .action(() => (commandNotFound = false));

  program.parse(args);

  if (commandNotFound) {
    console.error(chalk.red('Command not found.'));
    console.log(`Run ${chalk.green('generate-react --help')} to see a list of the commmands you can run.`);
    process.exit(1);
  }
}