import { Router, Application } from 'express';

import UserCtrl from './controllers/user';
import FileCtrl from './controllers/file';
import upload from './middleware/file-upload';
import extractContent from './middleware/pdf-extract';

const setRoutes = (app: Application): void => {
  const router = Router();
  const userCtrl = new UserCtrl();
  const fileCtrl = new FileCtrl();
  // Users
  router.route('/login').post(userCtrl.login);
  router.route('/users').get(userCtrl.getAll);
  router.route('/users/count').get(userCtrl.count);
  router.route('/user').post(userCtrl.insert);
  router.route('/user/:id').get(userCtrl.get);
  router.route('/user/:id').put(userCtrl.update);
  router.route('/user/:id').delete(userCtrl.delete);


  // Files
  router.route('/files').get(fileCtrl.getAll);
  router.route('/files/:email').get(fileCtrl.getFilesByEmail);
  router.route('/files/count').get(fileCtrl.count);
  router.route('/file').post(upload.single('file'), fileCtrl.uploadFile);
  router.route('/file/:id').get(fileCtrl.get);
  router.route('/file/:id').put(fileCtrl.update);
  router.route('/file/:id').delete(fileCtrl.delete);

  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

};

export default setRoutes;
