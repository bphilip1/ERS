export const reimbursementReducer = (state = {}, action: any = {}) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        reimbursements: action.user.reimbursements
      };
    case 'SIGNUP':
      return {
        reimbursements: action.user.reimbursements
      };
    case 'SUBMITTED':
      return {
        reimbursements: action.reimbursement.reimbursements
      };
    default:
      return state;
  }
};
