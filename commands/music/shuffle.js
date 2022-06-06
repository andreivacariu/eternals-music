const {MessageEmbed} = require("discord.js");
module.exports = {
    name: 'shuffle',
    aliases: ['sh'],
    utilisation: '{prefix}shuffle',
    voiceChannel: true,

    async execute(client, message) {
        const queue = player.getQueue(message.guild.id);
        const embed = new MessageEmbed();
        embed.setColor('RED');
        embed.setDescription(`No music currently playing. Try again.`);
        if (!queue || !queue.playing) return message.channel.send({ embeds: [embed]});

        const embed1 = new MessageEmbed();
        embed1.setColor('RED');
        embed1.setDescription(`No music in the queue after the current one.`);
        if (!queue.tracks[0]) return message.channel.send({ embeds: [embed1]});

        await queue.shuffle();
        const embed2 = new MessageEmbed();
        embed2.setColor('#2c3434');
        embed2.setDescription(`Queue shuffled **${queue.tracks.length}** song(s) !`);
        return message.channel.send({ embeds: [embed2]});
    },
};