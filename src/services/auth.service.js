import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.config";

const AuthService = {
    createUser: async ({ email, password }) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user;
            return user
        } catch (error) {
            console.log(error);
        }
    },
    signIn: async ({ email, password }) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            const user = userCredential.user;
            return user
        } catch (error) {
            console.log(error);
        }
    }
}



export default AuthService