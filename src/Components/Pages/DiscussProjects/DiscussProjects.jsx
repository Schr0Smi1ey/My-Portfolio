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
// import Sending from "../../../assets/Animation/Send-Message.json";
import Sending from "../../../assets/Animation/Send-Message-1.json";
import SendSuccess from "../../../assets/Animation/Send-Success.json";
import SendFailed from "../../../assets/Animation/Send-Failed.json";
const DiscussProjects = () => {
  const { Toast } = useContext(AuthContext);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [sent, setSent] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    AOS.init({ duration: 500 });
    window.scrollTo(0, 0);
  }, []);

  const CustomAxios = UseCustomAxios();

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const formData = {
      name: form.get("name"),
      email: form.get("email"),
      projectDetails: form.get("projectDetails"),
      file: form.get("file"),
    };

    if (formData.file && formData.file.size > 20 * 1024 * 1024) {
      Toast("File size should be less than 20MB", "error");
      return;
    }

    try {
      setSendingMessage(true);
      let fileUrl = null;

      if (formData.file) {
        const fileData = new FormData();
        fileData.append("file", formData.file);
        fileData.append(
          "upload_preset",
          import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
        );
        // fileData.append("use_filename", "true");
        try {
          const cloudinaryResponse = await axios.post(
            `https://api.cloudinary.com/v1_1/${
              import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
            }/upload`,
            fileData
          );
          fileUrl = cloudinaryResponse.data.secure_url;
        } catch (error) {
          setFailed(true);
        }
      }
      const messageData = {
        name: formData.name,
        email: formData.email,
        projectDetails: formData.projectDetails,
        fileUrl: fileUrl,
        date: new Date().toISOString(),
      };

      if (fileUrl) {
        const res = await CustomAxios.post("/messages", messageData);

        if (res.status === 200) {
          e.target.reset();
          setSent(true);
        } else {
          setFailed(true);
        }
      } else {
        setFailed(true);
      }
    } catch (error) {
      setFailed(true);
    } finally {
      setSendingMessage(false);
    }
  };

  return (
    <div className="overflow-hidden min-h-screen flex items-center justify-center background px-6 lg:px-24 py-20">
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
          {/* Heading */}
          <h1
            className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white"
            data-aos="fade-up"
          >
            Let's Discuss Your Next Project!
          </h1>
          <p
            className="text-lg text-gray-600 dark:text-gray-300 mt-4"
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
              href="mailto:radiantremel444@gmail.com"
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
              <FaLinkedin className="inline-block text-xl mr-2"></FaLinkedin>
              LinkedIn
            </motion.a>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="bg-white p-8 sm:p-10 md:p-12 rounded-lg shadow-lg my-12 text-left max-w-4xl mx-auto"
          >
            <form
              className="space-y-6"
              onSubmit={handleSendMessage}
              encType="multipart/form-data"
            >
              {/* Name Input */}
              <div data-aos="fade-right">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                />
              </div>

              {/* Email Input */}
              <div data-aos="fade-left">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="john.doe@example.com"
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                />
              </div>

              {/* Project Details Textarea */}
              <div data-aos="fade-up">
                <label
                  htmlFor="projectDetails"
                  className="block text-sm font-medium text-gray-700"
                >
                  Project Details
                </label>
                <textarea
                  name="projectDetails"
                  rows="4"
                  placeholder="Tell me about your project..."
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                ></textarea>
              </div>

              {/* File Upload Input */}
              <div data-aos="fade-up">
                <label
                  htmlFor="file"
                  className="block text-sm font-medium text-gray-700"
                >
                  Upload File
                </label>
                <input
                  type="file"
                  name="file"
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                />
                <p className="text-sm text-gray-500 mt-1 ml-1">
                  <span className="text-red-500">Max file size: 20MB.</span>
                </p>
              </div>

              {/* Submit Button */}
              <div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90 transition focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  data-aos="fade-up"
                  disabled={sendingMessage}
                >
                  {sendingMessage ? "Sending..." : "Send Message"}
                </motion.button>
              </div>
            </form>
          </motion.div>
          {(sendingMessage || sent || failed) && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
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
                    onComplete={() => setSent(false)} // Reset sent state after animation completes
                  />
                )}
                {failed && (
                  <Lottie
                    animationData={SendFailed}
                    loop={false}
                    style={{ width: "50%", height: "50%" }}
                    onComplete={() => setFailed(false)} // Reset failed state after animation completes
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
