const chalk = require("chalk")

const nota = 4

if(nota >= 7){
    console.log(chalk.green("Parabens voce esta aprovado"))
}else{
    console.log(chalk.bgRed.black("Que pena, voce foi reprovado! nota abaixo da media"))
}
