const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {
  let firstName = req.body.fName;
  let lastName = req.body.lName;
  let email = req.body.email;

  let data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  let jsonData = JSON.stringify(data);

  const url = "https://us19.api.mailchimp.com/3.0/lists/a4d7665679";

  const options = {
    method: "POST",
    auth: "manny:91ce4c3616cfb87b37230f4d8e60add7-us19",
  };
  const request = https.request(url, options, (response) => {
    response.on("data", (data) => {
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end;
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Listening on port ");
});
