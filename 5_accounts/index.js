// Modulos externos
const inquirer = require("inquirer");
const chalk = require("chalk");

// Moduo interno
const fs = require("fs");

// console.log("iniciando o primeiro projeto Accounts");

operation();

function operation() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        choices: [
          "Criar conta",
          "Depositar",
          "Consultar saldo",
          "Sacar",
          "Sair",
        ],
      },
    ])
    .then((answer) => {
      const action = answer["action"];
      if (action === "Criar conta") {
        createAccount();
      } else if (action == "Depositar") {
        deposito();
      } else if (action === "Consultar saldo") {
        getAccountBalance();
      } else if (action === "Sacar") {
        withdraw();
      } else if (action === "Sair") {
        console.log(chalk.bgBlue.black("Obrigado por usar o Accounts"));
        process.exit();
      }
    })
    .catch((err) => console.log(err));
}

// Create an account

function createAccount() {
  console.log(chalk.bgGreen.black("Parabéns por escolher o nosso banco!"));
  console.log(chalk.green("Defina as opcões da sua conta a seguir"));

  buildAccount();
}

function buildAccount() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Digite um nome para sua conta:",
      },
    ])
    .then((answer) => {
      const accountName = answer["accountName"];

      console.info(accountName);

      if (!fs.existsSync("accounts")) {
        fs.mkdirSync("accounts");
      }

      if (fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(
          chalk.bgRed.black("Esta conta ja existe, escolha outra nome!!!")
        );
        buildAccount();
        return;
      }
      fs.writeFileSync(
        `accounts/${accountName}.json`,
        '{"balance": 0}',
        function (err) {
          console.log(err);
        }
      );

      console.log(chalk.green("Parabéns, sua conta foi criada!"));
      operation();
    })
    .catch((err) => console.log(err));
}

// add am amount to user account

function deposito() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Qual nome da sua conta?",
      },
    ])
    .then((answer) => {
      const accountName = answer["accountName"];

      // Verify if account exists
      if (!checkAccount(accountName)) {
        return deposito();
      }

      inquirer
        .prompt([
          {
            name: "amount",
            message: "Quanto voce deseja depositar?",
          },
        ])
        .then((answer) => {
          const amount = answer["amount"];

          // add an amount
          addAmount(accountName, amount);
          operation();
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
}

function checkAccount(accountName) {
  if (!fs.existsSync(`accounts/${accountName}.json`)) {
    console.log(
      chalk.bgRed.black("Esta conta nao existe, escolha outro nome!")
    );
    return false;
  }
  return true;
}

function addAmount(accountName, amount) {
  const accountDate = getAccount(accountName);

  if (!amount) {
    console.log(
      chalk.bgRed.black("Ocorreu um erro, tente novamente mais tarde!")
    );
    return deposito();
  }
  accountDate.balance = parseFloat(amount) + parseFloat(accountDate.balance);

  fs.writeFileSync(
    `accounts/${accountName}.json`,
    JSON.stringify(accountDate),
    function (err) {
      console.log(err);
    }
  );

  console.log(
    chalk.green(`Foi depositado o valor de R$${amount} na sua conta`)
  );
}

function getAccount(accountName) {
  const accountJson = fs.readFileSync(`accounts/${accountName}.json`, {
    encoding: "utf-8",
    flag: "r",
  });
  return JSON.parse(accountJson);
}

// Show account balance
function getAccountBalance() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Qual nome da sua conta?",
      },
    ])
    .then((answer) => {
      const accountName = answer["accountName"];

      // Verify if account exists
      if (!checkAccount(accountName)) {
        return getAccountBalance();
      }

      const accountData = getAccount(accountName);

      console.log(
        chalk.bgBlue.black(
          `Ola, o saldo da sua conta é R$${accountData.balance}`
        )
      );
      operation();
    })
    .catch((err) => console.log(err));
}

// withdraw an amount from user account

function withdraw() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Qual o nome da sua conta?",
      },
    ])
    .then((answer) => {
      const accountName = answer["accountName"];

      if (!checkAccount(accountName)) {
        return withdraw();
      }

      inquirer
        .prompt([
          {
            name: "amount",
            message: "Quanto voce deseja sacar?",
          },
        ])
        .then((answer) => {
          const amount = answer["amount"];
          removeAmount(accountName, amount);
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
}

function removeAmount(accountName, amount) {
  const accountData = getAccount(accountName);

  if (!amount) {
    console.log(
      chalk.bgRed.black("Ocorreu um erro, tente novamente mais tarde...")
    );
    return withdraw();
  }

  if (accountData.balance < amount) {
    console.log(chalk.bgRed.black("Valor indisponivel"));
    return withdraw();
  }

  accountData.balance = parseFloat(accountData.balance) - parseFloat(amount);
  fs.writeFileSync(
    `accounts/${accountName}.json`,
    JSON.stringify(accountData),
    function (err) {
      console.log(err);
    }
  );
  console.log(
    chalk.green(`Foi realizado um saque de R$${amount} da sua conta`)
  );
  operation()
}
