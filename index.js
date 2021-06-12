const notifier = require('node-notifier');
const fs = require('fs')
const cron = require('node-cron');
const path = require('path')
require('dotenv').config({
    path: path.join(__dirname, ".env")
})

const time = parseInt(process.env.time || 20)

const logPath = path.join(__dirname, "log.txt")
fs.open(logPath, "w+")

const errorNotif = (msg) => {
    notifier.notify({
        title: '⚠⚠⚠',
        message: `${msg}\n${error}`,
        icon: path.join(__dirname, 'exclamation.png'),
        sound: true
    });
}

const reminder = () => {

    notifier.notify({
        title: '🚨🚨🚨',
        message: `Your ${time > 1 ? time : "every"} minute reminder.`,
        icon: path.join(__dirname, 'exclamation.png'),
        sound: true
    }, (err, res) => {
        fs.appendFile(logPath, `Error: ${err}, Response: ${res}`, (err) => {
            if(err){
                errorNotif("Failed to append")
            }
            else{
                console.log(`reminder every ${time} minute${time > 1 ? "s" : ""}`);
            }
        })
    });
    
}

try {
    cron.schedule(`*/${time} * * * *`, reminder);
} catch (error) {
    errorNotif("Failed to set up!")
}
