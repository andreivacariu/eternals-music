const {MessageEmbed} = require("discord.js");
module.exports = {
    name: 'jump',
    aliases: [],
    utilisation: '{prefix}jump',
    voiceChannel: true,

    async execute(client, message,args) {
        const queue = player.getQueue(message.guild.id);
        const embed = new MessageEmbed();
        embed.setColor('RED');
        embed.setDescription(`No music currently playing. Try again.`);
        if (!queue || !queue.playing) return message.channel.send({ embeds: [embed]});
        const embed1 = new MessageEmbed();
        embed1.setColor('RED');
        embed1.setDescription(`No music in the queue after the current one.`);
        if (!queue.tracks[0]) return message.channel.send({ embeds: [embed1]});
        const embed2 = new MessageEmbed();
        embed2.setColor('RED');
        embed2.setDescription(`That is not a valid track!`);
        if(args[0] > queue.tracks.length || args[0] < 1) return message.channel.send({ embeds: [embed2]});
        let song = queue.tracks[Number(args[0]) - 1]
        queue.jump(song);
        const embed3 = new MessageEmbed();
        embed3.setColor('#2c3434');
        embed3.setDescription(`Playing song from queue: [${song.title}](${song.url})`);
        message.channel.send({ embeds: [embed3]});
    },
};