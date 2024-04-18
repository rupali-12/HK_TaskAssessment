// Function to validate email format
exports.validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Function to validate mobile number format
exports.validateMobile=(mobile) =>{
  const mobileRegex = /^[0-9]{10}$/;
  return mobileRegex.test(mobile);
}
