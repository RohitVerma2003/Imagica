import app from "./app";
import { startCleanupCron } from "./cron/cleanup.cron";

const PORT = process.env.PORT || 5000;
startCleanupCron();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});