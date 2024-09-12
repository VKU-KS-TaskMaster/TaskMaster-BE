const validateRequest = (schema) => {
    return (req, res, next) => {
        if (!schema) return

        const { error, value } = schema.validate({ ...req.params, ...req.query, ...req.body });

        if (error) {
            next(error)
        }

        next(value)
    }
}

export default validateRequest