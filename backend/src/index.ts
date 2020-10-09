import { connect as connectDB } from "db";
import { start as startServer } from "server";
import "moment/locale/ru";

(async function main() {
  await connectDB();
  await startServer();
})();
