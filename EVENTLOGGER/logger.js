const fs=require('fs')
const os=require('os')

const EvenEmitter=require('events')

class Logger extends EvenEmitter
{
    log(message){
        this.emit('message',{message})

    }
}
const logger=new Logger()

const logFile='./eventlog.txt'

const logToFile=(event)=>{
    const logMessage=`${new Date().toISOString()}-${event.message} \n}`
    fs.appendFileSync(logFile,logMessage)
}

logger.on('message',logToFile)

logger.log('Application started');
logger.log('Application event occurred');

// Emit memory usage logs periodically
setInterval(() => {
    const memoryUsage = (os.freemem() / os.totalmem()) * 100;
    logger.log(`Current memory usage: ${memoryUsage.toFixed(2)}%`);
}, 5000);