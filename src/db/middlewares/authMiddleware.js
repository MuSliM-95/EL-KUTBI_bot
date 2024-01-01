const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res
        .status(401)
        .json({ error: "Нет доступа (no authorization header)" });
    }

    const [type, token] = authorization.split(" ");

    if (type !== "Bearer") {
      return res.json(401).json({ error: "Неверный тип токена" });
    }
    req.user = await jwt.verify(token, process.env.SECRET);

    next();
  } catch (error) { 
    return res
      .status(401)
      .json({ error: "Ошибка авторизации: " + error.toString() });
  }
};
