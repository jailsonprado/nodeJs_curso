const inquirer = require("inquirer");
const chalk = require("chalk");

inquirer
  .prompt([
    {
      name: "nome",
      message: "Qual seu nome?",
    },
    {
      name: "idade",
      message: "Qual sua idade?",
    },
  ])
  .then((answers) => {
    const resposta = `O nome do ususario eh ${answers.nome} e sua idade eh ${answers.idade}`;
    console.log(resposta);
    console.log(chalk.bgYellow.black(resposta));
  })
  .catch((err) => console.log(`Erro: ${err}`));
