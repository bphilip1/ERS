// import express from 'express'
// import {Request,Response,NextFunction} from 'express';
// import * as ticketService from '../services/ticket-service';
// export const ticketRouter = express.Router();

// ticketRouter.get('/status/:status',
//     (req, resp: Response, next) => {
//       // Object.keys(req).forEach(key => {
//       //   console.log(key)
//       // });
//       ticketService.findAllByStatus(req.params.status)
//         .then(data => {
//         Object.keys(data).forEach(key => {
//           console.log('key', key)
//          });
//           console.log('data: ', data)
//           resp.json(data.Items);
//         })
//         .catch(err => {
//           console.log(err);
//           resp.sendStatus(500);
//         });
//     }
//   );

// //   ticketRouter.get('/username/:username/timesubmitted/:timesubmitted',
// //   (req, resp: Response, next) => {
// //     ticketService.findAllByTime(req.params.username, req.params.timesubmitted)
// //       .then(data => {
// //         resp.json(data.Items);
// //       })
// //       .catch(err => {
// //         console.log(err);
// //         resp.sendStatus(500);
// //       });
// //   }
// // );

//   ticketRouter.post('',
//     (req, resp) => {
//       console.log(req.body);
//       ticketService.saveTicket(req.body)
//       .then(data => {
//         resp.json(data);
//       })
//       .catch(err => {
//         console.log(err);
//         resp.sendStatus(500);
//       });
//     });

//   ticketRouter.put('', (req, resp) => {
//       ticketService.update(req.body)
//           .then(data => {
//             resp.json(data);
//           })
//           .catch(err => {
//             console.log(err);
//             resp.sendStatus(500);
//           });
//       });
