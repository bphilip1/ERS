import * as employeeDao from '../dao/employee-dao';

// export function findAllByStatus(status: string) {
//   return ticketDao.findAllByStatus(status);
// }

export function saveTicket(reimbursement) {
  return employeeDao.saveTicket(reimbursement);
}

export function findTicket(reimbursement) {
  return employeeDao.findTicket(reimbursement.username);
}
