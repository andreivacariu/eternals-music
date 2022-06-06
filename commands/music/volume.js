const {MessageEmbed} = require("discord.js");
const maxVol = client.config.opt.maxVol;

module.exports = {
    name: 'volume',
    aliases: ['vol'],
    utilisation: `{prefix}volume [1-${maxVol}]`,
    voiceChannel: true,

    execute(client, message, args) {
        const queue = player.getQueue(message.guild.id);
        const embed = new MessageEmbed();
        embed.setColor('RED');
        embed.setDescription(`No music currently playing. Try again.`);
        if (!queue || !queue.playing) return message.channel.send({ embeds: [embed]});

        const vol = parseInt(args[0]);
        const embed1 = new MessageEmbed();
        embed1.setColor('RED');
        embed1.setDescription(`The current volume is ${queue.volume} \n*To change the volume enter a valid number between **1** and **${maxVol}**.*`);
        if (!vol) return message.channel.send({ embeds: [embed1]});
        const embed2 = new MessageEmbed();
        embed2.setColor('RED');
        embed2.setDescription(`The volume you want to change is already the current one.`);
        if (queue.volume === vol) return message.channel.send({ embeds: [embed2]});
        const embed3 = new MessageEmbed();
        embed3.setColor('RED');
        embed3.setDescription(`The specified number is not valid. Enter a number between **1** and **${maxVol}**.`);
        if (vol < 0 || vol > maxVol) return message.channel.send({ embeds: [embed3]});

        const success = queue.setVolume(vol);
        const embed4 = new MessageEmbed();
        embed4.setColor('#2c3434    ');
        embed4.setDescription(success ? `The volume has been modified to **${vol}**% 🔊` : `Something went wrong.`);
        return message.channel.send({ embeds: [embed4]});
    },
};