import { request } from 'express';
import File from '../models/file';
import BaseCtrl from './base';
const fs = require('fs');
const pdf = require('pdf-parse');
import * as AWS from 'aws-sdk';
const multerS3 = require('multer-s3');

const BUCKET_NAME = process.env.BUCKET_NAME;
const IAM_USER_KEY = process.env.IAM_USER_KEY;
const IAM_USER_SECRET = process.env.IAM_USER_SECRET;



class FileCtrl extends BaseCtrl {
  model = File;


  uploadFile = async (req: any, res: any, next: any) => {
    try {
    // const pdfParser = new PDFParser();

    const fileInformation = req.body;
      console.log(req.file)
    //   fileInformation.url = req.file.location;
      fileInformation.fileName = req.file.originalname;

      let dataBuffer = fs.readFileSync(req.file.path);

      pdf(dataBuffer).then(function(data: any) {
 
        // number of pages
        console.log(data.numpages);
        // number of rendered pages
        console.log(data.numrender);
        // PDF.js version
        // check https://mozilla.github.io/pdf.js/getting_started/
        console.log(data.version);
        // PDF text
        console.log(data.text); 
            
    });

    const s3 = new AWS.S3({
        accessKeyId: IAM_USER_KEY,
        secretAccessKey: IAM_USER_SECRET
      });

    var params = {    
            Bucket: BUCKET_NAME,
            Acl: 'public-read',
            Body: req.file.path,
            Key: 'takia-malia.pdf', // file will be saved as testBucket/contacts.csv
        };

        s3.upload(params, function(s3Err, data) {
            if (s3Err) throw s3Err
            console.log(`File uploaded successfully at ${data.Location}`)
        });

      const obj = await new File(fileInformation).save();
      res.json(obj );



    } catch (error: any) {
      console.log(error.toLocaleString());

      return res.sendStatus(500).json(error.toString());
    }
  }

  getFilesByEmail = async (req: any, res: any) => {
    try {
      const files = await File.find({ email: req.params.email });

      res.json(files);

    } catch (error: any) {
      console.log(error.toLocaleString());

      return res.sendStatus(500).json(error.toString());
    }
  }
}

export default FileCtrl;
