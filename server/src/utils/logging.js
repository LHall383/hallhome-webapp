const logError = (method, error) => {
  console.log(
    `Error in '${method}': ${error.response.status} ${error.response.statusText} ` +
      JSON.stringify(error.response.data)
  );
  console.log(error.stack);
};

module.exports = { logError };
