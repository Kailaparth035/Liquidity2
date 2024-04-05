export const TRANSACTION_STATUS = {
  SUCCESS: 'SUCCESS',
  Processing: 'PROCESSING',
  Failure: 'FAILED',
  Cancelled: 'CANCELLED',
};

export const TRANSACTION = {
  Withdrawal: 'incoming',
  Deposit: 'outgoing',
};
export const WITHDRAW_DETAILS = [
  {title: 'Bank', value: 'Bank of America'},
  {title: 'Account Number', value: '2939'},
  {title: 'Transaction ID', value: '1234565789'},
  {title: 'Time & Date', value: '11:23PM, 22 Sep 2022'},
  {title: 'fees', value: '2$'},
  {title: 'Total', value: '$916.36'},
];
export const DEPOSIT_DETAILS = [
  {title: 'Bank', value: 'Bank of America'},
  {title: 'Account Number', value: '2939'},
  {title: 'Transaction ID', value: '1234565789'},
  {title: 'Time & Date', value: '11:23PM, 22 Sep 2022'},
];

export const TRANSACTION_DATA = [
  {
    transactionType: 'Deposit',
    amount: '924.00',
    status: 'Completed',
    bankName: 'Bank of America',
    accountNo: '1234',
    day: 'Today',
    dateAndTime: '11:23PM, 22 Sep 2022',
    transaction_ID: '1234565789',
    fees: '2$',
    Total: '$916.36',
  },
  {
    transactionType: 'Withdrawal',
    amount: '123.22',
    status: 'Processing',
    bankName: 'Bank of America',
    accountNo: '3456',
    day: '23 May,2022',
    dateAndTime: '11:23PM, 22 Sep 2022',
    transaction_ID: '1234565789',
    fees: '2$',
    Total: '$916.36',
  },
  {
    transactionType: 'Withdrawal',
    amount: '111.44',
    status: 'Failure',
    bankName: 'Bank of America',
    accountNo: '4433',
    day: 'Today',
    dateAndTime: '11:23PM, 22 Sep 2022',
    transaction_ID: '1234565789',
    fees: '2$',
    Total: '$916.36',
  },
  {
    transactionType: 'Deposit',
    amount: '987.89',
    status: 'Completed',
    bankName: 'Bank of America',
    accountNo: '8738',
    day: 'Yesterday',
    dateAndTime: '11:23PM, 22 Sep 2022',
    transaction_ID: '1234565789',
    fees: '2$',
    Total: '$916.36',
  },
];

export const getType = (type: any) => {
  if (type !== TRANSACTION.Withdrawal) {
    return 'Withdrawal';
  } else {
    return 'Deposit';
  }
};
