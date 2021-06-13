export function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}


const availibleRules = {
  required(value) {
    return value ? '' : 'Pole wymagane!';
  },
  length(value, rule) {
    if (value.length < rule.length) {
      return `minimalna ilość znaków to: ${rule.length}`
    } else {
      return ''
    }
  },
  email(value) {
    if (validateEmail(value)) {
      return '';
    } else {
      return 'Niepoprawny mail'
    }
  },
  password(value) {
    if (value.length <= 5) {
      return 'Minimalna ilość znaków to 6'
    } else {
      return ''
    }
  },
  changePassword(value) {
    if (value.length === 0 || value.length > 5) {
      return ''
    } else {
      return 'Minimalna ilość znaków to 6'
    }
  },
  checkbox(value) {
    if (value) {
      return ''
    } else {
      return 'Akceptacja regulaminu jest wymagana'
    }
  }
}

export function validation(rules = [], value) {

  for (let i = 0; i < rules.length; i++) {
    let rule = rules[i];
    if (rule instanceof Object) {
      const errorMessage = availibleRules[rule.rule](value, rule);
      if (errorMessage) {
        return errorMessage;
      }

    } else {
      const errorMessage = availibleRules[rule](value);
      if (errorMessage) {
        return errorMessage;
      }
    }
  }
  return '';

}