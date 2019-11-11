export const injectable = (): ClassDecorator => {
  return target => {
    Container.getInstance().register();
  };
};
