const Queue = require('bull');
const redisConfig = require('../config/redis');
const jobs = require('../jobs');
const RegistrationMail = require('../jobs/RegistrationMail');

// const queues = Object.values(jobs).map(job => ({
//     bull: new Queue(job.key, redisConfig),
//     name: job.key,
//     handle: job.handle,
//     option: {},
// }));

const queues = [
    {
      bull: new Queue(RegistrationMail.key, redisConfig),
      name: RegistrationMail.key,
      handle: RegistrationMail.handle,
      options: RegistrationMail.options || {},  // Certificando-se de definir options ou um objeto vazio
    },
    // ... outras filas
  ];

module.exports = {
    queues,
    add(name, data) {
        const queue = this.queues.find(queue => queue.name === name);

        if (!queue) {
            console.error(`Queue with name '${name}' not found.`);
            return;
        }

        if (!queue.bull) {
            console.error(`Bull object is undefined for queue with name '${name}'.`);
            return;
        }

        if (!queue.options) {
            console.error(`Options object is undefined for queue with name '${name}'.`);
            return;
        }

        return queue.bull.add(data, queue.option);
    },
    process() {
        return this.queues.forEach(queue => {
            queue.bull.process(queue.handle);

            queue.bull.on('failed', (job, err) => {
                console.log('Job failed', queue.key, job.data);
                console.log(err);
            });
        });
    },
};
