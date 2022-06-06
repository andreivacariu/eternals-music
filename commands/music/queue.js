const { MessageEmbed, MessageButton, MessageActionRow} = require('discord.js');

module.exports = {
    name: 'queue',
    aliases: ['q'],
    utilisation: '{prefix}queue',
    voiceChannel: true,

    async execute(client, message) {
        const queue = player.getQueue(message.guild.id);
        const embedq = new MessageEmbed();
        embedq.setColor('RED');
        embedq.setDescription(`No music currently playing. Try again.`);
        if (!queue) return message.channel.send({ embeds: [embedq]});

        const embed1 = new MessageEmbed();
        embed1.setColor('RED');
        embed1.setDescription(`No music in the queue after the current one.`);
        if (!queue.tracks[0]) return message.channel.send({ embeds: [embed1]});

        const embed = new MessageEmbed();
        const methods = ['', '🔁', '🔂'];

        embed.setColor('#2c3434');
        embed.setThumbnail(message.guild.iconURL({ size: 2048, dynamic: true }));
        embed.setAuthor(`Server queue - ${message.guild.name} ${methods[queue.repeatMode]}`, client.user.displayAvatarURL({ size: 1024, dynamic: true }));
        const count = 35;
        const tracks = queue.tracks.map((track, i) => `**${i + 1}** - [${track.title.substring(0,count)+ (track.title.length > count ? "..." : "")}](${track.url}) (requested by: <@${track.requestedBy.id}>)`);

        const songs = queue.tracks.length;
        const nextSongs = songs > 5 ? `And **${songs - 5}** other song(s)...` : `In the playlist **${songs}** song(s)...`;

        embed.setDescription(`Current ${queue.current.title}\n\n${tracks.slice(0, 5).join('\n')}\n\n${nextSongs}`);

        embed.setTimestamp();
       // embed.setFooter('Music comes first ❤️', message.author.avatarURL({ dynamic: true }));

      //  message.channel.send({ embeds: [embed] });


        const backId = 'back'
        const forwardId = 'forward'
        const backButton = new MessageButton({
            style: 'SECONDARY',
            label: 'Back',
            emoji: '⬅️',
            customId: backId
        })
        const forwardButton = new MessageButton({
            style: 'SECONDARY',
            label: 'Forward',
            emoji: '➡️',
            customId: forwardId
        })

// Put the following code wherever you want to send the embed pages:

        const {author, channel} = message
        const guilds = [...client.guilds.cache.values()]

        /**
         * Creates an embed with guilds starting from an index.
         * @param {number} start The index to start from.
         * @returns {Promise<MessageEmbed>}
         */
        const generateEmbed = async start => {
            const current = tracks.slice(start, start + 10)
            const nextSongss = queue.tracks.length > 10 ? `And **${queue.tracks.length - start-10}** other song(s)...` : `In the playlist **${queue.tracks.length}** song(s)...`;

            // You can of course customise this embed however you want
            return new MessageEmbed({
                title:`Server queue - ${message.guild.name} ${methods[queue.repeatMode]}`
                ,
                description : `Current: [${queue.current.title}](${queue.current.url})\n\n${tracks.slice(start, start+10).join('\n')}\n`,
                thumbnail:message.guild.iconURL({ size: 2048, dynamic: true }),
                image : message.guild.iconURL({ size: 2048, dynamic: true }),
                color : '2c3434'
            })
        }

// Send the embed with the first 10 guilds
        const canFitOnOnePage = queue.tracks.length <= 10
        const embedMessage = await channel.send({
            embeds: [await generateEmbed(0)],
            components: canFitOnOnePage
                ? []
                : [new MessageActionRow({components: [forwardButton]})]
        })
// Exit if there is only one page of guilds (no need for all of this)
        if (canFitOnOnePage) return

// Collect button interactions (when a user clicks a button),
// but only when the button as clicked by the original message author
        const collector = embedMessage.createMessageComponentCollector({
            filter: ({user}) => user.id === author.id
        })

        let currentIndex = 0
        collector.on('collect', async interaction => {
            // Increase/decrease index
            interaction.customId === backId ? (currentIndex -= 10) : (currentIndex += 10)
            // Respond to interaction by updating message with new embed
            await interaction.update({
                embeds: [await generateEmbed(currentIndex)],
                components: [
                    new MessageActionRow({
                        components: [
                            // back button if it isn't the start
                            ...(currentIndex ? [backButton] : []),
                            // forward button if it isn't the end
                            ...(currentIndex + 10 < queue.tracks.length ? [forwardButton] : [])
                        ]
                    })
                ]
            })
        })
    },
};