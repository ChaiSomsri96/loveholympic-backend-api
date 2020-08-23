import { CronJob } from 'cron';

const job = new CronJob({
  cronTime: '*/5 * * * * *',
  onTick: () => {
    console.log('tick');
  },
  timeZone: 'Asia/Ho_Chi_Minh',
});
job.start();
