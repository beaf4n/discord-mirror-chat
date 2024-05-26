const { Client } = require('discord.js-selfbot-v13');
const axios = require('axios');

const token = '';
const channelIds = ['', ''];
const webhookUrl = '';

const keywords = [
  "kata 1", "kata 2"
];

const client = new Client();

client.on('ready', () => {
  console.log(`Terhubung dengan akun ${client.user.tag}!`);
});

client.on('messageCreate', (message) => {
    if (channelIds.includes(message.channel.id)) {
      const containsKeyword = keywords.some(keyword => message.content.toLowerCase().includes(keyword.toLowerCase()));
  
      if (containsKeyword) {
        const content = {
          content: message.content
        };
  
        axios.post(webhookUrl, content)
          .then(response => {
            console.log('Pesan berhasil dikirim ke webhook:', response.data);
          })
          .catch(error => {
            console.error('Gagal mengirim pesan ke webhook:', error);
          });
      }
    }
});

client.login(token);