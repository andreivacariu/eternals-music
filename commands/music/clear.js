const {MessageEmbed} = require("discord.js");
module.exports = {
    name: 'clear',
    aliases: ['cq'],
    utilisation: '{prefix}clear',
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

        await queue.clear();
        const embed2 = new MessageEmbed();
        embed2.setColor('#2c3434');
        embed2.setDescription(`The queue has just been cleared.`);
        message.channel.send({ embeds: [embed2]});
    },
};