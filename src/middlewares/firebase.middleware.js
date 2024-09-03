const authenticateToken = async (req, res, next) => {
  const bearerToken = req.headers["authorization"];
  const token = bearerToken && bearerToken.split(" ")[1]; // Bearer TOKEN
  if (token == null) return res.sendStatus(401);
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.sendStatus(403);
  }
};
