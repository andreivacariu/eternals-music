const {MessageEmbed} = require("discord.js");
module.exports = {
    name: 'leave',
    aliases: ['stop'],
    utilisation: '{prefix}leave',
    voiceChannel: true,

    execute(client, message) {
        const queue = player.getQueue(message.guild.id);

        const embed = new MessageEmbed();
        embed.setColor('RED');
        embed.setDescription(`No music currently playing. Try again.`);
        if (!queue || !queue.playing) return message.channel.send({ embeds: [embed]});

        if (queue.connection) {
            queue.connection.disconnect();
        }
        const embed1 = new MessageEmbed();
        embed1.setColor('#2c3434');
        embed1.setDescription(`Music stopped playing, see you next time.`);
        message.channel.send({ embeds: [embed1]});
    },
};