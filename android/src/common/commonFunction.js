const MobileNumberPattern = /^[1-9]{1}[0-9]{9}$/;
export const validateMobileNumber = mobileNumber => {
  return MobileNumberPattern.test(mobileNumber);
};
