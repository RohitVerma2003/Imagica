import {Queue} from 'bullmq';
import IOredis from 'ioredis';

const connection = new IOredis();

export const imageQueue = new Queue("image-processing" , {connection});