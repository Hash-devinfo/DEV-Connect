import express from "express";
import { acceptBid, getMyBids, placeBid, rejectBid } from "../controllers/bidController.js";
import { authorizeRole, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET /bids/my
router.get("/my", protect, authorizeRole("developer"), getMyBids);

// POST Developer places a bid
router.post("/place", protect, authorizeRole("developer"), placeBid);

// to accept the bid
router.patch("/:id/accept", protect, authorizeRole("user"), acceptBid);

// to reject the bid
router.patch("/:id/reject", protect, authorizeRole("user"), rejectBid);


export default router;