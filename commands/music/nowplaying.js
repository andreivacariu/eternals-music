const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    name: 'nowplaying',
    aliases: ['np'],
    utilisation: '{prefix}nowplaying',
    voiceChannel: true,

    execute(client, message) {
        const capitalize = (s) => {
            if (typeof s !== 'string') return ''
            return s.charAt(0).toUpperCase() + s.slice(1)
        }
        const queue = player.getQueue(message.guild.id);
        const embedq = new MessageEmbed();
        embedq.setColor('RED');
        embedq.setDescription(`No music currently playing. Try again.`);
        if (!queue || !queue.playing) return message.channel.send({ embeds: [embedq]});
        const track = queue.current;

        const embed = new MessageEmbed();

        embed.setColor('#2c3434');
        embed.setThumbnail(track.thumbnail);
        embed.setAuthor(track.title, client.user.displayAvatarURL({ size: 1024, dynamic: true }));

        const methods = ['disabled', 'track', 'queue'];

        const timestamp = queue.getPlayerTimestamp();
        const trackDuration = timestamp.progress == 'Infinity' ? 'infinity (live)' : track.duration;
        const progress = queue.createProgressBar();
        embed.setDescription(`Volume: **${queue.volume}**%\nDuration: **${trackDuration}**\nLoop mode: **${capitalize(methods[queue.repeatMode])}**\n\n${progress} `);

        embed.setFooter(`Music comes first ❤️Requested by ${String(track.requestedBy.username)}`);

        const pause = new MessageButton();
        const stop = new MessageButton();
        const resume = new MessageButton();
        pause.setLabel('Pause this track');
        pause.setCustomId('pauseTrack');
        pause.setStyle('SECONDARY');
        stop.setLabel('Stop');
        stop.setCustomId('stopAll');
        stop.setStyle('DANGER');
        resume.setLabel('Resume this track');
        resume.setCustomId('resumeTrack');
        resume.setStyle('SECONDARY');

        const row = new MessageActionRow().addComponents(pause).addComponents(resume).addComponents(stop);

        message.channel.send({ embeds: [embed], components: [row] });
    },
};