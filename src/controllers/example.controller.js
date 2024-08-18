const exampeService = require("../services/example.service");

class ExampleController {
  helloExample = async (req, res, next) => {
    try {
      const message = await exampeService.helloExample();
      return res.send(message);
    } catch (errors) {
      next(errors);
    }
  };
}

module.exports = new ExampleController();
