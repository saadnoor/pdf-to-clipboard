import { request, response } from 'express';
import File from '../models/file';
import BaseCtrl from './base';
const fs = require('fs');
const pdf = require('pdf-parse');
import * as AWS from 'aws-sdk';
import { PutObjectRequest } from 'aws-sdk/clients/s3';
const multerS3 = require('multer-s3');

const BUCKET_NAME = process.env.BUCKET_NAME;
const IAM_USER_KEY = process.env.IAM_USER_KEY;
const IAM_USER_SECRET = process.env.IAM_USER_SECRET;



class FileCtrl extends BaseCtrl {
  model = File;


  uploadFile = async (req: any, res: any, next: any) => {
    try {
    const fileInformation = req.body;

      fileInformation.fileName = req.file.originalname;

    await Promise.all( [getTextFromPDF(req.file.path), uploadFileToS3(req.file.path, req.file.originalname)])
            .then(async ([text, location]) => {
                fileInformation.url = location;
                fileInformation.content = text;
                ;
            })
    
    const [response, _y] = await Promise.all([new File(fileInformation).save(), fs.promises.unlink( req.file.path )])
    
    res.json(response );

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

async function uploadFileToS3(filePath: string, originalname: string,): Promise<any>  {

    return new Promise<any>((resolve, reject) => {

        const s3 = new AWS.S3({
            accessKeyId: IAM_USER_KEY,
            secretAccessKey: IAM_USER_SECRET
          });
    
        var params = {    
                Bucket: BUCKET_NAME,
                Acl: 'public-read',
                Body: filePath,
                Key: `${Date.now().toString()}${originalname}`,
            };
    
        s3.upload(params as PutObjectRequest, function(s3Err, data) {
                if (s3Err) throw reject(s3Err);
                else resolve(data.Location)
        });
    });
 
}

async function getTextFromPDF(filePath: string): Promise<any>  {

    return new Promise<any>((resolve, reject) => {
        let dataBuffer = fs.readFileSync(filePath);

        pdf(dataBuffer).then( (data: any) => resolve(data.text))
      });
}



export default FileCtrl;
