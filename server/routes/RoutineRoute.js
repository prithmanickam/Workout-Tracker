const { Router } = require("express");

const { saveRoutines } = require("../controllers/RoutineController");

const router = Router();

router.post("/saveCreatedRoutine", saveRoutines);
router.post("/getCreatedRoutine", saveRoutines);

module.exports = router;
