const ms = require('ms');
//const {MessageEmbed} = require("discord.js");
const {MessageActionRow, MessageSelectMenu, MessageEmbed} = require("discord.js");

module.exports = {
    name: 'ping',
    aliases: [],
    utilisation: '{prefix}ping',

    async execute(client, message) {
        const embeds = new MessageEmbed();
        embeds.setColor('#2c3434');
        embeds.setDescription(`Last heartbeat calculated ${ms(Date.now() - client.ws.shards.first().lastPingTimestamp, {long: true})} ago **${client.ws.ping}ms**.`);
        message.channel.send({embeds: [embeds]});



    },
};