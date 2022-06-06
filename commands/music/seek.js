const ms = require('ms');
const {MessageEmbed} = require("discord.js");

module.exports = {
    name: 'seek',
    aliases: [],
    utilisation: '{prefix}seek [time]',
    voiceChannel: true,

    async execute(client, message, args) {
        const queue = player.getQueue(message.guild.id);
        const embed = new MessageEmbed();
        embed.setColor('RED');
        embed.setDescription(`No music currently playing. Try again.`);
        if (!queue || !queue.playing) return message.channel.send({ embeds: [embed]});
        const embed1 = new MessageEmbed();
        embed1.setColor('RED');
        embed1.setDescription(`No time given! Please enter the timestamp in ms!`);

        if (args.length === 0) { return message.channel.send({ embeds: [embed1]}); }
        else {
            const timeToMS = ms(args.join(' '));
            const embed2 = new MessageEmbed();
            embed2.setColor('RED');
            embed2.setDescription(`The indicated time is higher than the total time of the current song!`);
            if (timeToMS >= queue.current.durationMS) return message.channel.send({ embeds: [embed2]});

            await queue.seek(timeToMS);
            const embed3 = new MessageEmbed();
            embed3.setColor('RED');
            embed3.setDescription(`Time set on the current song **${ms(timeToMS, {long: true})}**!`);
            message.channel.send({ embeds: [embed3]});
        }},
};