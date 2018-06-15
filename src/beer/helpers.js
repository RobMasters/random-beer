const isValidBeer = (beer) => {
  if (!beer.name) {
    return false;
  }

  if (!beer.description) {
    return false;
  }

  return true;
};

export {
  isValidBeer,
};
