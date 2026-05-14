import { useState, useEffect } from "react";
import API from "../api/axios";


const DevDashboard = () => {


  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [bidData, setBidData] = useState({
    bidAmount: "",
    message: "",
  });

  

  
useEffect(() => {
  const fetchOpenProjects = async () => {
    try {
      const { data } = await API.get("/projects/open");
      setProjects(data.projects);
    } catch (err) {
      console.error(err);
    }
  };

  fetchOpenProjects();
}, []);
  const handleBidChange = (e) => {
    setBidData({ ...bidData, [e.target.name]: e.target.value });
  };

  const handlePlaceBid = async (e, projectId) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await API.post("/bids/place", {
        projectId,
        bidAmount: Number(bidData.bidAmount),
        message: bidData.message,
      });
      setBidData({ bidAmount: "", message: "" });
      setSelectedProject(null);
      alert("Bid placed successfully! ✅");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

 

  return (
    <div className="min-h-screen bg-gray-50">

     

      <div className="max-w-4xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Open Projects</h2>
          <p className="text-gray-500 text-sm mt-1">
            Browse and bid on available projects
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 text-red-500 px-4 py-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        {/* Projects List */}
        {projects.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center text-gray-400">
            No open projects available right now.
          </div>
        ) : (
          projects.map((project) => (
            <div
              key={project._id}
              className="bg-white rounded-xl shadow-sm p-6 mb-4"
            >
              {/* Project Info */}
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {project.description}
                  </p>
                </div>
                <span className="bg-green-100 text-green-600 text-xs px-3 py-1 rounded-full font-medium">
                  open
                </span>
              </div>

              {/* Tech Stack & Budget */}
              <div className="flex gap-2 flex-wrap mb-4">
                {project.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded-md"
                  >
                    {tech}
                  </span>
                ))}
                <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-md">
                  Budget: ${project.estimatedBudget}
                </span>
              </div>

              {/* Posted by */}
              <p className="text-xs text-gray-400 mb-4">
                Posted by {project.createdBy?.name}
              </p>

              {/* Place Bid Button */}
              {selectedProject !== project._id ? (
                <button
                  onClick={() => setSelectedProject(project._id)}
                  className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Place a Bid
                </button>
              ) : (
                <form
                  onSubmit={(e) => handlePlaceBid(e, project._id)}
                  className="border-t pt-4 flex flex-col gap-3"
                >
                  <h4 className="text-sm font-semibold text-gray-700">
                    Place Your Bid
                  </h4>
                  <input
                    type="number"
                    name="bidAmount"
                    value={bidData.bidAmount}
                    onChange={handleBidChange}
                    placeholder="Your bid amount ($)"
                    required
                    className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <textarea
                    name="message"
                    value={bidData.message}
                    onChange={handleBidChange}
                    placeholder="Why are you the best fit for this project?"
                    required
                    rows={3}
                    className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50"
                    >
                      {loading ? "Submitting..." : "Submit Bid"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedProject(null)}
                      className="text-sm text-gray-500 hover:underline"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DevDashboard;