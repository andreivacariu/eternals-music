const {MessageEmbed} = require("discord.js");
module.exports = {
    name: 'stop',
    aliases: ['dc','stop'],
    utilisation: '{prefix}stop',
    voiceChannel: true,

    execute(client, message) {
        const queue = player.getQueue(message.guild.id);
        const embed = new MessageEmbed();
        embed.setColor('RED');
        embed.setDescription(`No music currently playing. Try again.`);

        if (!queue || !queue.playing) return message.channel.send({ embeds: [embed]});
        const embeds = new MessageEmbed();
        embeds.setColor('#2c3434');
        embeds.setDescription(`Music stopped playing, see you next time.`);
        if (queue.connection) {
            queue.connection.disconnect();
        }

        message.channel.send({ embeds: [embeds]});
    },
};