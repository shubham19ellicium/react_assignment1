export const validateEmailExtension = (string) => {
  var arr = string.split("@");
  if (arr.length > 1) {
    var min = arr[1].split(".");
    const hasDuplicates = (arr) => arr.length !== new Set(arr).size;
    if (min.length > 2) {
      return false;
    } else if (hasDuplicates(min)) {
      return false;
    } else {
      return true;
    }
  }
};

export const emailValidation = (params) => {
  if (
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(params) &&
    validateEmailExtension(params)
  ) {
    return true;
  }
  return false;
};

export function numberValidation(params) {
    let phoneNumber = params;
    var regex = /\D/g;

    if (phoneNumber.length === 0) {
        return false
    } else if (regex.test(phoneNumber)) {
        return false
    } else if (phoneNumber.length < 10) {
        return false
    } else {
        return true
    }
}
