require('dotenv').config();
const csvHandler = require('./csvHandler.js');
const express = require('express');
const request = require('request');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const { Parser } = require('json2csv');
const stringify = require('csv-stringify');
// const jsonp = require('jsonp');
const fs = require('fs');

callback = (obj) => obj
const app = express();
app.use(express.json());
app.use(cors());
app.enable("jsonp callback");
// app.use(express.static('images_download'));
// app.use('/images', express.static('images_download'))
app.use('/content', express.static('./images_download'));

// app.use('/static', express.static(path.join(__dirname, 'images_download')))

// Serve static files from the React frontend app
// app.use(express.static(path.join(__dirname, 'client/build')))
// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname,  'client/build/index.html'))
})

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));

const dateNow = Date.now();

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images/')
  },
  filename: function (req, file, cb) {
    cb(null, dateNow + path.extname(file.originalname)) //Appending extension
  }
})

const access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik1FVTBOalpGTmpNM1FqTXpOek00TURWR1JFTTJNREk1TXpFeFJUazVNVGxEUkRZMk1rRkJPUSJ9.eyJodHRwczovL2FwaS5zeXBodC5jb20vY29tcGFueUlkIjoiNzZiNzdjZjYtMTU5OS00ZTBjLWJmMzYtM2JkODMwNjY2ZWQxIiwiaXNzIjoiaHR0cHM6Ly9sb2dpbi5zeXBodC5jb20vIiwic3ViIjoiTEhoa0NNdUpzTjIyS2h6bkN5MEhRZ0dkakxRWDRFV0lAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vYXBpLnN5cGh0LmNvbSIsImlhdCI6MTU2NjQ2MzM3NCwiZXhwIjoxNTY2NTQ5Nzc0LCJhenAiOiJMSGhrQ011SnNOMjJLaHpuQ3kwSFFnR2RqTFFYNEVXSSIsInNjb3BlIjoicmVzdWx0OmFsbCBmaWxldXBsb2FkOmFsbCBhZG1pbmlzdHJhdGlvbjpjb21wYW55IiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.aCkzG32Nlm76RVIJzqUqtAov-oML5nUobugHDwRlMii9mDeuwdwXbAtu9R_tikMNejYrr9eYKDZtLDiephXKftwAJghrva92BW9Cq2yitYUMxqOsxd1bM1TRlaod9Qoh6vGjBbEiqTA_xJwnDLG0XvMh6V7KxR-piTb6WizkvBT7UDgSNbjEI0SpRmrtlOWTFLgI7OazGparPkzpbfvnlKrUOYmJsYidYmThnSQfH7ipeFZP_I95xK72EjT_9M4I_bTWN4h7ZCnEn5GK1OI4HyzEFEU2X52gjrmrX41W-HBKKJYLvnIliF4vz5f9RWFygoQ8KpF5OHUT_hU6brzK8A"
var upload = multer({ storage: storage });

app.post('/upload', upload.single('upload'), (req, res) => {
  
  let options = {
    url:'https://api.sypht.com/fileupload',
    formData: {
      fileToUpload:fs.createReadStream(__dirname + `/${req.file.path}`),
      fieldSets:JSON.stringify(['sypht.invoice','sypht.document'])
    },
    headers: {
      'Authorization' : `Bearer ${access_token}`
    },
    json:true
  }

  request.post(options, (error, response, body) => {
  if (error) {
    console.log(error);
  }
    console.log({body, response});
    res.send(response.body);
  })
});

app.post('/getToken', (req, res) => {
  let options = {
    url:'https://login.sypht.com/oauth/token',
    body:{
      client_id: 'LHhkCMuJsN22KhznCy0HQgGdjLQX4EWI',
      client_secret: 'xzwrmJisAT7QNoR1wVDjsasGITPqGCGZONHo1JnObRnrfx6NIlHptheXYselA_Vj'
      ,
      audience: "https://api.sypht.com",
      grant_type: "client_credentials"
    },
    headers:{
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    json:true
  }

  request.post(options, (error, response, body) => {
    console.log(response);
    console.log(body);
    res.send(body);
  })
}
);



// create a GET route
app.post('/getFields', (req, res) => {
  const directory = __dirname + '/images'
  fs.readdir(directory, (err, files) => {
    if (err) throw err;
    for (const file of files) {
      fs.unlink(path.join(directory, file), err => {
        if (err) throw err;
      });
    }
  });

  const fileId = req.body.fileId
  let options = {
    url:`https://api.sypht.com/result/final/${fileId}`,
    headers:{
      'Authorization': `Bearer ${access_token}`
    },
    json:true
  }
  
  request.get(options, (error, response, body) => {
    res.send(response.body.results);
  })
});

app.post('/checkAbn', (req, res) => {
  function callBack(resss) {
    console.log('here')
    function callback(obj) {
      console.log('obj', obj);
      return obj;
    };
    return resss;
  }

  const number = req.body.number;
  const guid = '6fe924c9-491e-4291-b61f-9bc3a540971b';
  const url = `https://abr.business.gov.au/json/AbnDetails.aspx?abn=${number}&callback=callback&guid=${guid}`;
  request.get(
    url,
    (error, response, body) => {
      res.json(response.body); 
  })
});

app.post('/getCsv', (req, res) => {
  const filename = "report" + ".csv";

  const fieldsCopy = req.body;
  const fieldsKeys = Object.keys(fieldsCopy[0]);

  const json2csvParser = new Parser({ fieldsKeys });
  const csv = json2csvParser.parse(fieldsCopy);


  // res.setHeader('Content-Type', 'text/csv');
  // res.setHeader('Content-Disposition', 'attachment; filename=\"' + 'download-' + Date.now() + '.csv\"');
  // res.setHeader('Cache-Control', 'no-cache');
  // res.setHeader('Pragma', 'no-cache');

  // stringify(fieldsCopy, { header: true })
  //   .pipe(res);

  // csvHandler.downloadCsv(fieldsCopy, req, res) 


  // const replacer = (key, value) => { return value === null ? '' : value } 
  // let csv = fieldsCopy.map((row) => {
  //   return fieldsKeys.map((fieldName) => {
  //     return JSON.stringify(row[fieldName], replacer)
  //   }).join(',')
  // })
  // csv.unshift(fieldsKeys.join(','));
  // console.log(csv.join('\r\n'));
  // const csvReady = csv.join('\r\n');
  console.log(csv);
  // res.attachment(filename);
  // res.send(csv, 'UTF-8');
  res.setHeader('Content-Disposition', 'attachment; filename=testing.csv');
  res.set('Content-Type', 'text/csv');
  res.status(200).send(csv);
});


app.post('/getImage', (req, res) => {
  const fileId = req.body.fileId;
  let options = {
    url:`https://api.sypht.com/result/image/${fileId}`,
    headers:{
      'Authorization': `Bearer ${access_token}`
    },
    encoding:null
  }
  request.get(options, (error, response, body) => {
    console.log(response);
    fs.writeFileSync(`images_download/img_${fileId}.png`, body);
  })
  res.send(fileId);
});

