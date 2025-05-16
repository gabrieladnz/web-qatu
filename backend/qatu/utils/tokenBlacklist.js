let blacklistedTokens = [];

export const addToBlacklist = (token) => {
  blacklistedTokens.push(token);
};

export const isTokenBlacklisted = (token) => {
  return blacklistedTokens.includes(token);
};

setInterval(() => {
  blacklistedTokens = blacklistedTokens.filter(token => {
    try {
      jwt.verify(token, process.env.JWT_SECRET);
      return true; 
    } catch {
      return false; 
    }
  });
}, 3600000); 