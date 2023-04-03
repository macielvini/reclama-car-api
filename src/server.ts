import app from "./app";

const port = 4000;

app.listen({ port: port }, () =>
  console.log(`Server is running in port ${port}`)
);
