require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dns = require('dns');
const fs = require('fs');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});


const LoadAddSaveJsonObject = (action, newJsonObject) => {
  let filePath = "./public/data.json";
  if (!fs.existsSync(filePath)) {
    fs.closeSync(fs.openSync(filePath, 'w'));
  }

  let fileData = fs.readFileSync(filePath);
  
  if (action == "Save new JSON Object" && newJsonObject != null) {
    if (fileData.length == 0) {
      fs.writeFileSync(filePath, JSON.stringify([newJsonObject], null, 2));
    } 
    else {
      let existJsonObject = JSON.parse(fileData.toString());
      let existOriginalURL = existJsonObject.map(obj => obj.original_url);
      let isExist = existOriginalURL.includes(newJsonObject.original_url);     
      if (!isExist) {
        existJsonObject.push(newJsonObject);
        fs.writeFileSync(filePath, JSON.stringify(existJsonObject, null, 2));
      }
    }
  }
  else if (action == "Load JSON objects" && newJsonObject == null) {
    if (fileData.length == 0) { 
      return; 
    }
    else {
      return JSON.parse(fileData);
    }
  }
}

const generateShortURL = () => {
  const existJsonObject = LoadAddSaveJsonObject("Load JSON objects");
  
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const length = 6;

  const generateRandomString = () => {
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };


  if (existJsonObject === undefined) {
    return generateRandomString();
  }

  const existingShortURLs = existJsonObject.map(obj => obj.short_url);

  let shortURL;
  do {
    shortURL = generateRandomString();
  } while (existingShortURLs.includes(shortURL));

  return shortURL;
};


app.post("/api/shorturl", (req, res) => {  
  inputURL = req.body.url;
  if (inputURL === null || inputURL === "")
    return res.json({ error: 'invalid url' }); 

  let domain = inputURL.match(/^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/?\n]+)/igm);
  if (!domain)
    return res.json({ error: "invalid url" });
  
  let param = domain[0].replace(/^https?:\/\//i, "");

  dns.lookup(param, (err, urlIp) => {
    if (err) {
      console.log(urlIp);
      return res.json({ error: 'invalid url' });
    }
    else {
      const newShortURL = generateShortURL();
      const newJsonObject = {original_url : inputURL, short_url : newShortURL};
      LoadAddSaveJsonObject("Save new JSON Object", newJsonObject);
      return res.json(newJsonObject);
    }
  });
});

app.get("/api/shorturl/:shorturl", (req, res) => {
  const inputURL = req.params.shorturl;
  const existJsonObject = LoadAddSaveJsonObject("Load JSON objects");
  const existShortURL = existJsonObject.map(obj => obj.short_url);
  const isExist = existShortURL.includes(inputURL);

  if (isExist && existJsonObject !== undefined) {
    const objectFound = existJsonObject[existShortURL.indexOf(inputURL)];
    res.redirect(objectFound.original_url);
  } else {
    res.json({ data: "No matching data", short: inputURL, existing: existShortURL });
  }
});