import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const DiscussProjects = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center background px-6 md:px-12 lg:px-24 py-20">
      <div data-aos="fade-up" className="max-w-4xl mx-auto text-center">
        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">
          Let's Discuss Your Next Project!
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mt-4">
          Have an idea? Need a developer? Let’s collaborate and bring your
          vision to life.
        </p>

        {/* Contact Options */}
        <div className="mt-8 flex flex-col md:flex-row justify-center gap-6">
          <a
            href="mailto:radiantremel444@gmail.com"
            className="px-6 py-3 bg-primary text-white text-lg font-medium rounded-lg shadow-md hover:bg-primary/90 transition"
          >
            Email Me
          </a>
          <a
            href="https://www.linkedin.com/in/sarafat-karim"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border-2 border-primary text-primary text-lg font-medium rounded-lg shadow-md hover:bg-primary hover:text-white transition"
          >
            Connect on LinkedIn
          </a>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-8 sm:p-10 md:p-12 rounded-lg shadow-lg mt-12 text-left max-w-4xl mx-auto">
          <form className="space-y-6">
            {/* Name Input */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="John Doe"
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              />
            </div>

            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="john.doe@example.com"
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              />
            </div>

            {/* Project Details Textarea */}
            <div>
              <label
                htmlFor="projectDetails"
                className="block text-sm font-medium text-gray-700"
              >
                Project Details
              </label>
              <textarea
                id="projectDetails"
                name="projectDetails"
                rows="4"
                placeholder="Tell me about your project..."
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90 transition focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default DiscussProjects;
