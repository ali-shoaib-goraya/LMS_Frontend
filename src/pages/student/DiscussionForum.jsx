import React, { useState, useEffect } from "react";
import ProfileImage from '@/assets/profile.jpg'; // Assuming you have a profile image
import discussionData from "../../MockData/discussiondata";

const DiscussionForum = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [displayData, setDisplayData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedPost, setSelectedPost] = useState(null);
  const [commentInput, setCommentInput] = useState(""); // for textarea
  const [comments, setComments] = useState([]); // comment list

  useEffect(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    setDisplayData(discussionData.slice(indexOfFirstItem, indexOfLastItem));
    setTotalPages(Math.ceil(discussionData.length / itemsPerPage));
  }, [currentPage]);

  useEffect(() => {
    if (selectedPost) {
      setComments(selectedPost.commentList || []);
    }
  }, [selectedPost]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSave = () => {
    console.log("Saved:", input1, input2);
    handleCloseModal();
  };

  const handleCommentSubmit = () => {
    if (commentInput.trim() === "") return;

    const newComment = {
      id: comments.length + 1,
      name: "Muhammad Bilal", // you can make this dynamic
      comment: commentInput,
      date: new Date().toLocaleString(),
      imgUrl: ProfileImage, // sample user image
    };

    const updatedComments = [...comments, newComment];
    setComments(updatedComments);
    setCommentInput("");

    // Also update the comment count in selectedPost
    setSelectedPost((prev) => ({
      ...prev,
      comments: updatedComments.length,
      commentList: updatedComments,
    }));
  };

  return (
    <div className="p-4 bg-white shadow-sm rounded-lg">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Discussion Forums</h2>
          <p className="text-sm text-gray-600">
            Showing {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, discussionData.length)} of {discussionData.length} discussions
          </p>
        </div>
        <button
          className="border border-green-500 text-green-600 px-3 py-1 text-sm rounded-md hover:bg-green-100"
          onClick={handleOpenModal}
        >
          Start
        </button>
      </div>

      {/* Content Section */}
      {selectedPost ? (
        // If a post is selected - show the detailed post view
        <div className="p-4 bg-white shadow rounded-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedPost.title}</h2>
          <div className="flex items-center text-sm text-gray-600 gap-6 mb-4">
            <div className="flex items-center gap-1">
              <span>📅</span>
              <span>{selectedPost.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <span>✏️</span>
              <span>{selectedPost.rollNo} - {selectedPost.name}</span>
            </div>
            <div className="flex items-center gap-1">
              <span>💬</span>
              <span>{selectedPost.comments} Comments</span>
            </div>
          </div>
          <p className="text-gray-700 mb-6">{selectedPost.description}</p>

          {/* Comments Section */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Comments</h3>

            {/* Add New Comment */}
            <textarea
              rows="4"
              placeholder="Leave Comment"
              className="w-full p-2 border border-gray-300 rounded mb-4"
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
            ></textarea>
            <button
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
              onClick={handleCommentSubmit}
            >
              Submit
            </button>

            {/* Comments List */}
            <div className="mt-6">
              <h4 className="text-md font-semibold mb-2">Previous Comments</h4>
              {comments.length === 0 ? (
                <p className="text-gray-500 text-sm">No comments yet.</p>
              ) : (
                <div className="mt-2 space-y-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className="flex items-start gap-4">
                      <img
                        src={comment.imgUrl}
                        alt="User"
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <p className="text-sm font-semibold">{comment.name}</p>
                        <p className="text-gray-700 text-sm">{comment.comment}</p>
                        <p className="text-xs text-gray-400 mt-1">{comment.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Back Button */}
          <button
            onClick={() => setSelectedPost(null)}
            className="mt-6 text-purple-600 underline"
          >
            ← Back to Discussions
          </button>
        </div>
      ) : (
        <>
          {/* Table View */}
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300">
              <thead className="bg-gray-100">
                <tr className="text-gray-700 text-left">
                  <th className="border px-4 py-2 text-sm">#</th>
                  <th className="border px-4 py-2 text-sm"></th>
                  <th className="border px-4 py-2 text-sm"></th>
                </tr>
              </thead>
              <tbody>
                {displayData.length === 0 ? (
                  <tr className="bg-gray-100">
                    <td colSpan={3} className="text-gray-500 px-4 py-2 text-center">
                      No results found.
                    </td>
                  </tr>
                ) : (
                  displayData.map((item, index) => (
                    <tr key={item.id} className="bg-gray-100">
                      <td className="border px-4 py-2">
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </td>
                      <td className="border px-4 py-2">
                        <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
                          <h3 className="text-md font-bold text-gray-800 mb-2">{item.title}</h3>
                          <div className="flex flex-wrap items-center text-sm text-gray-600 gap-4 mb-2">
                            <div className="flex items-center gap-1">
                              <span>📅</span>
                              <span>{item.date}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span>✏️</span>
                              <span>{item.rollNo} - {item.name}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span>💬</span>
                              <span>{item.comments} Comments</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span></span>
                              <span>{item.description}</span>
                            </div>
                          </div>
                          <button
                            className="border border-purple-600 text-purple-600 px-3 py-1 text-sm rounded-md hover:bg-purple-100"
                            onClick={() => setSelectedPost(item)}
                          >
                            Read More
                          </button>
                        </div>
                      </td>
                      <td className="border px-4 py-2 text-right">
                        <div className="flex space-x-2">
                          <button className="text-purple-600 hover:text-purple-800">✏️</button>
                          <button className="text-purple-600 hover:text-purple-800">🗑️</button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-start mt-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 border rounded bg-gray-200 mr-2"
            >
              «
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-2 border rounded mx-1 ${currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"}`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-2 border rounded bg-gray-200 ml-2"
            >
              »
            </button>
          </div>
        </>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Start Discussion Forum Thread</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={input1}
                onChange={(e) => setInput1(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Details</label>
              <textarea
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={input2}
                onChange={(e) => setInput2(e.target.value)}
              ></textarea>
            </div>
            <div className="flex justify-start gap-4">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                onClick={handleCloseModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiscussionForum;
