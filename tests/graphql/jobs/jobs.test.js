const apolloServer = require("../../../apolloServer").createApolloServer();
const db = require("../../../db");
const { newJob } = require("./dummyData");
const { createTestClient } = require("apollo-server-testing");

beforeAll(async () => {
  await db.connect(process.env.DB_URL);
});

test("New job post", async () => {
  const { mutate } = createTestClient(apolloServer);

  mutate({
    mutation: "PostJob",
    variables: newJob,
  });
});
