const notifier = require('node-notifier');
const cron = require('node-cron');
const path = require('path')
require('dotenv').config({
    path: path.join(__dirname, ".env")
})

const time = parseInt(process.env.time || 20)

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

try {
    cron.schedule(`*/${time} * * * *`, reminder);
} catch (error) {
    notifier.notify({
        title: '⚠⚠⚠',
        message: `Your ${time > 1 ? time : "every"} minute reminder failed to set up!\n${error}`,
        icon: path.join(__dirname, 'exclamation.png'),
        sound: true
    });
}
