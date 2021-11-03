const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question("Qual a sua inguagem preferida?", (language) => {
    if (language === "java") {
        console.log("Mentira")
    }else{
        console.log(`A minha linguagem  preferida eh: ${language}`);
    }
  
  readline.close();
});
