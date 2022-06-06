const {MessageEmbed} = require("discord.js");
module.exports = {
    name: 'pause',
    aliases: [],
    utilisation: '{prefix}pause',
    voiceChannel: true,

    execute(client, message) {
        const queue = player.getQueue(message.guild.id);

        const embed = new MessageEmbed();
        embed.setColor('RED');
        embed.setDescription(`No music currently playing. Try again.`);
        if (!queue || !queue.playing) return message.channel.send({ embeds: [embed]});

        const success = queue.setPaused(true);
        const embed1 = new MessageEmbed();
        embed1.setColor('#2c3434');
        embed1.setDescription(success ? `Current music [${queue.current.title}](${queue.current.url}) paused.` : `Something went wrong. Is the song already paused?`);
        return message.channel.send({ embeds: [embed1]});
    },
};