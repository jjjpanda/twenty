require('dotenv').config()
const notifier = require('node-notifier');
const cron = require('node-cron');
const path = require('path')

const time = parseInt(process.env.time)

const reminder = () => {
    console.log(`reminder every ${time} minute${time > 1 ? "s" : ""}`);

    // Object
    notifier.notify({
        title: '🚨🚨🚨',
        message: `Your ${time > 1 ? time : "every"} minute reminder.`,
        icon: path.join(__dirname, 'exclamation.png'),
        sound: true
    });
    
}

cron.schedule(`*/${time} * * * *`, reminder);