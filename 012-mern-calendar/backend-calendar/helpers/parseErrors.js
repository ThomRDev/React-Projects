// only for joi
export const parseErrors = (details) => {
  console.log(details);
  const errors = details.reduce((acc, error) => {
    acc[`${error["path"][0]}`] = {
      msg: error.message,
      param: error["path"][0],
    };
    return acc;
  }, {});
  return {
    errors,
  };
};
