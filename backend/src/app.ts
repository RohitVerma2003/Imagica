import express from 'express';
import cors from 'cors'

import uploadRoutes from './routes/upload.routes'
import statusRoutes from './routes/status.routes'
import downloadRoutes from "./routes/download.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/upload" , uploadRoutes);
app.use("/status" , statusRoutes);
app.use("/download", downloadRoutes);

app.get("/" , (req , res)=>{
    res.send("Imagica is running");
})

export default app;