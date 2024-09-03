import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";

import admin from "@/core/firebase-admin.config";
import { auth } from "@/core/firebase.config";
import {
    authForgotPasswordSchema,
    authLogoutSchema,
    authSignInDefaultSchema,
    authSignUpDefaultSchema,
    authSignUpGoogleSchema,
    authVerifyForgotPasswordSchema,
    authVerifySignUpSchema,
} from "@/models/auth.model";
import UserService from "@/services/userInfo.service";

const AuthService = {
  signIn: async (params) => {
    const { error, value } = authSignInDefaultSchema.validate(params);

    if (error) {
      throw new Error(`Validation error: ${error.details[0].message}`);
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await UserService.store(user);
      return user;
    } catch (error) {
      console.log(error);
    }
  },
  signUp: async (params) => {
    const { error, data } = authSignUpDefaultSchema.validate(params);

    if (error) {
      throw new Error(`Validation error: ${error.details[0].message}`);
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.pass_word
      );
      const user = userCredential.user;

      await UserService.create(user);

      return user;
    } catch (error) {
      console.log(error);
    }
  },
  signInGoogle: async (params) => {
    try {
      const { token } = params;
      const user = await admin.auth().verifyIdToken(token);
      console.log("🚀 ~ signInGoogle: ~ user:", user)
      return "Đăng nhập thành công";
    } catch (error) {
      return null;
    }
  },
  signUpGoogle: async (params) => {
    const { error, data } = authSignUpGoogleSchema.validate(params);

    if (error) {
      throw new Error(`Validation error: ${error.details[0].message}`);
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.pass_word
      );
      const user = userCredential.user;

      await UserService.create(user);

      return user;
    } catch (error) {
      console.log(error);
    }
  },
  verifySignUp: async (params) => {
    const { error, data } = authVerifySignUpSchema.validate(params);
  },
  forgotPassword: async (params) => {
    const { error, data } = authForgotPasswordSchema.validate(params);
  },
  verifyForgotPassword: async (params) => {
    const { error, data } = authVerifyForgotPasswordSchema.validate(params);
  },
  logout: async (params) => {
    const { error, data } = authLogoutSchema.validate(params);
  },
};

export default AuthService;
