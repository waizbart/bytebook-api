import app from "./app";
import { ConsoleColors } from "./classes/ConsoleColors";

const port = process.env.PORT;

app.listen(port, () => {
  console.log(
    ConsoleColors.Green,
    `Server running on: ${process.env.API_URL}.`
  );
});
