const express = require("express");
const createError = require("http-errors");
const router = express.Router();

const Play = require("../../models/PlayModel");

router.get("/:playCode", async (req, res, next) => {
  try {
    const playCode = req.params.playCode;

    const play = await Play.findOne({ code: `${playCode}` });

    if (play.assigned === false || !play.code) {
      const error = createError(
        401,
        "Este código no corresponde a ningún juego"
      );
      next(error);
      return;
    }

    res.status(200).json(play);
  } catch (error) {
    next(createError(500, error));
  }
});

module.exports = router;
