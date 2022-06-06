const { MessageEmbed } = require('discord.js');
const { Lyrics } = require("@discord-player/extractor");
const lyricsClient = Lyrics.init();

module.exports = {
    name: 'lyrics',
    aliases: [],
    category: 'Music',
    utilisation: '{prefix}lyrics',

    async execute(client, message, args) {
        const queue = player.getQueue(message.guild.id);
        const embed1 = new MessageEmbed();
        embed1.setColor('RED');
        embed1.setDescription(`Please specify a track and try again.`);
        if (!queue && !args[0]) return message.channel.send({ embeds: [embed1]});

        message.channel.sendTyping();

        const song = await lyricsClient.search(args[0] ? args.join(' ') : queue.current.title);
        const embed2 = new MessageEmbed();
        embed2.setColor('RED');
        embed2.setDescription(`Couldn' find lyrics for this song! Please retry or search for an other track!`);
        if (song === null) return message.channel.send({ embeds: [embed2]});

        const embed = new MessageEmbed()
            .setTitle(`**LYRICS | ${song.title}**`)
            .setDescription(song.lyrics.length > 1900 ? song.lyrics.substr(0, 1897) + '...' : song.lyrics)
           // .setFooter('Music comes first ❤️', message.author.avatarURL({ dynamic: true }));

        message.channel.send({embeds:[embed]})
    },
};