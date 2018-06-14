export const reimbursementReducer = (state = {}, action: any = {}) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        reimbursements: action.user.reimbursements,
        everyReimbursement: action.user.everyReimbursement
      };
    case 'SIGNUP':
      return {
        reimbursements: action.user.reimbursements,
        everyReimbursement: action.user.everyReimbursement
      };
    case 'SUBMITTED':
      return {
        reimbursements: action.reimbursement.reimbursements
      };
    default:
      return state;
  }
};
