import * as mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
  url: String,
  uploadTime: Date,
  email: String,
  isDeleted: { type: Boolean, default: false },
  content: String,
  fileName: String,
});

const File = mongoose.model('File', fileSchema);

export default File;
