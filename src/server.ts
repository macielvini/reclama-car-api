import app from "./app";

const port = process.env.PORT || 5000;

app.listen({ port: port }, () =>
  console.log(`Server is running in port ${port}`)
);
