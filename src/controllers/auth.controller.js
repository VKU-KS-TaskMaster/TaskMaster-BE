import AuthService from "../services/auth.service";

const AuthController = {
    create: async (req, res, next) => {
        try {
            const message = await AuthService.createUser(req.body);
            return res.send(message);
        } catch (errors) {
            next(errors);
        }
    },
    signIn: async (req, res, next) => {
        try {
            const message = await AuthService.signIn(req.body);
            
            
            return res.status(200).json(message)
        } catch (errors) {
            next(errors);
        }
    }
}

export default AuthController
