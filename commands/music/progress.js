const {MessageEmbed} = require("discord.js");
module.exports = {
    name: 'progress',
    aliases: ['pbar'],
    utilisation: '{prefix}progress',
    voiceChannel: true,

    async execute(client, message) {
        const queue = player.getQueue(message.guild.id);
        const embed = new MessageEmbed();
        embed.setColor('RED');
        embed.setDescription(`No music currently playing. Try again.`);
        if (!queue || !queue.playing) return message.channel.send({ embeds: [embed]});

        const progress = queue.createProgressBar();
        const timestamp = queue.getPlayerTimestamp();
        const embed1 = new MessageEmbed();
        embed1.setColor('RED');
        embed1.setDescription(`Playing a live, no data to display.`);
        if (timestamp.progress == 'Infinity') return message.channel.send({ embeds: [embed1]});

        message.channel.send(`${progress} (**${timestamp.progress}**%)`);
    },
};