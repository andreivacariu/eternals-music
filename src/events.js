const {MessageEmbed, MessageButton, MessageActionRow} = require("discord.js");
player.on('error', (queue, error) => {
    console.log(`Error emitted from the queue ${error.message}`);
});

player.on('connectionError', (queue, error) => {
    console.log(`Error emitted from the connection ${error.message}`);
});

player.on('trackStart', (queue, track) => {
    if (!client.config.opt.loopMessage && queue.repeatMode !== 0) return;
    //queue.metadata.send(`Started playing ${track.title} in **${queue.connection.channel.name}** 🎧`);
    const embed = new MessageEmbed();
    embed.setColor('#2c3434');
    embed.setDescription(`**Now Playing** \n\n[${track.title}](${track.url}) [<@${track.requestedBy.id}>]`);
    queue.metadata.send({ embeds: [embed]});
});

player.on('trackAdd', (queue, track) => {
    const embed = new MessageEmbed();
    embed.setColor('#2c3434');
    embed.setDescription(`Queued [${track.title}](${track.url}) [<@${track.requestedBy.id}>]`);
    queue.metadata.send({ embeds: [embed]});
});

player.on('botDisconnect', (queue) => {
    const embed = new MessageEmbed();
    embed.setColor('#2c3434');
    embed.setDescription(`I was manually disconnected from the voice channel, clearing queue...`);
    queue.metadata.send({ embeds: [embed]});
});

player.on('channelEmpty', (queue) => {
    const embed = new MessageEmbed();
    embed.setColor('#2c3434');
    embed.setDescription(`Nobody is in the voice channel, leaving it...`);
    queue.metadata.send({ embeds: [embed]});
    if (queue.connection) {
        queue.connection.disconnect();
    }
});

player.on('queueEnd', (queue) => {
    const embed = new MessageEmbed();
    embed.setColor('#2c3434');
    embed.setDescription(`I finished reading the whole queue!`);
    queue.metadata.send({ embeds: [embed]});
});


