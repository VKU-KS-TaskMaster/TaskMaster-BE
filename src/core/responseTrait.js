const ResponseTrait = {
    success: (data) => {
        return {
            data: data
        }
    },
    error: (message) => {
        return {
            message: message
        }
    }
}

export default ResponseTrait