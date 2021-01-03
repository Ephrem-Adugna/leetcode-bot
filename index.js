const Discord = require('discord.js');
const Questions = require('./getdata.js')
const client = new Discord.Client();
const prefix = '!';
client.once('ready', () => {
    console.log('Bot is online');
});
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
client.on('message', async message => {
    if (!message.content.toLowerCase().startsWith(prefix) || message.author.bot) return;
    if (message.content.toLowerCase().startsWith('!leet ')) {
        var question =  await message.content.toLowerCase().replace('!leet ', '');
        const resp = await Questions.getQuestion(question, false);
        const answerEmbed = new Discord.MessageEmbed()
            .setColor('#EF920D')
            .setTitle(resp.split('|')[0] + "(" + resp.split('|')[8] + ")")

            .addField('User', "@" + message.member.user.tag, true)
            .setDescription(resp.split('|')[1])
            .setThumbnail('https://i.imgur.com/172EExS.png')
            .setURL(resp.split('|')[7])

            .addFields(
                { name: 'Likes', value: resp.split('|')[2] },
                { name: 'Dislikes', value: resp.split('|')[3] },
                { name: 'Total Submissions', value: resp.split('|')[5] , inline: true },
                { name: 'Accepted Submissions', value: resp.split('|')[4] + " or " + resp.split('|')[6], inline: true }

        )
            .setTimestamp()
            .setFooter('Send \'!leet-help\' for help with bot commands!')

        await message.channel.send(answerEmbed);
 
    }
   else if (message.content.toLowerCase().startsWith('!answer leetcode ')) {
        var question = await message.content.toLowerCase().replace('!answer leetcode ', '');
        question = question.split('question: ')[1].split('|')[0];
        var response = await message.content.replace('!answer leetcode ', '');
        response = await response.split('response:')[1];
        var lang = await message.content.replace('!answer leetcode ', '');
        lang = await lang.split('language:')[1].split('|')[0];
        await message.channel.send("Finding your question...");

        const resp = await Questions.answerQuestion(question, response, lang);
        
        await message.channel.send("Response", { files: ["./resp.png"] });

    }
   else if (message.content.toLowerCase().startsWith('!leet-rand')) {
        const resp = await Questions.getRandom();
        const answerEmbed = new Discord.MessageEmbed()
            .setColor('#EF920D')
            .setTitle(resp.split('|')[0] + "(" + resp.split('|')[8]+")")
            .addField('User', "@" + message.member.user.tag, true)
            .setDescription(resp.split('|')[1])
            .setThumbnail('https://i.imgur.com/172EExS.png')
            .setURL(resp.split('|')[7])

            .addFields(
                { name: 'Likes', value: resp.split('|')[2] },
                { name: 'Dislikes', value: resp.split('|')[3] },
                { name: 'Total Submissions', value: resp.split('|')[5], inline: true },
                { name: 'Accepted Submissions', value: resp.split('|')[4] + " or " + resp.split('|')[6], inline: true }
            )
            .setTimestamp()
            .setFooter('Send \'!leet-help\' for help with bot commands!')


        await message.channel.send(answerEmbed);

    }
   else if (message.content.toLowerCase().startsWith('!leet-help')) {
        const answerEmbed = new Discord.MessageEmbed()
            .setColor('#EF920D')
            .setTitle("@" + message.member.user.tag + "\n" + "Help")
            .setDescription("1. `!leet questionName` Finds you a leetcode question by `questionName` \n2. `!leet-rand` Finds you a random leetcode question")
            .setThumbnail('https://i.imgur.com/172EExS.png')
            .setTimestamp()
            .setFooter('Send \'!leet-help\' for help with bot commands!');


        await message.channel.send(answerEmbed);

   }
})
client.login('TOKEN');