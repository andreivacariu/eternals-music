module.exports = async (client) => {
    console.log(`Discord Info:`)
    console.log(`Total Users ${client.users.cache.size}`);
    console.log(`Total Channels ${client.channels.cache.size}`);
    console.log(`Total Guilds ${client.guilds.cache.size}`);
    console.log('bot status', client.user.presence.status);
    console.log(`${client.user.username} is Ready!`);
    client.guilds.cache.forEach(guild => {
        console.log(`${guild.name} | ${guild.id}`);
    })

    client.user.setActivity(".help", {type: 2});
};
