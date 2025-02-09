declare interface loginFormData {
  email: string;
  password: string;
}

declare interface signupFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  adminAccess?: boolean;
  department: {
    title: string;
  };
  role: {
    title: string;
  },
  office: string;
  gender: string;
  phone: string;
  timezone: string;
  address: {
    primary: string;
    country: string;
    state: string;
    city: string;
  };
}

declare interface EmployeeDocument {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar?: string;
  adminAccess: boolean;
  dateJoined: Date;
  office: {
      _id: string;
      title: string;
  };
  department: {
      _id: string;
      title: string;
  };
  role: {
      _id: string;
      title: string;
  };
  status: string;
  timezone: string;
  gender: string;
  address: {
      _id: string;
      primary: string;
      country: string;
      state: string;
      city: string;
  };
  phone?: string;
}

declare interface AddressDocument {
  _id: string;
  primary: string;
  country: string;
  state: string;
  city: string;
}