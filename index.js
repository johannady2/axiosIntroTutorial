import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://bored-api.appbrewery.com/random");
    const result = response.data;
    //console.log(result);
    res.render("index.ejs", { data: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }

});

app.post("/", async (req, res) => {
  //console.log(req.body);
  console.log(req.body.type);
  console.log(req.body.participants);

    let linkToLoad = `https://bored-api.appbrewery.com/filter?type=${req.body.type}&participants=${req.body.participants}`;

  try {
    const response = await axios.get(linkToLoad);
    const result = response.data;
    console.log('The RESULT inside try:' + result[Math.floor(Math.random() * result.length)]);
    //console.log('random result is' + result[Math.floor(Math.random() * result.length)]);
    res.render("index.ejs", {
      data: result[Math.floor(Math.random() * result.length)],
    });

  } catch (error) {
      

      let errorMessage = error.message;
       //console.error("Failed to make request:", error.message);
      console.log('error message:'+ errorMessage);
       res.render("index.ejs", {   error: "No result matches your criteria."   });
  
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
