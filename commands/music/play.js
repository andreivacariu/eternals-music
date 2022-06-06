        const { QueryType } = require('discord-player');
        const {MessageEmbed} = require("discord.js");

module.exports = {
    name: 'play',
    aliases: ['p'],
    utilisation: '{prefix}play [song name/URL]',
    voiceChannel: true,

    async execute(client, message, args) {
         const embed = new MessageEmbed();
        embed.setColor('RED');
        embed.setDescription(`Please enter a valid search and try again.`);
        if (!args[0]) return message.channel.send({ embeds: [embed]});
        const res = await player.search(args.join(' '), {
            requestedBy: message.member,
            searchEngine: QueryType.AUTO
        });
        const embed1 = new MessageEmbed();
        embed1.setColor('RED');
        embed1.setDescription(`No results found.`);
        if (!res || !res.tracks.length) return message.channel.send({ embeds: [embed1]});

        const queue = await player.createQueue(message.guild, {
            metadata: message.channel
        });
        const embed2 = new MessageEmbed();
        embed2.setColor('RED');
        embed2.setDescription(`I can't join the voice channel. Please try again.`);
        try {
            if (!queue.connection) await queue.connect(message.member.voice.channel);
        } catch {
            await player.deleteQueue(message.guild.id);
            return message.channel.send({ embeds: [embed2]});
        }

        //await message.channel.send(`Loading your ${res.playlist ? 'playlist' : 'track'}... 🎧`);

        res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);

        if (!queue.playing) await queue.play();
    },
};