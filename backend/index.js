import app from "./src/app.js";


const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on port no. ${port}`);
});
