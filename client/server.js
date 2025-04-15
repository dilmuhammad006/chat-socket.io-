import bodyParser from "body-parser";
import express from "express";
import { join } from "path";
import { engine } from "express-handlebars";

const app = express();

app.use("/js", express.static(join(process.cwd(), "js")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.engine(
  "hbs",
  engine({
    extname: "hbs", 
  })
);

app.set("view engine", "hbs");
app.set("views", join(process.cwd(), "pages", "views")); 

app.get("/", (req, res) => {
  res.render("index"); 
});
app.get("/page/login", (req, res) => {
  res.render("login"); 
});

app.listen(4000, () => {
  console.log(`http://localhost:4000`);
});
