module.exports = {
    app: {
        px: '.',
        token: 'DiscordBotToken',
        listening : '.help'
    },

    opt: {
        DJ: {
            enabled: false,
            roleName: 'DJ',
            commands: ['back', 'clear', 'loop', 'pause', 'resume', 'seek', 'shuffle', 'skip', 'stop', 'volume']
        },
        maxVol: 200,
        leaveOnEmptyCooldown: 1000,
        leaveOnEmpty : true,
        leaveOnEnd : false,
        initialVolume : 60,
        leaveOnStop: true,
        discordPlayer: {
            leaveOnEmptyCooldown: 10000,
            leaveOnEmpty : true,
            leaveOnEnd : false,
            initialVolume : 60,
            leaveOnStop: true,
            ytdlOptions: {
                quality: 'highestaudio',
                highWaterMark: 1 << 25
            }
        }
    }
};
