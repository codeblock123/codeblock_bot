
var express = require('express');
var path = require('path');
var request = require('request');
var cheerio = require('cheerio');
const fs = require("fs");
var lookup = require('binlookup')()
const botSetting = JSON.parse(fs.readFileSync("./botSetting.json"));
const Discord = require("discord.js");
const prefix = botSetting.prefix;
var bot = new Discord.Client();
const port = "8000"

bot.on("ready", async () => {
	console.log(`Bot is ready! ${bot.user.username}`);
	
	try{
		let link = await bot.generateInvite(["ADMINISTRATOR"]);

	} catch(e){
		console.log(e.stack)
	}
});

bot.on("message", async message => {
 	if (message.author.bot) return; // always ignore bots!
 	let args = message.content.split(" ");
 	let command = args[0];
 	args = args.slice(1);
 	console.log(command);
 	if (!command.startsWith(prefix)) return;

 	if (command === `${prefix}bin`) {
 		bin = args;
 		var regex = /[0-9]{6}/
		if(!regex.test(bin)){ return message.reply("Erro bin invalida")}
 		
		lookup(bin, function( err, data ){
		if (err)
		    return console.error(err)
			var tipo = JSON.stringify(data.type);
			var bandeira = JSON.stringify(data.scheme)
			 var banco    = JSON.stringify(data.bank.name)	
			 var pais     = JSON.stringify(data.country.name)
			 var sigla     = JSON.stringify(data.country.alpha2)
	 		 var fone     = JSON.stringify(data.bank.phone);

			if (bandeira === '"visa"') {
				var bandeira = 	'"visa"';
				var logo = "https://geradordecartaodecredito.info/wp-content/uploads/2017/03/Visa.png";
		
			}
			
			console.log("Pesquisando bin...\n");
			message.reply("Pesquisando bin..");
			const embed = new Discord.RichEmbed()

			.setTitle("Consulta: " +bin)
			.setThumbnail(logo)
	 		.setColor(0x00B5B5)
	 		.addField("Bandeira","**"+bandeira+"**" )
	 		.addField("Tipo","**"+tipo+"**" )
	 		.addField("Banco","**"+banco+"**" )
	 		.addField("Sigla","**"+sigla+"**")
	 		.addField("Pais","**"+pais+"**" )
	 		.addField("Telefone","**"+fone+"**" )
	 		message.channel.send({embed});
			// promise
			lookup(bin).then(console.log, console.error)
	

		});
 	}
 	if (command === `${prefix}cpf`) {
 		const timeout = ms => new Promise(res => setTimeout(res, ms))
		function convinceMe (convince) {
		  //let unixTime = Math.round(+new Date() / 1000)
		  message.reply("Espere um pouco que eu vou procurara 🔍")
		
		}
		async function delay () {
		  convinceMe('started')
		  
		  await timeout(5000)
		  return
		}

		delay()
		cpf = args;
		console.log(cpf);
		var url = "https://www.armazem239.com.br/api/consultaDocumento.php/?cpf="+cpf+"=&dispositivo=samsung%2520-%2520SM-G930K&sistema=Android4.4.2&versaoApp=2.0.2";
		request(url, function(err, resp, body){
			if (err) {
				console.log(err);
				message.reply("Erro interno")
			}else{
				var json = JSON.parse(body)
				console.log(json)
				var nome = JSON.stringify(json.pessoa.nome)
				var cpf = JSON.stringify(json.pessoa.cpf)
				var mae = JSON.stringify(json.pessoa.mae)
				try{
					if(JSON.stringify(json.enderecos)){
						var tipo = JSON.stringify(json.enderecos.endereco.tipo)
						var complemento = JSON.stringify(json.enderecos.endereco.complemento)
						var logradouro = JSON.stringify(json.enderecos.endereco.logradouro)
						var numero = JSON.stringify(json.enderecos.endereco.numero)
						var cep = JSON.stringify(json.enderecos.endereco.cep)
						var bairro = JSON.stringify(json.enderecos.endereco.bairro)
						var cidade = JSON.stringify(json.enderecos.endereco.cidade)
						var uf = JSON.stringify(json.enderecos.endereco.uf)
					}
				}catch(e){
					
				}
				try{
					if(JSON.stringify(json['enderecos']["endereco"][0])){
						var tipo = JSON.stringify(json['enderecos']["endereco"][0].tipo)
						var logradouro = JSON.stringify(json['enderecos']["endereco"][0].logradouro)
						var complemento = JSON.stringify(json['enderecos']["endereco"][0].complemento)
						var cep = JSON.stringify(json['enderecos']["endereco"][0].cep)
						var bairro = JSON.stringify(json['enderecos']["endereco"][0].bairro)
						var cidade = JSON.stringify(json['enderecos']["endereco"][0].cidade)
						var uf = JSON.stringify(json['enderecos']["endereco"][0].uf)
						var numero = JSON.stringify(json['enderecos']["endereco"][0].numero)
					}	
				}
				catch(e){


				}
				try {
					if (json['telefones']["telefone"]){
						var totalTelefone = json['telefones']["telefone"];
						for (var i = 0; i < totalTelefone.length; i++) {
							 telefone = JSON.stringify(json['telefones']["telefone"][i].fone);
							 ddd = JSON.stringify(json['telefones']["telefone"][i].ddd);
					
						}
					}
				}
				catch(e){

				}
				try {
					if (json['emails']["emprego"][0]){
						var emailEmpresa = json['emails']["emprego"][0]['empresa'];
					}
				}
				catch(e){

				}
				try {
					if (json['vizinhos']["vizinho"][0]){
						var vizinho = json['vizinhos']["vizinho"][0];
						var vizinhoName = json['vizinhos']["vizinho"][0]['nome']
						var vizinhoCpf = json['vizinhos']["vizinho"][0]['cpf']
						var vizinhoTipo = json['vizinhos']["vizinho"][0]['tipo']
						var vizinhoLogradouro = json['vizinhos']["vizinho"][0]['logradouro']
						var enderecoVizinho = vizinhoTipo + " " + vizinhoLogradouro;
						var enderecoVizinhoCep = json['vizinhos']["vizinho"][0]['cep']
						var enderecoVizinhoNum = json['vizinhos']["vizinho"][0]['numero']
						var enderecoVizinhoBairro = json['vizinhos']["vizinho"][0]['bairro']
						var enderecoVizinhoCidade = json['vizinhos']["vizinho"][0]['cidade']
						var enderecoVizinhoUf = json['vizinhos']["vizinho"][0]['uf']
					}
				}
				catch(e){

				}

				const embed = new Discord.RichEmbed()
	 			.setTitle("Consulta: " +cpf)
	 			.setAuthor(message.author.username, "https://i.imgur.com/lm8s41J.png")
	 			.setColor(0x00B5B5)
	 			.addField("Nome","**"+nome+"**", true)
	 			.addField("Cpf","**"+cpf+"**", true)
	 			.addField("Nome da mãe","**"+mae+"**", true)
				.addField("Endereço",'**'+tipo + logradouro+'**', true)
	 			.addField("Numero","**"+numero+"**", true)
	 			.addField("Complemento","**"+complemento+"**", true)
	 			.addField("Cep","**"+cep+"**", true)
	 			.addField("Bairro","**"+bairro+"**", true)
	 			.addField("Cidade","**"+cidade+"**", true)
	 			.addField("UF","**"+uf+"**", true)
	 			.addField("telefone","**"+"("+ddd+")"+telefone+"**", true)
	 			.addField("Email Empresarial","**"+emailEmpresa+"**", true)
	 			.addField("\n############ Aqui vem os dados dos vizinhos #############\n","*",true)
	 			.addField("Nome","**"+vizinhoName+"**", true)
	 			.addField("Cpf","**"+vizinhoCpf+"**", true)
				.addField("Endereço",'**'+enderecoVizinho+'**', true)
	 			.addField("Numero","**"+enderecoVizinhoNum+"**", true)
	 			.addField("Cep","**"+enderecoVizinhoCep+"**", true)
	 			.addField("Bairro","**"+enderecoVizinhoBairro+"**", true)
	 			.addField("Cidade","**"+enderecoVizinhoCidade+"**", true)
	 			.addField("UF","**"+enderecoVizinhoUf+"**", true)
	 			message.channel.send({embed});
			}
		});
		if ((command === `${prefix}on`)) {
			
				const embed = new Discord.RichEmbed()

		}
 	}
});

app.listen(port);
bot.login(botSetting.token);
