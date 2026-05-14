import express from "express";
import { createProject, deleteProject, exportProjects, getOpenProjects, updateProjectStatus } from "../controllers/projectController.js";
import { authorizeRole, protect } from "../middleware/authMiddleware.js";
import { getProjectBids } from "../controllers/bidController.js";

const router = express.Router();

// to export the project file
router.get("/export", protect, authorizeRole("user"), exportProjects);

// User creates a project
router.post("/create", protect, authorizeRole("user"), createProject);

//  Developer views open projects
router.get("/open", protect, authorizeRole("developer"), getOpenProjects);

// User views the bid
router.get("/:id/bids", protect, authorizeRole("user"), getProjectBids);

// PATCH project status
router.patch("/:id/status", protect, authorizeRole("user"), updateProjectStatus);

// DELETE project
router.delete("/:id", protect, authorizeRole("user"), deleteProject);

export default router;