import React, { useState, useEffect } from "react";
import { FaEye, FaDownload } from "react-icons/fa";
import Modal from "react-modal"; // For the modal
import UseSecureAxios from "../../../../Hooks/UseSecureAxios";
import downloadFile from "./downloadFile";
Modal.setAppElement("#root");

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const secureAxios = UseSecureAxios();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await secureAxios.get("/messages");
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchMessages();
  }, []);

  const openModal = (message) => {
    setSelectedMessage(message);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMessage(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Messages</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-50 ">
            <tr className="text-center">
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Project Details
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                File
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {messages.map((message) => (
              <tr key={message._id} className="text-center">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {message.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {message.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(message.date).toLocaleDateString()}
                </td>

                <td className="px-6 py-4 whitespace-nowrap flex justify-center text-sm text-gray-900">
                  <button
                    onClick={() => openModal(message)}
                    className="text-blue-500 hover:text-blue-700 flex items-center"
                  >
                    <FaEye className="mr-2" />
                    View
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {message.fileUrl ? (
                    <button
                      onClick={() =>
                        downloadFile(message.fileUrl, "downloaded_file")
                      }
                      className="text-blue-500 mx-auto hover:text-blue-700 flex justify-center text-center"
                    >
                      <FaDownload className="mr-2 flex" />
                      Download File
                    </button>
                  ) : (
                    "No file"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal to view project details */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Project Details"
        className="bg-white p-3 rounded-lg shadow-lg mx-auto"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        {selectedMessage ? (
          <div>
            <h2 className="text-xl font-bold mb-4">Project Details</h2>
            <p className="text-gray-700">{selectedMessage.projectDetails}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
        <button
          onClick={closeModal}
          className="mt-4 px-4 py-1 bg-red-500 text-white rounded hover:bg-red-700"
        >
          Close
        </button>
      </Modal>
    </div>
  );
};

export default Messages;
