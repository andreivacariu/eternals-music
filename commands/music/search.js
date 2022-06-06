const { MessageEmbed, MessageActionRow, MessageSelectMenu} = require('discord.js');
const { QueryType } = require('discord-player');

module.exports = {
    name: 'search',
    aliases: ['sh'],
    utilisation: '{prefix}search [song name]',
    voiceChannel: true,

    async execute(client, message, args) {
        const embed1 = new MessageEmbed();
        embed1.setColor('RED');
        embed1.setDescription(` Please enter a valid search and try again.`);
        if (!args[0]) return message.channel.send({ embeds: [embed1]});

        const res = await player.search(args.join(' '), {
            requestedBy: message.member,
            searchEngine: QueryType.AUTO
        });

        const embed2 = new MessageEmbed();
        embed2.setColor('RED');
        embed2.setDescription(`No results found.`);
        if (!res || !res.tracks.length) return message.channel.send({ embeds: [embed2]});

        const queue = await player.createQueue(message.guild, {
            metadata: message.channel
        });

        const embed = new MessageEmbed();

        embed.setColor('#2c3434');
        embed.setAuthor(`Results for ${args.join(' ')}`, client.user.displayAvatarURL({ size: 1024, dynamic: true }));

        const maxTracks = res.tracks.slice(0, 10);

        embed.setDescription(`${maxTracks.map((track, i) => `**${i + 1}**. ${track.title} | ${track.author}`).join('\n')}\n\nSelect choice between **1** and **${maxTracks.length}** or **cancel** ⬇️`);

        embed.setTimestamp();
        //embed.setFooter('Music comes first ❤️', message.author.avatarURL({ dynamic: true }));

        message.channel.send({ embeds: [embed] });

        const collector = message.channel.createMessageCollector({
            time: 15000,
            errors: ['time'],
            filter: m => m.author.id === message.author.id
        });

        collector.on('collect', async (query) => {
            const embed3 = new MessageEmbed();
            embed3.setColor('RED');
            embed3.setDescription(`Search cancelled.`);
            if (query.content.toLowerCase() === 'cancel') return message.channel.send({ embeds: [embed3]}) && collector.stop();

            const value = parseInt(query.content);
            const embed4 = new MessageEmbed();
            embed4.setColor('RED');
            embed4.setDescription(`Invalid response, try a value between **1** and **${maxTracks.length}** or **cancel**.`);
            if (!value || value <= 0 || value > maxTracks.length) return message.channel.send({ embeds: [embed4]});

            collector.stop();

            try {
                if (!queue.connection) await queue.connect(message.member.voice.channel);
            } catch {
                await player.deleteQueue(message.guild.id);
                const embed5 = new MessageEmbed();
                embed5.setColor('RED');
                embed5.setDescription(`I can't join the voice channel.`);
                return message.channel.send({ embeds: [embed5]});
            }
            const embed6 = new MessageEmbed();
            embed6.setColor('#2c3434');
            embed6.setDescription(`Loading your search.`);
            await message.channel.send({ embeds: [embed6]});

            queue.addTrack(res.tracks[query.content - 1]);

            if (!queue.playing) await queue.play();
        });

        collector.on('end', (msg, reason) => {
            const embed7 = new MessageEmbed();
            embed7.setColor('RED');
            embed7.setDescription(`Search timed out. Try again.`);
            if (reason === 'time') return ({ embeds: [embed7]});
        });

    },
};