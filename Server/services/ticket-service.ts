import * as ticketDao from '../dao/ticket-dao'

export function findAllByStatus(status: string) {
    return ticketDao.findAllByStatus(status);
  }

// export function findAllByTime(username: string, timesubmitted: number) {
//   return ticketDao.findAllByTime(username, timesubmitted);
// }

  export function saveTicket(reimbursement) {
    return ticketDao.saveTicket(reimbursement);
  }

  export function update(reimbursement) {
    return ticketDao.update(reimbursement);
  }