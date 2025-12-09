import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { IoMail } from "react-icons/io5";
import { FaLinkedin } from "react-icons/fa";
import { Helmet } from "react-helmet";
import UseCustomAxios from "../../../Hooks/UseCustomAxios";
import { AuthContext } from "../../../Contexts/AuthContext/AuthProvider";
import axios from "axios";
import Lottie from "lottie-react";
import { IoCloseCircle } from "react-icons/io5";

import Sending from "../../../assets/Animation/Send-Message-1.json";
import SendSuccess from "../../../assets/Animation/Send-Success.json";
import SendFailed from "../../../assets/Animation/Failed.json";

const DiscussProjects = () => {
  const { Toast } = useContext(AuthContext);

  const [sendingMessage, setSendingMessage] = useState(false);
  const [sent, setSent] = useState(false);
  const [failed, setFailed] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 500 });
    window.scrollTo(0, 0);
  }, []);

  const CustomAxios = UseCustomAxios();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 20 * 1024 * 1024) {
      Toast("File size should be less than 20MB", "error");
      e.target.value = "";
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
  };

  const removeFile = () => {
    setSelectedFile(null);
    document.querySelector('input[name="file"]').value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    const name = form.get("name");
    const email = form.get("email");
    const projectDetails = form.get("projectDetails");

    try {
      setFailed(false);
      setSent(false);
      setSendingMessage(true);

      let fileUrl = null;
      let fileName = null;
      let public_id = null;

      // Upload file if exists
      if (selectedFile) {
        const fileData = new FormData();
        fileData.append("file", selectedFile);
        fileData.append(
          "upload_preset",
          import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
        );

        const cloudinaryResponse = await axios.post(
          `https://api.cloudinary.com/v1_1/${
            import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
          }/upload`,
          fileData
        );

        fileUrl = cloudinaryResponse.data.secure_url;
        fileName = cloudinaryResponse.data.original_filename;
        public_id = cloudinaryResponse.data.public_id;
      }

      const messageData = {
        name,
        email,
        projectDetails,
        fileUrl,
        fileName,
        public_id,
        date: new Date().toISOString(),
      };
      console.log(messageData);
      const res = await CustomAxios.post("/messages", messageData);
      console.log(res);
      if (res.status === 200 || res.status === 201) {
        e.target.reset();
        setSelectedFile(null);
        setSent(true);
      } else {
        throw new Error("Message not sent");
      }
    } catch (error) {
      setFailed(true);
    } finally {
      setSendingMessage(false);
    }
  };

  return (
    <div className="overflow-hidden z-50 min-h-screen flex items-center justify-center background dark:bg-black dark:bg-none dark:text-white px-6 lg:px-24 py-20">
      <section className="container mx-auto">
        <Helmet>
          <title>Schr0Smi1ey | Discuss Projects</title>
        </Helmet>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 70 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1
            className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white"
            data-aos="fade-up"
          >
            Let's Discuss Your Next Project!
          </h1>

          <p
            className="text-lg text-gray-600 dark:text-gray-400 mt-4"
            data-aos="fade-up"
          >
            Have an idea? Need a developer? Let’s collaborate and bring your
            vision to life.
          </p>

          {/* Contact Options */}
          <div className="mt-8 flex flex-row items-center justify-center flex-wrap gap-4">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="mailto:Sarafatkarim555@gmail.com"
              className="px-3 py-1 flex items-center bg-primary text-white text-lg font-medium rounded-lg shadow-md hover:bg-primary/90 transition"
              data-aos="fade-up"
            >
              <IoMail className="inline-block text-xl mr-2" />
              Email Me
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://www.linkedin.com/in/sarafat-karim"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 flex items-center border-2 border-primary text-primary text-lg font-medium rounded-lg shadow-md hover:bg-primary hover:text-white transition"
              data-aos="fade-up"
            >
              <FaLinkedin className="inline-block text-xl mr-2" />
              LinkedIn
            </motion.a>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="dark:bg-black dark:border-[1px] dark:border-white/40 p-8 sm:p-10 md:p-12 rounded-lg shadow-xl my-12 text-left max-w-4xl mx-auto"
          >
            <form
              className="space-y-6"
              onSubmit={handleSendMessage}
              encType="multipart/form-data"
            >
              {/* Name */}
              <div data-aos="fade-right">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Sarafat Karim"
                  required
                  className="mt-1 block w-full bg-transparent px-4 py-3 border text-black border-black dark:border-white/40 rounded-md"
                />
              </div>

              {/* Email */}
              <div data-aos="fade-left">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="karim-example@gmail.com"
                  required
                  className="mt-1 block w-full bg-transparent px-4 py-3 border text-black border-black dark:border-white/40 rounded-md"
                />
              </div>

              {/* Details */}
              <div data-aos="fade-up">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Project Details
                </label>
                <textarea
                  name="projectDetails"
                  rows="4"
                  placeholder="about your project"
                  required
                  className="mt-1 block w-full bg-transparent px-4 py-3 border text-black border-black dark:border-white/40 rounded-md"
                />
              </div>

              {/* File Upload */}
              <div data-aos="fade-up">
                <label className="block text-sm font-medium text-gray-700">
                  Upload File
                </label>

                <input
                  type="file"
                  name="file"
                  onChange={handleFileChange}
                  className="mt-1 block w-full bg-transparent px-4 py-3 border border-black rounded-md dark:border-white/40"
                />

                {/* File Preview */}
                {selectedFile && (
                  <div className="flex items-center justify-between bg-primary/10 border border-primary/30 px-4 py-2 rounded-lg mt-3">
                    <div className="text-sm text-gray-700 dark:text-gray-300 truncate">
                      {selectedFile.name}
                    </div>
                    <button
                      type="button"
                      onClick={removeFile}
                      className="text-red-500 text-xl hover:scale-110 transition"
                    >
                      <IoCloseCircle />
                    </button>
                  </div>
                )}

                <p className="text-sm text-gray-500 mt-1 ml-1">
                  <span className="text-red-600">Max file size: 20MB.</span>
                </p>
              </div>

              {/* Submit */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={sendingMessage}
                className="w-full bg-primary/90 text-white px-6 py-3 rounded-md hover:bg-primary transition disabled:opacity-70"
              >
                {sendingMessage ? "Sending..." : "Send Message"}
              </motion.button>
            </form>
          </motion.div>

          {/* Status Overlay */}
          {(sendingMessage || sent || failed) && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30">
              <div className="w-full h-full flex items-center justify-center">
                {sendingMessage && (
                  <Lottie
                    animationData={Sending}
                    loop={true}
                    style={{ width: "50%", height: "50%" }}
                  />
                )}

                {sent && (
                  <Lottie
                    animationData={SendSuccess}
                    loop={false}
                    style={{ width: "50%", height: "50%" }}
                    onComplete={() => setSent(false)}
                  />
                )}

                {failed && (
                  <Lottie
                    animationData={SendFailed}
                    loop={false}
                    style={{ width: "50%", height: "50%" }}
                    onComplete={() => setFailed(false)}
                  />
                )}
              </div>
            </div>
          )}
        </motion.div>
      </section>
    </div>
  );
};

export default DiscussProjects;
