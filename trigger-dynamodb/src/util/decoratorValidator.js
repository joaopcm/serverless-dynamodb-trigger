const decoratorValidator = (fn, schema, argsType) => {
  return async function (event) {
    const data = JSON.parse(event[argsType]);

    // abortEarly = true, shows all errors at the same time
    const { error, value } = await schema.validate(data, { abortEarly: true });

    // change argsType instance
    event[argsType] = value;

    if (!error) {
      // arguments will send all received arguments to the next step
      return fn.apply(this, arguments);
    }

    return { statusCode: 433, body: error.message };
  };
};

module.exports = decoratorValidator;
