const {MessageEmbed} = require("discord.js");
module.exports = {
    name: 'resume',
    aliases: ['rs'],
    utilisation: '{prefix}resume',
    voiceChannel: true,

    execute(client, message) {
        const queue = player.getQueue(message.guild.id);
        const embed = new MessageEmbed();
        embed.setColor('RED');
        embed.setDescription(`No music currently playing. Try again.`);
        if (!queue ) return message.channel.send({ embeds: [embed]});

        const success = queue.setPaused(false);
        const embedr = new MessageEmbed();
        embedr.setColor('#2c3434');
        embedr.setDescription(`Current music [${queue.current.title}](${queue.current.url}) resumed.`);
        return message.channel.send({ embeds: [embedr]});
    },
};