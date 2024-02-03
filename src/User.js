export const User = (() => {
  let name = "Username";

  return {
    setName: (value) => {
      name = value;
    },

    getName: () => name,
  };
})();
