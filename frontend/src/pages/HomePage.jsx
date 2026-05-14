import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center flex-1 text-center px-4">
        <h2 className="text-5xl font-bold text-gray-800 mb-4">
          Connect Developers <br /> with Great Projects
        </h2>
        <p className="text-gray-500 text-lg mb-8 max-w-xl">
          Post your project, receive bids from skilled developers,
          and build something amazing together.
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/signup")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700"
          >
            Post a Project
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg text-lg hover:bg-blue-50"
          >
            Find Work
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16 px-8">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl mb-3">📋</div>
            <h3 className="font-semibold text-gray-800 mb-2">Post Projects</h3>
            <p className="text-gray-500 text-sm">Create a project with your requirements and budget</p>
          </div>
          <div>
            <div className="text-3xl mb-3">💼</div>
            <h3 className="font-semibold text-gray-800 mb-2">Receive Bids</h3>
            <p className="text-gray-500 text-sm">Get competitive bids from skilled developers</p>
          </div>
          <div>
            <div className="text-3xl mb-3">🚀</div>
            <h3 className="font-semibold text-gray-800 mb-2">Build Together</h3>
            <p className="text-gray-500 text-sm">Accept the best bid and start building</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-4 text-gray-400 text-sm">
        © 2024 DevConnect. All rights reserved.
      </footer>

    </div>
  );
};

export default HomePage;