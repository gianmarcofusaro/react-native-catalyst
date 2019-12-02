import chalk from 'chalk';
import { prompt } from 'inquirer';
import errorMsg from '../messages/errorMessages'

const questions = [
  {
    type: 'list',
    name: 'component.path',
    message: 'Component family',
    choices: ['components', 'layouts', 'screens','wrappers'],
  },
  {
    type: 'list',
    name: 'component.type',
    message: 'It\'s a function or class? (functional is preferred)',
    choices: ['function', 'class'],
  },
  {
    type: 'confirm',
    name: 'component.hasStyle',
    message:'Do you want to separate Style?',
  },
  {
    type: 'confirm',
    name: 'component.hasLogic',
    message: 'Do you want to separate Logic?',
  }
];

export async function onGenerateConfigs() {
  try {
    console.log(chalk.keyword('orange')('    ------------------------    '));
    console.log(chalk.keyword('orange')('REACT NATIVE COMPONENT GENERATOR'));
    console.log(chalk.keyword('orange')('    ------------------------    '));
    const answers = await prompt(questions);
    return answers;
  } catch (e) {
    console.error(chalk.red.bold(errorMsg.onCreateComponent));
    process.exit(1);
  }
}