import React, { useState, useEffect } from "react";
import { FaEye, FaDownload, FaTrash } from "react-icons/fa";
import Modal from "react-modal"; // For the modal
import UseSecureAxios from "../../../../Hooks/UseSecureAxios";
import downloadFile from "./downloadFile";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import deletingFile from "../../../../assets/Animation/Deleting.json";
import deletedFile from "../../../../assets/Animation/Deleted.json";
import failedFile from "../../../../assets/Animation/Failed.json";
import Lottie from "lottie-react";
Modal.setAppElement("#root");

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const secureAxios = UseSecureAxios();
  const [deleting, setDeleting] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [failed, setFailed] = useState(false);
  // using tanstack/react-query
  const { data, isFetching, refetch } = useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      const res = await secureAxios.get("/messages");
      setMessages(res.data);
      return res.data;
    },
  });

  const handleDelete = (id, public_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FF4500",
      cancelButtonColor: "#32CD32",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setDeleting(true);
        const res1 = await secureAxios.delete(`/delete-message/${id}`);
        const res2 = await secureAxios.delete(
          `/delete-cloudinary/${public_id}`
        );
        if (res1.status === 200 && res2.status === 200) {
          setDeleting(false);
          setDeleted(true);
          refetch();
        } else {
          setDeleting(false);
          setFailed(true);
        }
      }
    });
  };
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
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
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
                        downloadFile(
                          message.fileUrl,
                          message.fileName || "downloaded_file"
                        )
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
                <td className="whitespace-nowrap text-sm text-red-600">
                  <button
                    onClick={() => handleDelete(message._id, message.public_id)}
                    className="flex justify-center mx-auto"
                  >
                    <FaTrash className="text-xl"></FaTrash>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {(deleting || deleted || failed) && (
        <div className="fixed inset-0 w-full h-full flex items-center justify-center z-50">
          <div className="w-full h-full flex items-center justify-center">
            {deleting && (
              <Lottie
                animationData={deletingFile}
                loop={true}
                style={{ width: "45%", height: "45%", margin: "0 auto" }}
              ></Lottie>
            )}
            {deleted && (
              <Lottie
                animationData={deletedFile}
                loop={false}
                style={{ width: "45%", height: "45%", margin: "0 auto" }}
                onComplete={() => setDeleted(false)}
              />
            )}
            {failed && (
              <Lottie
                animationData={failedFile}
                loop={false}
                style={{ width: "45%", height: "45%", margin: "0 auto" }}
                onComplete={() => setFailed(false)}
              />
            )}
          </div>
        </div>
      )}
      {/* Modal to view project details */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Project Details"
        className="bg-white border-2 border-white dark:bg-black p-3 rounded-lg shadow-lg mx-auto"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        {selectedMessage ? (
          <div>
            <h2 className="text-xl text-black dark:text-white font-bold mb-4">Project Details</h2>
            <p className="text-gray-700 dark:text-white/70">{selectedMessage.projectDetails}</p>
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
