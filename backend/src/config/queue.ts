import {Queue} from 'bullmq';
import IOredis from 'ioredis';

const connection = new IOredis({
    host: process.env.REDIS_HOST || 'localhost',
    port: 6379
});

export const imageQueue = new Queue("image-processing" , {connection});