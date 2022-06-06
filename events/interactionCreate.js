const {MessageEmbed} = require("discord.js");
module.exports = (client, int) => {
    if (!int.isButton()) return;
try{
    const queue = player.getQueue(int.guildId);
    const embed = new MessageEmbed();
    embed.setColor('RED');
    embed.setDescription(`No music currently playing. Try again.`);
    const embedp = new MessageEmbed();
    embedp.setColor('#2c3434');
    embedp.setDescription(`Current music [${queue.current.title}](${queue.current.url}) paused.`);
    const embedr = new MessageEmbed();
    embedr.setColor('#2c3434');
    embedr.setDescription(`Current music [${queue.current.title}](${queue.current.url}) resumed.`);
    const embeds = new MessageEmbed();
    embeds.setColor('#2c3434');
    embeds.setDescription(`Music stopped playing, see you next time.`);
    //queue.metadata.send({ embeds: [embed]});}
    switch (int.customId) {

        case 'pauseTrack': {

            if (!queue) return queue.metadata.send({ embeds: [embed]});

            const success = queue.setPaused(true);

            return queue.metadata.send({ embeds: [embedp]});
        }
        case 'resumeTrack': {

            if (!queue) return queue.metadata.send({ embeds: [embed]});

            const success = queue.setPaused(false);

            return queue.metadata.send({ embeds: [embedr]});
        }
        case 'stopAll': {
            if (!queue || !queue.playing) return  queue.metadata.send({ embeds: [embed]});

            if (queue.connection) {
                queue.connection.disconnect();
            }

            return  queue.metadata.send({ embeds: [embeds]});
    }}}catch (e) {
    console.log(e);
}
};