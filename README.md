# Pmweb - Teste

Personalização do motor de reserva [Let's Book](https://demo.letsbook.com.br/D/Reserva?cidade=NYC), de acordo com o layout proposto no [Invision](https://invis.io/X5BHNPZ78).

## Começando

Existem duas maneiras para ver a execução dos testes automatizados. 
- A primeira necessita instalação do [Node.js](https://nodejs.org/en/download/) e do [Selenium WebDriver](https://www.npmjs.com/package/selenium-webdriver). 
- A segunda basta abrir via linha de comando o executável.

### Pré-requisitos

1ª maneira: [Node.js](https://nodejs.org/en/download/) e [Selenium WebDriver](https://www.npmjs.com/package/selenium-webdriver) 
```
npm install selenium-webdriver
```

2ª maneira: Apenas abrir executável. Win x64 | Linux x64 | Mac x64.

## Executando os testes

1ª opção: Após ter o selenium e o node corretamente instalados, executar o seguinte comando:

```
node [nome do arquivo javascript] + [nome do navegador]
node teste.js chrome
node teste.js firefox
node teste.js ie
node teste.js MicrosoftEdge
```

2ª opção: Executar o teste.exe através do seguinte comando:

```
[nome do executável] + [nome do navegador]
teste.exe chrome
teste.exe firefox
teste.exe ie
teste.exe MicrosoftEdge
```

### Navegadores suportados

- Google Chrome
- Mozila Firefox
- IE 11
- Edge

*Última versão de todos.

## Executar sem a automatização

Existe um arquivo chamado script.js que contém todo o script que é utilizado nos testes automatizados, basta executá-lo no console do navegador para ver o layout final sem o auxílio do teste automatizado.

## Construído com

O executável foi construído com:

* [Pkg](https://github.com/zeit/pkg) - Package your Node.js project into an executable
