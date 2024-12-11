import React, { useState } from "react";
import NavBar from "../components/Navbar";
import { Loader } from "lucide-react";

const CreatePostWithMentions = ({ pages }) => {
  const [selectedPage, setSelectedPage] = useState(null);
  const [message, setMessage] = useState("");
  const [mentionId, setMentionId] = useState("");
  const [mentionProfile, setMentionProfile] = useState(null);
  const [image, setImage] = useState(null);
  const [isPosting, setIsPosting] = useState(false);

  const handlePageChange = (e) => {
    const page = pages.find((p) => p.id === e.target.value);
    setSelectedPage(page);
  };

  const fetchMentionProfile = () => {
    if (!mentionId || !selectedPage) {
      alert("Please enter a mention ID and select a page!");
      return;
    }

    window.FB.api(
      `/${mentionId}`,
      "GET",
      { access_token: selectedPage.access_token },
      (response) => {
        if (response && !response.error) {
          setMentionProfile({
            name: response.name,
            profilePicture: `https://graph.facebook.com/${mentionId}/picture?type=large`,
          });
        } else {
          console.error("Error fetching profile:", response.error);
          alert("Failed to fetch profile. Please check the ID.");
        }
      }
    );
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  const createPost = () => {
    if (!selectedPage || !message) {
      alert("Please select a page and enter a post message!");
      return;
    }

    setIsPosting(true);

    const formData = new FormData();
    formData.append(
      "message",
      `${message}${mentionId ? ` @[${mentionId}]` : ""}`
    );
    if (image) formData.append("source", image);

    fetch(
      `https://graph.facebook.com/${selectedPage.id}/${
        image ? "photos" : "feed"
      }?access_token=${selectedPage.access_token}`,
      {
        method: "POST",
        body: formData,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setIsPosting(false);
        if (data.error) {
          console.error("Error creating post:", data.error);
          alert("Failed to create the post.");
        } else {
          alert("Post created successfully!");
        }
      })
      .catch((err) => {
        setIsPosting(false);
        console.error("Error:", err);
        alert("An unexpected error occurred.");
      });
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <NavBar />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Create Post with Mentions
        </h1>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label className="block mb-2 font-medium text-gray-700">
              Select Page
            </label>
            <select
              onChange={handlePageChange}
              className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">Select a Page</option>
              {pages.map((page) => (
                <option key={page.id} value={page.id}>
                  {page.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-medium text-gray-700">
              Caption
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
              rows="4"
              placeholder="Write your post here..."
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-medium text-gray-700">
              Mention ID
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={mentionId}
                onChange={(e) => setMentionId(e.target.value)}
                className="p-3 border rounded-lg flex-grow focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter Mention ID"
              />
              <button
                onClick={fetchMentionProfile}
                className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
              >
                Fetch Profile
              </button>
            </div>
          </div>

          {mentionProfile && (
            <div className="mb-4 flex items-center space-x-4 p-4 border rounded-lg bg-gray-50">
              <img
                src={mentionProfile.profilePicture}
                alt={mentionProfile.name}
                className="w-12 h-12 rounded-full"
              />
              <p className="font-medium text-gray-700">{mentionProfile.name}</p>
            </div>
          )}

          <div className="mb-4">
            <label className="block mb-2 font-medium text-gray-700">
              Attach Image
            </label>
            <input
              type="file"
              onChange={handleImageChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {image && (
              <div className="mt-4 w-full flex justify-center">
                <img
                  src={URL.createObjectURL(image)}
                  alt="Preview"
                  className="max-w-full max-h-60 object-contain border rounded-lg shadow-md"
                />
              </div>
            )}
          </div>

          <div className="flex justify-center">
            <button
              onClick={createPost}
              disabled={isPosting}
              className={`px-6 py-3 font-semibold text-white rounded-lg transition-all focus:outline-none ${
                isPosting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {isPosting ? "Posting..." : "Create Post"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePostWithMentions;
