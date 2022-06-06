const {MessageEmbed} = require("discord.js");
module.exports = {
    name: 'skip',
    aliases: ['sk'],
    utilisation: '{prefix}skip',
    voiceChannel: true,

    execute(client, message) {
        const queue = player.getQueue(message.guild.id);
        const embed = new MessageEmbed();
        embed.setColor('RED');
        embed.setDescription(`No music currently playing. Try again.`);
        if (!queue || !queue.playing) return message.channel.send({ embeds: [embed]});

        const success = queue.skip();
        const embed1 = new MessageEmbed();
        embed1.setColor('#2c3434');
        embed1.setDescription(success ? `Skipping [${queue.current.title}](${queue.current.song}) ` : `Something went wrong. Please try again.`);
        return message.channel.send({ embeds: [embed1]});
    },
};