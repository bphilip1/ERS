import * as adminDao from '../dao/admin-dao';

export function findTicketsByStatus(status) {
  return adminDao.findTicketsByStatus(status);
}

export function upateStatus(updateData) {
  return adminDao.updateStatus(updateData);
}
