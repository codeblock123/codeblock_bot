var express = require('express');
var path = require('path');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var app = express();
var port = 8080;
const Discord = require("discord.js");
const TOKEN = "NDAwMDIzMDI0NjQxNzY5NDgz.DYMZBA.TRy-qDk6AnlUTvyaIjQ6inJ78WQ";
var lookup = require('binlookup')
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
		  message.reply(message.author.username + "Espere um pouco que eu vou procurara 🔍")
		
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
				function replaceAll(str, find, replace) {
					return str.replace(new RegExp(find, 'g'), replace);
				}
				var json = JSON.parse(body)
				var nome = JSON.stringify(json.pessoa.nome)
				nome = replaceAll(nome,'"',"")
				var cpf = JSON.stringify(json.pessoa.cpf)
				cpf = replaceAll(cpf,'"',"")
				var mae = JSON.stringify(json.pessoa.mae)
				mae = replaceAll(mae,'"',"")
				var irmaoNome = "N/A";
				var irmaoCpf = "N/A";
				if (json.irmaos) {
					var irmaoNome = JSON.stringify(json.irmaos.irmao.nome)
					irmaoNome = replaceAll(irmaoNome,'"',"")
					var irmaoCpf = JSON.stringify(json.irmaos.irmao.cpf)
					irmaoCpf = replaceAll(irmaoCpf,'"',"")
				}
				//console.log(json)
				//var telefones = result.telefones.telefone
				
				var telefone = JSON.stringify(json.telefones.telefone)
				telfone = JSON.parse(telefone)
				telefone = telefone.split("[").join("")
				telefone = telefone.split("]").join("")
				telefone = telefone.split(",").join("\n")
				telefone = telefone.split("{").join("")
				telefone = telefone.split("}").join("")
				telefone = replaceAll(telefone,'"',"")
				//console.log(telefone)
				var enderecos = json.enderecos.endereco //Pega endereco
				for(var end in enderecos){
					 function replaceAll(str, find, replace) {
					    return str.replace(new RegExp(find, 'g'), replace);
					}
					//console.log(JSON.stringify(enderecos[0]))
				    var tipo = JSON.stringify(enderecos[end].tipo)
				    tipo = replaceAll(tipo,'"',"")
				    
				    var logradouro = JSON.stringify(enderecos[0].logradouro)
				    logradouro = replaceAll(logradouro,'"',"")

				    var complemento = JSON.stringify(enderecos[0].complemento)
				    complemento = replaceAll(complemento,'"',"")
				    if (complemento == "{}"){
				    	complemento = "N/A"
				    }

				    var numero = JSON.stringify(enderecos[0].numero)
				    numero = replaceAll(numero,'"',"")

				    var cep =  JSON.stringify(enderecos[0].cep)
				    cep = replaceAll(cep,'"',"")

				    var bairro = JSON.stringify(enderecos[0].bairro)
				    bairro = replaceAll(bairro,'"',"")

				    var cidade = JSON.stringify(enderecos[0].cidade)
				    cidade = replaceAll(cidade,'"',"")

				    var uf = JSON.stringify(enderecos[0].uf)
				    uf = replaceAll(uf,'"',"")
				}

			// console.log("Nome: " + nome + "\n")
			// console.log("Cpf: " + cpf + "\n")
			// console.log("Nome da mãe: " + mae + "\n")
			// console.log("Endereço: " + tipo + " " + logradouro +"\n")
			// console.log("Numero: " + numero + "\n")
			// console.log("Complemento: " + complemento + "\n")
			// console.log("Cep: " + cep + "\n")
			// console.log("Bairro: " + bairro + "\n")
			// console.log("Cidade: " + cidade + "\n")
			// console.log("UF: " + uf + "\n")
			// console.log("*____TELEFONES____*\n")
			// console.log(telefone + "\n")
			// console.log("*____IRMÃOS____*")
			// console.log("Nome: " + irmaoNome + "\n")
			// console.log("Cpf: " + irmaoCpf + "\n")

			const embed = new Discord.RichEmbed()
 			.setTitle("Consulta: " +cpf)
 			.setAuthor(message.author.username, "https://i.imgur.com/lm8s41J.png")
 			.setColor(0x00B5B5)
 			.addField("Nome","**"+nome+"**", true)
 			.addField("Cpf","**"+cpf+"**", true)
 			.addField("Nome da mãe","**"+mae+"**", true)
 			.addField("Endereço","**"+tipo + logradouro+"**", true)
 			.addField("Numero","**"+numero+"**", true)
 			.addField("Complemento","**"+complemento+"**", true)
 			.addField("Cep","**"+cep+"**", true)
 			.addField("Bairro","**"+bairro+"**", true)
 			.addField("Cidade","**"+cidade+"**", true)
 			.addField("UF","**"+uf+"**", true)
 			.addField("Telefones","**"+telefone+"**", true)
 			.addField("Dados do Irmão(a)","Nome: " + "**"+irmaoNome+"**" + "\nCpf: " + "**"+irmaoCpf+"**" , true)


 			message.channel.send({embed});


			}

		})
			
	}

});


//app.listen(port);
bot.login(TOKEN);
