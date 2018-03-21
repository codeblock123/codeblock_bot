

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



});


// THIS  MUST  BE  THIS  WAY
bot.login(process.env.BOT_TOKEN);
