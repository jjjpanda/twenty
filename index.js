const notifier = require('node-notifier');
const fs = require('fs')
const cron = require('node-cron');
const path = require('path')
require('dotenv').config({
    path: path.join(__dirname, ".env")
})

const intervalTime = parseInt(process.env.intervalTime || 20)
const notificationTime =  parseInt(process.env.notificationTime || 20) * 1000

const logPath = path.join(__dirname, "log.txt")

const errorNotif = (msg) => {
    notifier.notify({
        title: '⚠⚠⚠',
        message: `${msg}\n${error}`,
        icon: path.join(__dirname, 'exclamation.png'),
        sound: true
    });
}

const appendLog = (msg, successCallback) => {
    fs.appendFile(logPath, msg, (err) => {
        if(err){
            errorNotif("Failed to append")
        }
        else{
            successCallback()
        }
    })
}

const reminder = () => {
    notifier.notify({
        title: '🚨🚨🚨',
        message: `Your ${intervalTime > 1 ? intervalTime : "every"} minute reminder.`,
        icon: path.join(__dirname, 'exclamation.png'),
        sound: true,
        time: notificationTime
    }, (err, res) => {
        appendLog(`${new Date().toISOString()} -> Error: ${err}, Response: ${res}\n`, () => {
            console.log(`reminder every ${intervalTime} minute${intervalTime > 1 ? "s" : ""}`);
        })
    });
}

/**
 * Driver
 */
fs.open(logPath, "w+", (err, fd) => {
    if(!err){
        appendLog(`${new Date().toISOString()} -> Started`, () => {
            try {
                cron.schedule(`*/${intervalTime} * * * *`, reminder);
            } catch (error) {
                errorNotif("Failed to set up cron")
            }  
        })
    }
    else{
        errorNotif("Failed to set up log")
    }
})

