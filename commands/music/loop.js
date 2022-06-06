const { QueueRepeatMode } = require('discord-player');
const {MessageEmbed} = require("discord.js");

module.exports = {
    name: 'loop',
    aliases: ['lp', 'repeat'],
    utilisation: '{prefix}loop <queue>',
    voiceChannel: true,

    execute(client, message, args) {
        const queue = player.getQueue(message.guild.id);
        const embed = new MessageEmbed();
        embed.setColor('RED');
        embed.setDescription(`No music currently playing. Try again.`);
        if (!queue || !queue.playing) return message.channel.send({ embeds: [embed]});

        if (args.join('').toLowerCase() === 'queue') {
            const embed1 = new MessageEmbed();
            embed1.setColor('RED');
            embed1.setDescription(`You must first disable the current music in the loop mode (${client.config.app.px}loop).`);
            if (queue.repeatMode === 1) return message.channel.send({ embeds: [embed1]});

            const success = queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.QUEUE : QueueRepeatMode.OFF);
            const embed2 = new MessageEmbed();
            embed2.setColor('#2c3434');
            embed2.setDescription(success ? `Repeat mode **${queue.repeatMode === 0 ? 'disabled' : 'enabled'}** the whole queue will be repeated endlessly 🔁` : `Something went wrong.`);
            return message.channel.send({ embeds: [embed2]});
        } else {
            const embed3 = new MessageEmbed();
            embed3.setColor('RED');
            embed3.setDescription(`You must first disable the current queue in the loop mode (${client.config.app.px}loop queue).`);
            if (queue.repeatMode === 2) return message.channel.send({ embeds: [embed3]});
            const success = queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.TRACK : QueueRepeatMode.OFF);
            const embed4 = new MessageEmbed();
            embed4.setColor('#2c3434');
            embed4.setDescription(success ? `Repeat mode **${queue.repeatMode === 0 ? 'disabled' : 'enabled'}** the current music will be repeated endlessly (you can loop the queue with the <queue> option) ` : `Something went wrong.`);
            return message.channel.send({ embeds: [embed4]});
        };
    },
};