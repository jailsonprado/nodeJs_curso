// Mais de um valor
const x = 10;
const y = "Jailson";
const z = [1, 2];

console.log(x, y, z);

//contagem de impressoes
console.count(`O valor de x eh: ${x}, contragem:`);
console.count(`O valor de x eh: ${x}, contragem:`);
console.count(`O valor de x eh: ${x}, contragem:`);
console.count(`O valor de x eh: ${x}, contragem:`);
console.count(`O valor de x eh: ${x}, contragem:`);

// Variavel entre string
console.log("O nome eh %s, ele eh programador", y);

// Limpar console
setTimeout(() => {
  console.clear()
}, 2000);
