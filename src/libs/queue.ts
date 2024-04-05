import queueFactory from 'smaxtec-react-native-queue'
 
export class Queue {
    static _queue: any
    
    static async instance() {
        if(Queue._queue) {
           return Queue._queue; 
        }
        const queue = await queueFactory();
        await queue.flushQueue()
        Queue._queue = queue
        return queue
    }

    static async add(data: any, jobName: string = 'websocket') {
        return (await Queue.instance()).createJob(jobName, data, {});
    }

    static async consume(cb: Function, jobName: string = 'websocket') {
        return (await Queue.instance()).addWorker(jobName, cb, {
            concurrency: 5
        })
    }
}