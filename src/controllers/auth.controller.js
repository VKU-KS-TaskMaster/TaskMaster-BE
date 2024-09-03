import AuthService from "@/services/auth.service";

const AuthController = {
  signInDefault: async (req, res, next) => {
    try {
      const message = await AuthService.signIn(req.body);

      return res.status(200).json(message);
    } catch (errors) {
      next(errors);
    }
  },
  signUpDefault: async (req, res, next) => {
    try {
      const message = await AuthService.signUp(req.body);

      return res.status(200).json(message);
    } catch (errors) {
      next(errors);
    }
  },
  verifySignUp: async (req, res, next) => {
    try {
      const message = await AuthService.verifySignUp(req.body);

      return res.status(200).json(message);
    } catch (errors) {
      next(errors);
    }
  },
  signInGoogle: async (req, res, next) => {
    try {
      const message = await AuthService.signInGoogle(req.body);
      if (!message)
        return res.status(403).json({ message: "Invalid credentials" });
      return res.status(200).json({ message: message });
    } catch (errors) {
      next(errors);
    }
  },
  signUpGoogle: async (req, res, next) => {
    try {
      const message = await AuthService.signUpGoogle(req.body);

      return res.status(200).json(message);
    } catch (errors) {
      next(errors);
    }
  },
  logout: async (req, res, next) => {
    try {
      const message = await AuthService.logout(req.body);

      return res.status(200).json(message);
    } catch (errors) {
      next(errors);
    }
  },
  forgotPassword: async (req, res, next) => {
    try {
      const message = await AuthService.forgotPassword(req.body);

      return res.status(200).json(message);
    } catch (errors) {
      next(errors);
    }
  },
  verifyForgotPassword: async (req, res, next) => {
    try {
      const message = await AuthService.verifyForgotPassword(req.body);

      return res.status(200).json(message);
    } catch (errors) {
      next(errors);
    }
  },
};

export default AuthController;
