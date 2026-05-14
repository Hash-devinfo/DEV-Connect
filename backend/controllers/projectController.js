import Project from "../models/Project.js";
import fs from "fs"

// To create a project

export const createProject = async (req, res) => {
  try {
    const { title, description, techStack, estimatedBudget } = req.body;

    const project = await Project.create({
      title,
      description,
      techStack,
      estimatedBudget,
      status: "open",
      createdBy: req.user.id, 
    });

    res.status(201).json({
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// to Get all open projects

export const getOpenProjects = async (req, res) => {
  try {
    const projects = await Project.find({ status: "open" })
      .populate("createdBy", "name email")  
      .sort({ createdAt: -1 });  

    res.status(200).json({
      count: projects.length,
      projects,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// to update the project status:

export const updateProjectStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "You are not the owner of this project" });
    }

    project.status = status;
    await project.save();

    res.status(200).json({
      message: "Project status updated successfully",
      project,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// to delete a project

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "You are not the owner of this project" });
    }

    await project.deleteOne();

    res.status(200).json({
      message: "Project deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Export all projects to a .json file
export const exportProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    const data = JSON.stringify(projects, null, 2);

    fs.writeFileSync("projects.json", data);

    res.download("projects.json", "projects.json", (err) => {
      if (err) {
        res.status(500).json({ message: "Error downloading file" });
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};