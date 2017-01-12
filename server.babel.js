import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import routermgr from './src/infra/route-manager';

const app = express();

// Setting Express to use EJS templating
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));
// app.use(express.static('public'));

// Middleware
app.use(bodyParser.json());                       // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

routermgr.handle(app);

app.listen(3000, () => {
  console.log('Server listening at port 3000');
});
