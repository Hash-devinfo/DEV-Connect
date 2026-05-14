import Bid from "../models/Bid.js";
import Project from "../models/Project.js";


//  Place a bid on a project

export const placeBid = async (req, res) => {
  try {
    const { projectId, bidAmount, message } = req.body;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.status !== "open") {
      return res.status(400).json({ message: "Project is not open for bidding" });
    }

    const existingBid = await Bid.findOne({
      project: projectId,
      developer: req.user.id, 
    });
    if (existingBid) {
      return res.status(400).json({ message: "You already placed a bid on this project" });
    }

    const bid = await Bid.create({
      project: projectId,
      developer: req.user.id,
      bidAmount,
      message,
    });

    res.status(201).json({
      message: "Bid placed successfully",
      bid,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get all bids for a project

export const getProjectBids = async (req, res) => {
  try {
    
    const { id } = req.params;


    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const bids = await Bid.find({ project: id })
      .populate("developer", "name email skills")  
      .sort({ bidAmount: 1 });  

    res.status(200).json({
      count: bids.length,
      bids,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//   Accept a bid

export const acceptBid = async (req, res) => {
  try {
    const { id } = req.params;

    const bid = await Bid.findById(id);
    if (!bid) {
      return res.status(404).json({ message: "Bid not found" });
    }

    const project = await Project.findById(bid.project);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "You are not the owner of this project" });
    }

    bid.status = "accepted";
    await bid.save();

    await Bid.updateMany(
      { project: bid.project, _id: { $ne: id } },  
      { status: "rejected" }
    );

    project.status = "in progress";
    await project.save();

    res.status(200).json({
      message: "Bid accepted successfully",
      bid,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  to reject Bid Request
export const rejectBid = async (req, res) => {
  try {
    const { id } = req.params;

    const bid = await Bid.findById(id);
    if (!bid) {
      return res.status(404).json({ message: "Bid not found" });
    }

    const project = await Project.findById(bid.project);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "You are not the owner of this project" });
    }

    bid.status = "rejected";
    await bid.save();

    res.status(200).json({
      message: "Bid rejected successfully",
      bid,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




//  Get all bids by logged in developer


export const getMyBids = async (req, res) => {
  try {
    const bids = await Bid.find({ developer: req.user.id })
      .populate("project", "title description techStack estimatedBudget status")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: bids.length,
      bids,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};