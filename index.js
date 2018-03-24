var path = require('path');
var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var app = express();
var fs = require('fs');
var port = 8080;
const Discord = require("discord.js");
const TOKEN = "NDAwMDIzMDI0NjQxNzY5NDgz.DYMZBA.TRy-qDk6AnlUTvyaIjQ6inJ78WQ";
var lookup = require('binlookup')()
var bot = new Discord.Client();
const 	PREFIX = "!bin";


bot.on("ready", function(){
	console.log("ready");
});

bot.on("message", function(message){
	// Função pesquisa bin
	if (message.content.startsWith(PREFIX)){

		var bin = message.content;
		 bin = bin.replace(/!bin/i, '');
		 bin = bin.replace(" ","");	
		
		var regex = /[0-9]{6}/
		if(!regex.test(bin)){message.reply("Erro bin invalida")}

		// callback
		lookup(bin, function( err, data ){
		  if (err)
		    return console.error(err)

			 var tipo 	  = JSON.stringify(data.type)
			 var bandeira = JSON.stringify(data.scheme)
			 var banco    = JSON.stringify(data.bank.name)	
			 var pais     = JSON.stringify(data.country.name)
	 		 var fone     = JSON.stringify(data.bank.phone);
	 			//message.reply("\n Tipo:**__ " + tipo+"\n Bandeira" + bandeira + "\n")
 			const embed = new Discord.RichEmbed()
 			.setTitle("Bin " + bin)
 			.setAuthor(message.author.username, "https://i.imgur.com/lm8s41J.png")
 			.setColor(0x00B5B5)
 			.setDescription("Tipo: "+ tipo +"\n" + "Bandeira: "+ bandeira + "\n" + "Banco: "+ banco + "\n" + "Pais: "+ pais + "\n" + "Fone: " + fone)
  			message.channel.send({embed});

		})

		// promise
		lookup(bin).then(console.log, console.error)
	
	}
	//Fim função 

	if (message.content.startsWith("renato")) {
		const embed = new Discord.RichEmbed()
 			.setTitle("Sou o bot do Renato")
 			.setAuthor("Renato lindão")
 			.setColor(0x00B5B5)
 			.setDescription("Eu amo o Christian e a mimi.\nObs: Ela não gosta que chame ela assim. Mas eu gosto \n")
  			message.channel.send({embed});

	}


	if (message.content.startsWith("!cpf")) {
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

		var cpf = message.content;
		var regexCpf = /[\w]{3}\.[\w]{3}\.[\w]{3}-[\w]{2}/u
		var regexCpf2 = /[\w]{11}/g
		if(!regexCpf.test(cpf) && !regexCpf2.test(cpf)){return message.reply("Erro bin invalida")}
		cpf = cpf.replace(/!cpf/i, '');
		cpf = cpf.replace(" ","");	

		var url = "https://www.armazem239.com.br/api/consultaDocumento.php/?cpf="+cpf+"=&dispositivo=samsung%2520-%2520SM-G930K&sistema=Android4.4.2&versaoApp=2.0.2";
		request(url, function(err, resp, body){
			if (err) {
				console.log(err);
			}else{
				//console.log(body);
				var json = JSON.parse(body)
				
				console.log(json)
				var nome = JSON.stringify(json.pessoa.nome)
				var cpf = JSON.stringify(json.pessoa.cpf)
				var mae = JSON.stringify(json.pessoa.mae)
				var tipo = JSON.stringify(json.enderecos.endereco.tipo)
				var complemento = JSON.stringify(json.enderecos.endereco.complemento)
				var logradouro = JSON.stringify(json.enderecos.endereco.logradouro)
				var numero = JSON.stringify(json.enderecos.endereco.numero)
				var cep = JSON.stringify(json.enderecos.endereco.cep)
				var bairro = JSON.stringify(json.enderecos.endereco.bairro)
				var cidade = JSON.stringify(json.enderecos.endereco.cidade)
				var uf = JSON.stringify(json.enderecos.endereco.uf)
				var ddd  =  "";
				var telefone = "";
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
				try{
					//console.log(JSON.stringify(json['enderecos']["endereco"][0]))
					var tipo = JSON.stringify(json['enderecos']["endereco"][0].tipo)
					var logradouro = JSON.stringify(json['enderecos']["endereco"][0].logradouro)
					var complemento = JSON.stringify(json['enderecos']["endereco"][0].complemento)
					var cep = JSON.stringify(json['enderecos']["endereco"][0].cep)
					var bairro = JSON.stringify(json['enderecos']["endereco"][0].bairro)
					var cidade = JSON.stringify(json['enderecos']["endereco"][0].cidade)
					var uf = JSON.stringify(json['enderecos']["endereco"][0].uf)
					var numero = JSON.stringify(json['enderecos']["endereco"][0].numero)	
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
	 			

	 			message.channel.send({embed});

				

			}

		})
			
	}

	let role = message.guild.roles.find("name","Administrador")
	if (message.content.startsWith("!delete")) {
		if (message.member.roles.has(role.id)) {
			let content = message.content;
			let total = content.replace("!delete","");
			total = parseInt(total);
			message.channel.bulkDelete(total).then(() => {
	 			message.channel.send("Deleted " + total + " messages.").then(msg => msg.delete(3000));
			});	
		}
	}
});


//app.listen(port);
bot.login(TOKEN);
