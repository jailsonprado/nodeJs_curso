const x = 10;

// checar se x eh um numero
if (!Number.isInteger(x)) {
    throw new Error("O valor de x nao eh um numero inteiro!")
}

console.log("Continuando o codigo....")

