const {MessageEmbed} = require("discord.js");
module.exports = {
    name: 'back',
    aliases: ['previous'],
    utilisation: '{prefix}back',
    voiceChannel: true,

    async execute(client, message) {
        const embed = new MessageEmbed();
        embed.setColor('RED');
        embed.setDescription(`No music currently playing. Try again.`);
        const queue = player.getQueue(message.guild.id);
        if (!queue || !queue.playing) return message.channel.send({ embeds: [embed]});
        const embed1 = new MessageEmbed();
        embed1.setColor('RED');
        embed1.setDescription(`There was no music played before.`);
        if (!queue.previousTracks[1]) return message.channel.send({ embeds: [embed1]});

        await queue.back();
        const embed2 = new MessageEmbed();
        embed2.setColor('#2c3434');
        embed2.setDescription(`Playing the [**previous**](${track.url}) track.`);

        message.channel.send({ embeds: [embed2]});
    },
};