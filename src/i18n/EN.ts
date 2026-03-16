export const en = {
  common: {
    hi: "Hi",
    save: "Save",
    continue: "Continue",
    signOut: "Sign Out",
    ok: "OK",
    cancel: "Cancel",
    openSettings: "Open settings",
  },
  biometric: {
    FaceID: {
      title: "Secure Your Account\nwith Face ID",
      message:
        "This is how we make sure that only you can\naccess your wallet.",
      enableBTN: "Enable Face ID",
    },
    TouchID: {
      title: "Secure Your Account\nwith Touch ID",
      message:
        "This is how we make sure that only you can\naccess your wallet.",
      enableBTN: "Enable Touch ID",
    },
    Biometrics: {
      title: "Secure Your Account\nwith Fingerprint Authentication",
      message:
        "This is how we make sure that only you can\naccess your wallet.",
      enableBTN: "Enable Fingerprint",
    },
    promtMessage: "Confirm your fingerprint",
    cancelButtonText: "Cancel",
  },
  input: {
    email: {
      label: "Email",
      placeholder: "Enter your email",
    },
    login: {
      label: "Tên đăng nhập",
      placeholder: "Nhập tên đăng nhập",
    },
    password: {
      label: "Password",
      placeholder: "Enter your password",
    },
    fullName: {
      label: "Full name",
      placeholder: "Enter your full name",
    },
  },
  errorMessage: {
    input: {
      compare: "{{input}} must match",
      required: "Please, make sure you fill in {{input}}.",
      incorrect: "Please, make sure you fill correct information.",
      invalid: "Invalid {{input}}.",
      mesExtensionOne: "Please upload only pdf, png, jpg, jpeg format",
      bankAccountNumber: "The account number must be between 10 and 15 digits.",
      email: "Please enter a valid email address",
      dob: "You must be at least 18 years old to use this app.",
      password: {
        uppercase: "Password must contain at least one uppercase letter.",
        lowercase: "Password must contain at least one lowercase letter.",
        number: "Password must contain at least one number.",
        mismatch: "Passwords do not match.",
      },
      incorrectEmail: "Vui lòng nhập đúng định dạng email",
      maxImage: "Vui lòng tải file nhỏ hơn hoặc bằng 5MB",
    },
    minLength: " the length must be larger than or equal to {{length}}",
    maxLength: " the length must be less than or equal to {{length}}",
  },
};

export type TTranslations = typeof en;
