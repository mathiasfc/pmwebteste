//Pega o terceiro parâmetro da linha de comando, se não for informado, padrão = chrome.
var navegador = ((process.argv[2])?process.argv[2]:"chrome");

var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var driver = new webdriver.Builder()
    .forBrowser(navegador)
    .build();

driver.get('http://demo.letsbook.com.br/D/Reserva?cidade=NYC');

var script = `
var corPrimaria = '#f6534d';
var corSecundaria = '#201f1d';

//Header
ajustaElementosCabecalho();
ajustaDatePickerCalendario();
ajustaSeletoresCriancasEAdultos();
//Body
ajustaCorpoDoSite();
//Footer
ajustaFooter();
//ModalPromocoes
criaModalPromocoes();

function ajustaElementosCabecalho(){
	$('#navTop').css('background-color',corPrimaria); 	
	$('#navContent img').attr('src','https://imgur.com/tRUAE2b.png').css('top','35px');
	$('.mcolor-label-text2').css('color',corPrimaria);
	$(document).scroll(function() {
		$('#busca-flutuante-icon-adultos').css('color',corPrimaria);
		$('.bloco-seletor-adulto-selected').attr('style','background-color:#493e39 !important;');
		$('.bloco-seletor-crianca-selected').attr('style','background-color:#493e39 !important;');
	});
	$('#caminhoPasso2 a').html('ESCOLHER HOTÉIS:');
	$('.caminho-pagina-atual').attr('style','text-decoration:none !important');
	$('.mcolor-busca-bright').attr('background-color','#493e39');
	$('.mcolor-label-text').css('color',corPrimaria);
	$('.mcolor-busca-dark').css('background-color',corSecundaria);
	$('.mcolor-cliente-principal-bg').css('background-color','#312d29');
	$('#caminhoPasso1 a').css('text-decoration','underline');
	$('#busca-fechada-container').css('background-color','#493e39');
	$('#criancas-label-container .criancas-editar-container span').eq(0).html('<u>Editar</u>');
	$('#busca-promocode-label').css('color','white');
	$('#busca-btn').css('background-color',corPrimaria);
	$('#caminhoPasso3').empty();
	$('#numeroNoites').css('font-weight','100');
	$('#caminhoPasso3').append('<span style="margin-left:5px; color:white; font-weight: normal;">'+$('.itemBtnEfetuarReserva').length+' disponíveis.</span>');
	$('#container-seletor-crianca-idades').css('width','258px');
	$('.seletor-idade').css('border','0.1px solid #f6534d');
}

//DatePicker - Calendário
function ajustaDatePickerCalendario(){
	$('#periodo-label-dias').css('font-size','15px')
	$('.dia-semana').attr('style','color:white !important');
	$('.arrow-left').css('border-right-color','white');
	$('.arrow-right').css('border-left-color','white');
	$('#alerta-best-rates').remove();
	//$('#busca-calendario').css('width','450px').css('height','360px');
	defineEstilosEMedidasDoCalendario();
	$('#calendario-1').css('width','auto').css('margin-left','0px').css('padding-top','25px');
	$('#calendario-2').remove();

	$('<div id="leftArrowBorder" class="arrowBorder" style="position:absolute; cursor:pointer; top:110px; left:0px; height:90px; background-color:#493e38; width:33px"></div>').insertBefore('.arrow-left');
	$('#leftArrowBorder').append($('.arrow-left'));
	$('.arrow-left').css('top','33px').css('left','10px');
	$('<div id="rightArrowBorder" class="arrowBorder" style="position:absolute; cursor:pointer; top:110px; right:0px; height:90px; background-color:#493e38; width:33px"></div>').insertBefore('.arrow-right');
	$('#rightArrowBorder').append($('.arrow-right'));
	$('.arrow-right').css('top','33px').css('right','10px');
	bindNovosEventosCalendario();

	$('#busca-periodo-label').click(function(){
		defineEstilosEMedidasDoCalendario();
	});

	//Ajusta o preço p/ cada data no calendário.
	var bAjustouPreco = false;
	$('#calendario-1').on('DOMNodeInserted', '.bestRate', function () {
		if(!bAjustouPreco){
			AjustaEstiloDataBetweenCalendario();
			bAjustouPreco = true;
			setTimeout(function(){
				$('span[class*="fadeIn"]').each(function( index ) {
					if($(this).html){
						$(this).html('R$'+$(this).html().substring(0,$(this).html().indexOf(',')));
						$(this).attr('style','font-size:10px; color:grey !important');	
					}
				});
				bAjustouPreco = false;
			}, 100);
		}
	});
}

function AjustaEstiloDataBetweenCalendario(){
	var estiloStartEndDate = '-moz-border-radius: 100px; -webkit-border-radius: 100px; border-radius: 100px; background-color:#f6534d !important;'
	$('.celulaData').hover(function() {
		$('.celulaData').each(function(index,element) {
			if($('.inBetweenDate').length == 1){
				$('.startDate').attr('style',estiloStartEndDate);
					$(this).attr('style',$(this).attr('style')+'opacity:1 !important;background-color:initial !important;width:initial !important; border:initial !important; margin-left:initial; padding-right:initial;');
			}
			else if($('.inBetweenDate').length == 2){
				$('.startDate').attr('style',estiloStartEndDate);
				$('.inBetweenDate:last').attr('style',estiloStartEndDate);
				$(this).attr('style',$(this).attr('style')+'opacity:1 !important;background-color:initial !important;width:initial !important; border:initial !important; margin-left:initial; padding-right:initial;');
			}else if($('.inBetweenDate').length == 3){
				$('.startDate').attr('style',estiloStartEndDate);
				$('.startDate').parent().next().find('.celulaData').attr('style','opacity:1 !important;background-color:#493e38 !important; width:95px !important; margin-left:-25px;');
				$('.inBetweenDate:last').attr('style',estiloStartEndDate);
				$(this).attr('style',$(this).attr('style')+'opacity:1 !important;background-color:initial !important;width:initial !important; border:initial !important; margin-left:initial; padding-right:initial;');
			}else{
				if($(this).hasClass('inBetweenDate')){
					$('.startDate').attr('style',estiloStartEndDate);
					$('.startDate').parent().css('z-index','1');
					$(this).attr('style','opacity:1 !important;background-color:#493e38 !important;width:46px !important;'); 
					$('.inBetweenDate:last').attr('style',estiloStartEndDate);
					
					$('.startDate').parent().next().find('.celulaData').attr('style','opacity:1 !important;background-color:#493e38 !important; width:95px !important; margin-left:-25px;');
					$('.inBetweenDate:last').parent().prev().find('.celulaData').attr('style','opacity:1 !important;background-color:#493e38 !important; width:45px; padding-right:25px;');
				}else{
					//Pega todos os blocos depois do periodo de data selecionado
					$(this).attr('style',$(this).attr('style')+'opacity:1 !important;background-color:initial !important;width:initial !important; border:initial !important; margin-left:initial; padding-right:initial;'); 										
				}
			} 
		});
	});
	
	$('.celulaData').click(function() {
		$('.startDate').attr('style',estiloStartEndDate);
	});
}

function defineEstilosEMedidasDoCalendario(){
	$('.dia-semana').attr('style','color:white !important; width:46px;');
	$('.blocoData').css('height','42px').css('width','42px').css('padding','2px');
	$('#busca-calendario').attr('style', $('#busca-calendario').attr('style') + 'border:1px solid #201f1d !important; border-color: #201f1d !important;' );
	$('.diaMes').css('font-size','14px');
	
	//Ajusta tooltip calendário
	$('.calendario-tooltip').css('background-color','#493e38');
	$('.calendario-tooltip').each(function() {
		$(this).eq(0).children().eq(0).insertBefore($(this).eq(0).children().eq(4));
	});
	$('.tp-chegada,.tp-saida').css('color','#ada9a8');
	
	//Ajusta altura do calendário
	if($('.gridDatas .gridRow').eq(5).children().eq(0).html()){
		$('#busca-calendario').css('width','450px').css('height','370px');
	}else{
		$('#busca-calendario').css('width','450px').css('height','335px');
	}
}

function bindNovosEventosCalendario(){
	$('#leftArrowBorder').click(function(){
		defineEstilosEMedidasDoCalendario();
	});
	
	$('#rightArrowBorder').click(function(){
		defineEstilosEMedidasDoCalendario();
	});
}

function ajustaSeletoresCriancasEAdultos(){
	//Remove borde se idade da criança for selecionada.
	$('.bloco-seletor-crianca,.seletor-crianca-mais-option-item').on('click',function(){
		$('#container-seletor-crianca-idades').children().click(function(){
			$(this).css('border','none');
		});	
	});
	
	//Insere borda se número de crianças for alterado.
	$('.criancas-editar-label').click(function(){
		$('.seletor-idade').css('border','0.1px solid #f6534d');
	});
	
	//Atualiza cor de fundo do item "Quantos Adultos"
	$('.bloco-seletor-adulto').on('click',function(){
		$('#container-seletor-adultos').children().attr('style','background-color:#303131 !important');
		$('#container-seletor-adultos').children().eq(2).find('span').attr('style','background-color:#303131 !important');
		$(this).attr('style','background-color:#493e39 !important');
	});
	
	$('.seletor-adulto-mais-option-item').on('click',function(){
		$('#container-seletor-adultos').children().attr('style','background-color:#303131 !important');
		$(this).parent().siblings().attr('style','background-color:#493e39 !important');
	});
}

function ajustaCorpoDoSite(){
	var h1 = $('.itemHotel').eq(0).clone();
	var h2 = $('.itemHotel').eq(1).clone();
	var h3 = $('.itemHotel').eq(2).clone();
	$('.page-content').remove();
	$('#content').css('background-color','#f3f3f3');
	$('#listagemHoteis').css({
		display: 'flex',
		'padding-top': '40px',
		'margin-bottom': '40px'
	});
	var divHotel = '<div class="item-hotel" style="height: 485px; width: 255px; box-shadow: #e0e0e0 0px 6px 20px 1px; border-radius: 10px; background-color: #fff; padding:20px;"></div>';
	$('#listagemHoteis').append(divHotel,divHotel,divHotel);
	var h1NovoModelo = $('#listagemHoteis').children().eq(0);
	var h2NovoModelo = $('#listagemHoteis').children().eq(1);
	var h3NovoModelo = $('#listagemHoteis').children().eq(2);
	
	h1NovoModelo.css('margin-left','25px');
	h2NovoModelo.css('margin-left','25px').css('margin-right','25px');
	
	//Adciona e ajusta as imagens dos hotéis, slider parou de funcionar.
	h1NovoModelo.append(h1.find('.slider-imagens-hotel,.galeria-fotos,.slick-initialized,.slick-slider'),h1.find('.item-hotel-galeria'));
	//h2NovoModelo.append(h2.find('.slider-imagens-hotel,.galeria-fotos,.slick-initialized,.slick-slider'),h2.find('.item-hotel-galeria'));
	h2NovoModelo.append(h2.find('.varImgHotel'));
	h3NovoModelo.append(h3.find('.varImgHotel'));
	$('.varImgHotel').attr('style','height: 229px; width: 255px;');
	
	$('.img-hotel-arrow-left').css('padding-left','0px');
	$('.img-hotel-arrow-left,.img-hotel-arrow-right').css('width','30px');
	$('.img-hotel-arrow-left,.img-hotel-arrow-right').css('background-color','rgba(0, 0, 0, 0.60)');
	
	$('.img-hotel-arrow-right').css('left','225px');
	$('.img-hotel-arrow-right').css('padding-right','0px');
	
	var imgLeft = "<img src='https://i.imgur.com/kb5T9uH.png' style='width:auto; height:auto; margin-left: 6px; margin-top: 21px; position: absolute;'></img>";
	var imgRight = "<img src='https://i.imgur.com/nuKUDV6.png' style='width:auto; height:auto; margin-left: -15px; margin-top: 21px; position: absolute;'></img>";
	$('.img-hotel-arrow-left').html(imgLeft);
	$('.img-hotel-arrow-right').html(imgRight);
	
	//Adiciona as informações dos hotéis.
	h1NovoModelo.append(h1.find('.itemHotelContent'));
	h2NovoModelo.append(h2.find('.itemHotelContent'));
	h3NovoModelo.append(h3.find('.itemHotelContent'));
	
	$('.itemHotelContent').css({
		height: 'auto',
		'margin-left': '0px'
	});
	
	$('.tituloHotel').css({
		'margin-top': '15px',
		width: '100%'
	});
	
	//$('.tituloHotel').css('margin-top','15px');
	//$('.tituloHotel').css('width','100%');
	$('.itemVarNomeHotel').css('font-size','16px');
	$('.itemVarEnderecoHotel').css('margin-right','6px');
	
	$('.itemVarTelefoneHotel').css({
		display: 'inline-block',
		'margin-left': '-1px'
	});
	//$('.itemVarTelefoneHotel').css('display','inline-block');
	//$('.itemVarTelefoneHotel').css('margin-left','-1px');
		
	$('.infoHotel').css('padding-top','15px').css('float','inherit');
	$('.mcolor-cliente-principal-text').css('color',corPrimaria);
	$('.itemBtnSelecionarAcomodacao').remove();
	
	$('.infoAcomodacao').css('margin-top','10px');
	$('.itemAcomodacao').css('color','#565656');
	
	$('.hoteis-ico-mais-pessoas').css({
		position: 'absolute',
		top: '0px',
		left: '25px',
		'margin-right': '10px'
	});
	
	$('.itemVarDescricaoAcomodacao').css({
		'margin-left': '53px',
		'margin-top': '0px'
	});

	$('.itemVarNomeAcomodacao').css({
		position: 'absolute',
		'margin-left': '28px',
		'margin-top': '-1px'
	});

	$('.itemBtnMaisAcomodacoes').css({
		'margin-top': '15px',
		'margin-left': '45px',
		color: corPrimaria
	});

	$('.itemBtnMaisAcomodacoes').html("Ver promoções do hotel");
	$('.itemBtnMaisAcomodacoes').attr('onclick','$("#modificar-dados-modal-overlay").fadeIn(200); $("#modificar-dados-modal").attr("style","left:42%; width:800px !important;"); buscaIdEmpresa($(this))');
	
	$('.hotel-indisponivel-ico').css('margin-top','-10px');
	$('.hotel-indisponivel-texto-container').css('margin-top','-20px');
	
	$('.blocoReserve').css('float','right').css('position','initial').css('width','100%').css('margin-top','22px');
	$('.valorContainer .itemVarPercentualDesconto,.itemVarDescricaoFormasPagamento').remove();
	$('.valorContainer').css('position','absolute').css('margin-top','20px');
	$('.itemVarValorSemDesconto').css('float','left').css('width','auto').css('color','#989898');
	$('.itemBtnEfetuarReserva').css('background-color','#fc5b49').css('margin-top','3px').css('font-size','15px');
}

function ajustaFooter(){
	$('#buscarNovamente').css({
		'border-top': 'none',
		'background-color': '#f3f3f3'
	});
	$('#btnOutraBusca').css('color',corPrimaria);
	$('#buscarNovamente #paragrafo h1').css('margin-top','60px');
}


function criaModalPromocoes(){
	//Cria um hiddenfield p/ armazenar o ID do hotel que possui as promoções
	$('<input>').attr({
		type: 'hidden',
		id: 'hfHotelID'
	}).appendTo('#content');
	
	//Utiliza uma modal existente para criar a modal de promoções
	$('#modificar-dados-conteudo').empty();	
	$('#modificar-dados-conteudo').css('max-height','350px');
	$('#modificar-dados-conteudo').css('height','auto').css('overflow-y','scroll').css('margin-left','60px').css('margin-right','50px').css('border','1px solid black').css('padding-left','5px');
	var title = '<div class="div-titulo-promocoes" style="width:100%; padding-left:60px; text-align:left; margin-top:30px;"><span id="titulo-modal-promocoes" style="font-size:23px; display: inline-block; margin-left: -15px; font-weight:bold; transform: scale(.8, 1);">PROMOÇÕES</span></div>';
	$(title).insertBefore($('#modificar-dados-conteudo'));
	var itemPromocao = '<div class="itemPromocao" style="width:220px; height:175px; border:1px dotted black; float:left;"></div>';
	$('#modificar-dados-conteudo').append(itemPromocao);
	$('#modificar-dados-conteudo').append(itemPromocao);
	$('#modificar-dados-conteudo').append(itemPromocao);
	$('#modificar-dados-conteudo').append(itemPromocao);
	$('#modificar-dados-conteudo').append(itemPromocao);
	$('#modificar-dados-conteudo').append(itemPromocao);
	$('#modificar-dados-conteudo').append(itemPromocao);
	$('#modificar-dados-conteudo').append(itemPromocao);
	$('#modificar-dados-conteudo').append(itemPromocao);
	
	$('.itemBtnMaisAcomodacoes').click(function(){
		buscaDadosPromocao();
	});
}

//Busca o identificador da empresa através do atributo 'onClick' do elemento infoHotel.
function buscaIdEmpresa(el){
	var onclickScript = el.siblings().eq(1).attr('onclick');
	var id = onclickScript.substring(onclickScript.indexOf('(')+1,onclickScript.indexOf(','));
	$("#hfHotelID").val(id);
}

function buscaDadosPromocao(){
	var url = 'http://pmweb.agencia.pmweb.com.br/teste-cro/promocoes/'+$("#hfHotelID").val();+'.json'
	$.get(url,function(data){ 
		alert(data);
	});
}
`

//Executa script com modificações
driver.sleep(4000);
driver.executeScript(script);


//Executa script para mostrar a página
driver.sleep(1000);
driver.executeScript("$('#modificarBusca').click();");
driver.sleep(1500);
driver.executeScript("$('#busca-periodo-label').click();");
driver.sleep(1500);
driver.executeScript("$('.arrow-right').click();");
driver.sleep(1500);
driver.executeScript("$('.arrow-right').click();");
driver.sleep(2500);
driver.executeScript("$('.celulaData').eq(14).click();");
driver.sleep(1500);
driver.executeScript("$('.celulaData').eq(20).click();");
driver.sleep(2500);
driver.executeScript("$('#modificarBusca').click();");
driver.sleep(2500);
driver.executeScript("window.scrollBy(0,150)", "");
driver.sleep(500);
driver.executeScript("$('.itemBtnMaisAcomodacoes').click();");
driver.sleep(2500);
driver.executeScript("$('#modificar-dados-modal-close').click();");
driver.sleep(10000);

driver.quit();