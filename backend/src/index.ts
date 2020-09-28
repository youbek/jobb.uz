import { connect as connectDB } from "db";
import { start as startServer } from "server";

(async function main() {
  await connectDB();
  startServer();
})();
