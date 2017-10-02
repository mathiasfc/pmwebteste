//Pega o terceiro parâmetro da linha de comando, se não for informado, padrão = chrome.
var navegador = ((process.argv[2])?process.argv[2]:"chrome");

var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var driver = new webdriver.Builder()
    .forBrowser(navegador)
    .build();

var fs = require('fs');

driver.get('http://demo.letsbook.com.br/D/Reserva?cidade=NYC');

//Executa script com modificações
driver.sleep(4000);
var script = fs.readFileSync('script.js', 'utf8');
driver.executeScript(script);

//Executa ações para mostrar a página
//Teste inciado.
driver.sleep(1000);
for(var i=0;i<50;i++) {driver.executeScript("window.scrollBy(0,-1)", "");}
driver.sleep(1000);
driver.executeScript("$('#modificarBusca').click();");
driver.sleep(1500);
driver.executeScript("$('#busca-periodo-label').click();");
driver.sleep(1500);
driver.executeScript("$('.arrow-right').click();");
driver.sleep(1500);
driver.executeScript("$('.arrow-right').click();");
driver.sleep(3000);
driver.executeScript("$('.celulaData').eq(14).click();");
driver.sleep(1500);
driver.executeScript("$('.celulaData').eq(20).click();");
driver.sleep(2500);
driver.executeScript("$('#modificarBusca').click();");
driver.sleep(2500);
for(var i=0;i<150;i++) {driver.executeScript("window.scrollBy(0,1)", "");}
driver.sleep(500);
driver.executeScript("$('.itemBtnMaisAcomodacoes').click();");
driver.sleep(3000);
for(var i=0;i<800;i++) {driver.executeScript("document.getElementById('modificar-dados-conteudo').scrollBy(0,1)", "");}
driver.sleep(3000);
driver.executeScript("$('#modificar-dados-modal-close').click();");
driver.sleep(1000);
for(var i=0;i<150;i++) {driver.executeScript("window.scrollBy(0,-1)", "");}
driver.sleep(5000);

//Teste finalizado.
driver.quit();

