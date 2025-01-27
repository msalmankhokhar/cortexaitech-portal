declare interface loginFormData {
  email: string;
  password: string;
}

declare interface signupFormData {
  email: string;
  password: string;
  name: string;
  admin?: boolean;
  role?: {
    primary?: string;
    secondary?: string;
  };
}