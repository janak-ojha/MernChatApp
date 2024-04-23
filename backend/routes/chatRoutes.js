const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { accessChat,fetchChat } = require("../controllers/chatControllers");




router.post("/chataccess",protect,accessChat);
router.get("/chatfetch",protect,fetchChat);
// router.post("/group",protect,createGroupChat);
// router.put("/rename",protect,renameGroup);
// router.put("/groupremove",protect,removeFromGroup);
// router.put("/groupadd",protect,addToGroup);

module.exports = router;