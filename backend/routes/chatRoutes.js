const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { accessChat,fetchChat ,createGroupChat ,renameGroup,addToGroup,removeFromGroup} = require("../controllers/chatControllers");




router.post("/chataccess",protect,accessChat);
router.get("/chatfetch",protect,fetchChat);
router.post("/group",protect,createGroupChat);
router.put("/rename",protect,renameGroup);
router.put("/groupadd",protect,addToGroup);
router.put("/groupremove",protect,removeFromGroup);


module.exports = router;