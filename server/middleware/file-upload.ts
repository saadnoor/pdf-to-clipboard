const multer  = require('multer');


const upload = multer({
//   storage: multerS3({
//     s3: s3bucket,
//     bucket: BUCKET_NAME,
//     acl: 'public-read',
//     metadata: (req: any, file: any, cb: any) => cb(null, {fieldName: file.fieldname}),
//     key: (req: any, file: any, cb: any) => cb(null, )
//   })
dest: 'uploads/' 
});

export default upload;
