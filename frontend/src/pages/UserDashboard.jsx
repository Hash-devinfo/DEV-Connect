import { useState, useEffect } from "react";
import API from "../api/axios";
import useAuth from "../context/useAuth";

const UserDashboard = () => {
  const { user} = useAuth();
 

  const [projects, setProjects] = useState([]);
  const [bids, setBids] = useState({});
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    techStack: "",
    estimatedBudget: "",
  });

  

  const fetchProjects = async () => {
    try {
      const { data } = await API.get("/projects/export");
      // filter only logged in user's projects
      const myProjects = data.filter(
        (p) => p.createdBy?._id === user?.id
      );
      setProjects(myProjects);
    } catch (err) {
      console.error(err);
    }
  };


  
useEffect(() => {
  const fetchProjects = async () => {
    try {
      const { data } = await API.get("/projects/export");
      const myProjects = data.filter(
        (p) => p.createdBy?._id === user?.id
      );
      setProjects(myProjects);
    } catch (err) {
      console.error(err);
    }
  };

  fetchProjects();
}, [user?.id]);
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await API.post("/projects/create", {
        ...formData,
        techStack: formData.techStack.split(",").map((s) => s.trim()),
        estimatedBudget: Number(formData.estimatedBudget),
      });
      setFormData({ title: "", description: "", techStack: "", estimatedBudget: "" });
      fetchProjects();
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const fetchBids = async (projectId) => {
    try {
      const { data } = await API.get(`/projects/${projectId}/bids`);
      setBids((prev) => ({ ...prev, [projectId]: data.bids }));
      setSelectedProject(projectId);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAcceptBid = async (bidId, projectId) => {
    try {
      await API.patch(`/bids/${bidId}/accept`);
      fetchBids(projectId);
      fetchProjects();
    } catch (err) {
      console.error(err);
    }
  };

  const handleRejectBid = async (bidId, projectId) => {
    try {
      await API.patch(`/bids/${bidId}/reject`);
      fetchBids(projectId);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteProject = async (projectId) => {
    try {
      await API.delete(`/projects/${projectId}`);
      fetchProjects();
    } catch (err) {
      console.error(err);
    }
  };

  

  const statusColor = (status) => {
    if (status === "open") return "bg-green-100 text-green-600";
    if (status === "in progress") return "bg-yellow-100 text-yellow-600";
    return "bg-gray-100 text-gray-600";
  };

  return (
    <div className="min-h-screen bg-gray-50">

      

      <div className="max-w-4xl mx-auto px-4 py-8">

        {/* Create Project Form */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Post a New Project
          </h2>

          {error && (
            <div className="bg-red-50 text-red-500 px-4 py-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleCreateProject} className="flex flex-col gap-4">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Project Title"
              required
              className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Project Description"
              required
              rows={3}
              className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex gap-4">
              <input
                type="text"
                name="techStack"
                value={formData.techStack}
                onChange={handleChange}
                placeholder="Tech Stack (React, Node.js)"
                required
                className="flex-1 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                name="estimatedBudget"
                value={formData.estimatedBudget}
                onChange={handleChange}
                placeholder="Budget ($)"
                required
                className="w-32 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Posting..." : "Post Project"}
            </button>
          </form>
        </div>

        {/* My Projects */}
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          My Projects ({projects.length})
        </h2>

        {projects.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center text-gray-400">
            No projects yet. Post your first project above!
          </div>
        ) : (
          projects.map((project) => (
            <div
              key={project._id}
              className="bg-white rounded-xl shadow-sm p-6 mb-4"
            >
              {/* Project Header */}
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-gray-800">{project.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{project.description}</p>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${statusColor(project.status)}`}>
                  {project.status}
                </span>
              </div>

              {/* Tech Stack & Budget */}
              <div className="flex gap-2 flex-wrap mb-4">
                {project.techStack.map((tech, i) => (
                  <span key={i} className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded-md">
                    {tech}
                  </span>
                ))}
                <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-md">
                  ${project.estimatedBudget}
                </span>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => fetchBids(project._id)}
                  className="text-sm text-blue-600 hover:underline"
                >
                  View Bids
                </button>
                <button
                  onClick={() => handleDeleteProject(project._id)}
                  className="text-sm text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>

              {/* Bids Section */}
              {selectedProject === project._id && bids[project._id] && (
                <div className="mt-4 border-t pt-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">
                    Bids ({bids[project._id].length})
                  </h4>
                  {bids[project._id].length === 0 ? (
                    <p className="text-sm text-gray-400">No bids yet</p>
                  ) : (
                    bids[project._id].map((bid) => (
                      <div
                        key={bid._id}
                        className="flex justify-between items-center bg-gray-50 rounded-lg p-3 mb-2"
                      >
                        <div>
                          <p className="text-sm font-medium text-gray-800">
                            {bid.developer?.name}
                          </p>
                          <p className="text-xs text-gray-500">{bid.message}</p>
                          <p className="text-xs text-blue-600 font-medium mt-1">
                            ${bid.bidAmount}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          {bid.status === "pending" && (
                            <>
                              <button
                                onClick={() => handleAcceptBid(bid._id, project._id)}
                                className="text-xs bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600"
                              >
                                Accept
                              </button>
                              <button
                                onClick={() => handleRejectBid(bid._id, project._id)}
                                className="text-xs bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                              >
                                Reject
                              </button>
                            </>
                          )}
                          {bid.status !== "pending" && (
                            <span className={`text-xs px-3 py-1 rounded-lg font-medium ${
                              bid.status === "accepted"
                                ? "bg-green-100 text-green-600"
                                : "bg-red-100 text-red-500"
                            }`}>
                              {bid.status}
                            </span>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserDashboard;