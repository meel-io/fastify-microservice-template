const { asFunction } = require("awilix");

module.exports = resolver => {
  return methodToInvoke => {
    return (ctx, ...rest) => {
      const container = ctx.state.container;
      const resolved = container.build(asFunction(resolver));
      assert(
        methodToInvoke,
        `methodToInvoke must be a valid method type, such as string, number or symbol, but was ${String(
          methodToInvoke
        )}`
      );
      return resolved[methodToInvoke](ctx, ...rest);
    };
  };
};
