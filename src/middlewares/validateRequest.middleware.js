const validateRequest = (schema) => {
    return (req, res, next) => {
        if (!schema) return

        const { error, value } = schema.validate({ ...req.params, ...req.query, ...req.body });

        if (error) {
            res.status(400).json(error)
        }

        next(value)
    }
}

export default validateRequest