const express = require("express");
const bodyParser = require("body-parser");
// const request = require("request");
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
    auth: "manny1:91ce4c3616cfb87b37230f4d8e60add7-us19",
  };

  const request = https.request(url, options, (response) => {
    if (response.statusCode == 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }
    // response.on("data", (data) => {
    //   console.log(JSON.parse(data));
    // });
  });

  request.write(jsonData);
  request.end();
});

app.post("/failure", (req, res) => {
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});

//mailChimp API Key
// 91ce4c3616cfb87b37230f4d8e60add7-us19

//Unique id for email list
//a4d7665679
