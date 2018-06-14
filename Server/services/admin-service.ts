import * as adminDao from '../dao/admin-dao';

export function findTicketsByStatus(status) {
  return adminDao.findTicketsByStatus(status);
}

export function upateStatus(userData) {
  return adminDao.updateStatus(userData.reimbursement);
}
