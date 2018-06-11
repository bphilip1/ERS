import express from 'express';
import { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';

import webpack from 'webpack';
//webpack configuration file
import webpackConfig from '../webpack.config';
//webpack server
import webpackDevMiddleware from 'webpack-dev-middleware';
//updates components in realtime
// import webpackHotMiddleware from 'webpack-hot-middleware'
//provides istory object to go to different routes in react router
import historyApiFallback from 'connect-history-api-fallback';

const app = express();

const port = 3000;
app.set('port', port);

// app.use((req: Request, resp: Response, next: NextFunction) => {
//   console.log(`request was made with url: ${req.path}
//     and method: ${req.method}`);
//   next();
// });

// fs.readFile(__dirname + '/dao/dummy-data/ticket-data.json', 'utf8', (err, data) => {
//     console.log(data)
//     const tickets = JSON.parse(data); // create an array of movie objects from the string
//     recursiveSave(tickets, 0);
//   })

//   function recursiveSave(arr, i) {
//     console.log(`saving ${arr[i].username}`);
//     ticketDao.saveTicket(arr[i])
//       .then(() => {
//         if(i >= arr.length) {
//           console.log('done');
//           return;
//         }
//         i++;
//         recursiveSave(arr, i);
//       })
//       .catch(() => {
//         if(i >= arr.length) {
//           console.log('done');
//           return;
//         }
//         i++;
//         recursiveSave(arr, i);
//       })
//   }
/************************************************************
 Register  Body parser
 *************************************************************/

app.use(bodyParser.json());

/************************************************************
 Register  Routers
 *************************************************************/

// import { routes } from "./routes";
import Routes from './routes';
const routes = Routes(app);
const isDev = process.env.NODE_ENV !== 'production';
if (isDev) {
  // stores tailored webpack config to variable
  const compiler = webpack(webpackConfig);

  /* 
  when using the html5 history api, you will want index.html to be served in 
  place of 404 repsonses. The window object exposes a history object with its own 
  properties and methods is the very history object that react router uses for 
  single page navigation. It is set to true at the bottom of the webpack.config.
  */
  app.use(
    historyApiFallback({
      // when set to true, will print redirects to console i.e.:
      // Rewriting GET /practice/1 to /index.html
      verbose: false
    })
  );

  // force webpackdev to use webpack config
  // ??
  app.use(
    webpackDevMiddleware(compiler, {
      // tells server where to serve bundles from and takes precedence
      // bundled files will be available in browser on localhost:port
      publicPath: webpackConfig.output.publicPath,

      // hmr
      hot: true,

      // tells server where to serve content (static files) from
      // will current dir as base but can be changed
      contentBase: path.resolve(__dirname, '../client/public')
    })
  );

  // force webpackhot to use webpack config file
  // app.use(webpackHotMiddleware(compiler))

  // ?
  app.use(express.static(path.resolve(__dirname, '../dist')));
} else {
  app.use(express.static(path.resolve(__dirname, '../dist')));

  // routes every request to index file in dist folder
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../dist/index.html'));
    res.end();
  });
}

app.listen(port, () => {
  console.log(`app is running at http://localhost: ${app.get('port')}`);
});
