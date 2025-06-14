import express from 'express';

import {  adminRegister } from '../controller/admin/authentication/authentication';

const route = express.Router();

route.post('/register', adminRegister)


export default route;
