import { useState, useEffect } from "react";
import API from "../api/axios";

const MyBidsPage = () => {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyBids = async () => {
      try {
        const { data } = await API.get("/bids/my");
        setBids(data.bids);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMyBids();
  }, []);

  const statusColor = (status) => {
    if (status === "accepted") return "bg-green-100 text-green-600";
    if (status === "rejected") return "bg-red-100 text-red-500";
    return "bg-yellow-100 text-yellow-600";
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">My Bids</h2>
        <p className="text-gray-500 text-sm mt-1">
          Track all your submitted bids
        </p>
      </div>

      {loading ? (
        <div className="text-center text-gray-400 py-8">Loading...</div>
      ) : bids.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center text-gray-400">
          You haven't placed any bids yet.
        </div>
      ) : (
        bids.map((bid) => (
          <div
            key={bid._id}
            className="bg-white rounded-xl shadow-sm p-6 mb-4"
          >
            {/* Project Info */}
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-gray-800">
                  {bid.project?.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {bid.project?.description}
                </p>
              </div>
              <span className={`text-xs px-3 py-1 rounded-full font-medium ${statusColor(bid.status)}`}>
                {bid.status}
              </span>
            </div>

            {/* Tech Stack */}
            <div className="flex gap-2 flex-wrap mb-4">
              {bid.project?.techStack?.map((tech, i) => (
                <span
                  key={i}
                  className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded-md"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Bid Details */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">Your Bid</p>
                  <p className="text-lg font-semibold text-blue-600">
                    ${bid.bidAmount}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Project Budget</p>
                  <p className="text-lg font-semibold text-gray-800">
                    ${bid.project?.estimatedBudget}
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-3 border-t pt-3">
                {bid.message}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyBidsPage;