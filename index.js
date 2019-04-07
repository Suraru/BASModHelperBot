require('dotenv').config()
const fs = require('fs')
const Discord = require("discord.js"); // Requires the npm package 'discord.js'.
const client = new Discord.Client(); // Create an instance of Discord#Client

// Bot by Suraru
// Coded by Thrasher Alpha

client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on("message", (message) => { // EventEmitter
	if(message.content == "ping"){ // Check if message is "ping"
			message.channel.send("Pinging ...") // Placeholder for pinging ... 
			.then((msg) => { // Resolve promise
				msg.edit("Ping: `" + (Date.now() - msg.createdTimestamp) + "ms`") // Edits message with current timestamp minus timestamp of message
			});
		}
});

// the first element of each inner array is the response, everything else in that array is a trigger for that response
// [[response1, trigger1, trigger2, trigger3, ...],
//  [response2, trigger1, trigger2, ...],
//  [response3, trigger1, ...],
// ...]
				  // 0
var conditions = [
				  ["Sure! No problem ^_^",
				   "thank"],
				  // 1
				  ["No. Leave the .jsons in the folder with the .dll",
				   "separate the json", "separate the .json", "separate json", "separate .json",
				   "separate the dll", "separate the .dll", "separate dll", "separate .dll"],
				  // 2
				  ["Don't use outdated mods. You can find a list of up to date mods here: <https://docs.google.com/spreadsheets/d/1YvSmj_BboxvpsBbwwFjWp6wtf7Ss0MOV7LCnzS-V4Lw/edit#gid=0>",
				   "infinite loading"],
				  // 3
				  ["We can't import custom models yet, so no lightsaber mod is coming anytime soon.",
				   "lightsaber"],
				  // 4
				  ["You can't stop time without stopping yourself because of the way the physics engine works. No, a mod cannot fix this.",
				   "time stop", "timestop", "stop time"],
				  // 5
				  ["A few low quality virus scanners (McAffee, Microsoft, etc) have an issue with the modloader, so you need to add it as an exception. This video shows how to do that with Microsoft Defender <https://www.youtube.com/watch?v=xrh6EAwpka8>",
				   "deletes itself", "deleting itself", "delete itself", "disappears", "gets removed", "virus", "trojan", "spyware", "adware"],
				  // 6
				  ["Remove BASTelekinesisPlus from the mods folder then try running it again. You can move it back when it's done.",
				   "mapped section"],
				  // 7
				  ["You only need the mod loader to run mods with a .dll file, .json mods will work fine without it.",
				   "need the modloader", "need the mod loader"],
			      // 8
				  ["There's three guides showing you how to install a mod. Basically, if it contains only .json files, you put it in StreamingAssets. If it isn't in a folder when you download it, make a new folder inside of StreamingAssets with whatever name sounds right to you, and place the json inside of it. If the mod contains a .dll file, it goes in the mods folder, not streaming assets. Here's some links. <https://cdn.discordapp.com/attachments/516724791877828631/558022462382800969/image0.jpg> <https://docs.google.com/spreadsheets/d/1YvSmj_BboxvpsBbwwFjWp6wtf7Ss0MOV7LCnzS-V4Lw> <https://www.youtube.com/watch?v=xrh6EAwpka8>",
				   "install"],
				  // 9
				  ["<https://docs.google.com/spreadsheets/d/1YvSmj_BboxvpsBbwwFjWp6wtf7Ss0MOV7LCnzS-V4Lw/edit#gid=0>",
				   "download", "link", "where is the", "where can I find the"],
				  // 10
				  ["What do you need help with?",
				   "help"]
				];

client.on("message", async message => {
  // if a bot wrote this message, no need to go further
  if(message.author.bot) return;

  var output = "", lowercasemessage = message.content.toLowerCase();
  // anonymous function that returns true/false if the async message includes string x, case insensitive
  // use exactly like a function "void checkmessage(var x)"
  var checkmessage = function(x) {return lowercasemessage.includes(x.toLowerCase())};

  // iterate through the array until true is returned or loop is completed
  conditions.some(element => {
	// iterate through the inner array starting at element 1 (element 0 is always our response)
    for(var x = 1; x < element.length; x++) {
      // does the current discord message include this string? if so return true to break the conditions.some loop
      if(checkmessage(element[x])) {
        output = element[0];
        return true;
      }
    }
  });

  // don't send an empty message if we don't have an output
  if(output !== "") return message.reply(output);
});

client.login(process.env.BOT_TOKEN)