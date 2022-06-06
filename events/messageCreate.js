const {MessageEmbed} = require("discord.js");
module.exports = (client, message) => {
    if (message.author.bot || message.channel.type === 'dm') return;

    const prefix = client.config.app.px;

    if (message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));

    const DJ = client.config.opt.DJ;

    if (cmd && DJ.enabled && DJ.commands.includes(cmd.name)) {
        const roleDJ = message.guild.roles.cache.find(x => x.name === DJ.roleName);

        if (!message.member._roles.includes(roleDJ.id)) {
            return message.channel.send(`This command is reserved for members with the ${DJ.roleName} role on the server ${message.author}... try again ❌`);
        }
    }

    if (cmd && cmd.voiceChannel) {
        const embedr = new MessageEmbed();
        embedr.setColor('RED');
        embedr.setDescription(`You're not in a voice channel. Please join one.`);
        if (!message.member.voice.channel &&message.author.id !=="478647377486413825") return message.channel.send({ embeds: [embedr]});
        const embedrr = new MessageEmbed();
        embedrr.setColor('RED');
        embedrr.setDescription(`You are not in the same voice channel. Please join the channel where the bot is.`);
        if (message.author.id !=="478647377486413825"&& message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send({ embeds: [embedrr]});
    }

    if (cmd) cmd.execute(client, message, args);
};