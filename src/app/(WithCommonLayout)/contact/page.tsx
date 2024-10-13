// import React from "react";

// const ContactUs = () => {
//   return (
//     <div className="bg-gray-900 text-gray-100 min-h-screen">
//       <div className="max-w-7xl mx-auto px-6 py-16">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <h1 className="text-5xl md:text-6xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-500 mb-4">
//             Contact Use
//           </h1>
//           <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
//             Have any questions or feedback? We&apos;d love to hear from you.
//             Reach out to us using the form below, and we’ll get back to you as
//             soon as possible.
//           </p>
//         </div>

//         {/* Contact Form */}
//         <div className="backdrop-blur-md bg-opacity-10 bg-white p-10 rounded-3xl shadow-xl mx-auto max-w-4xl">
//           <form className="space-y-6">
//             {/* Name */}
//             <div>
//               <label
//                 className="block text-lg font-medium text-teal-400"
//                 htmlFor="name"
//               >
//                 Name
//               </label>
//               <input
//                 className="mt-2 block w-full p-3 rounded-xl bg-gray-800 border border-gray-700 text-gray-300 focus:border-teal-400 focus:ring-teal-400 transition duration-300 ease-in-out"
//                 id="name"
//                 placeholder="Enter your name"
//                 type="text"
//               />
//             </div>

//             {/* Email */}
//             <div>
//               <label
//                 className="block text-lg font-medium text-teal-400"
//                 htmlFor="email"
//               >
//                 Email
//               </label>
//               <input
//                 className="mt-2 block w-full p-3 rounded-xl bg-gray-800 border border-gray-700 text-gray-300 focus:border-teal-400 focus:ring-teal-400 transition duration-300 ease-in-out"
//                 id="email"
//                 placeholder="Enter your email"
//                 type="email"
//               />
//             </div>

//             {/* Message */}
//             <div>
//               <label
//                 className="block text-lg font-medium text-teal-400"
//                 htmlFor="message"
//               >
//                 Message
//               </label>
//               <textarea
//                 className="mt-2 h-[150px] block w-full p-3 rounded-xl bg-gray-800 border border-gray-700 text-gray-300 focus:border-teal-400 focus:ring-teal-400 transition duration-300 ease-in-out"
//                 id="message"
//                 placeholder="Enter your message"
//               />
//             </div>

//             {/* Submit Button */}
//             <div className="text-center">
//               <button
//                 className="inline-block bg-gradient-to-r from-teal-400 to-blue-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:from-blue-600 hover:to-teal-400 transition duration-300 transform hover:scale-105"
//                 type="submit"
//               >
//                 Send Message
//               </button>
//             </div>
//           </form>
//         </div>

//         {/* Contact Information */}
//         <div className="text-center mt-12">
//           <h2 className="text-3xl font-bold text-teal-400 mb-4">
//             Or Reach Us At
//           </h2>
//           <p className="text-lg text-gray-300">
//             Email:{" "}
//             <a
//               className="text-teal-400 hover:underline"
//               href="mailto:mdmanik1502083874@gmail.com"
//             >
//               sujuflavorhub@gmail.com
//             </a>
//           </p>
//           <p className="text-lg text-gray-300">
//             Phone:{" "}
//             <a className="text-teal-400 hover:underline" href="tel:+123456789">
//               +88 017000000
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContactUs;

import React from "react";

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 via-orange-100 to-red-100 text-gray-900 dark:from-gray-900 dark:via-gray-800 dark:to-black dark:text-white">
      {/* Container */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600 dark:from-blue-400 dark:to-teal-500 mb-4">
            Contact Us
          </h1>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Have any questions or feedback? We&apos;d love to hear from you.
            Reach out to us using the form below, and we’ll get back to you as
            soon as possible.
          </p>
        </div>

        {/* Contact Form Section */}
        <div className="bg-white bg-opacity-90 dark:bg-gray-800 dark:bg-opacity-90 p-10 rounded-3xl shadow-2xl mb-16">
          <form className="space-y-6">
            {/* Name */}
            <div>
              <label
                className="block text-lg font-medium tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600 dark:from-blue-400 dark:to-teal-500"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="mt-2 block w-full p-3 rounded-xl bg-gray-800 border border-gray-700 text-gray-300 focus:border-teal-400 focus:ring-teal-400 transition duration-300 ease-in-out dark:bg-gray-700 dark:border-gray-600"
                id="name"
                placeholder="Enter your name"
                type="text"
              />
            </div>

            {/* Email */}
            <div>
              <label
                className="block text-lg font-medium tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600 dark:from-blue-400 dark:to-teal-500"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="mt-2 block w-full p-3 rounded-xl bg-gray-800 border border-gray-700 text-gray-300 focus:border-teal-400 focus:ring-teal-400 transition duration-300 ease-in-out dark:bg-gray-700 dark:border-gray-600"
                id="email"
                placeholder="Enter your email"
                type="email"
              />
            </div>

            {/* Message */}
            <div>
              <label
                className="block text-lg font-medium tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600 dark:from-blue-400 dark:to-teal-500"
                htmlFor="message"
              >
                Message
              </label>
              <textarea
                className="mt-2 h-[150px] block w-full p-3 rounded-xl bg-gray-800 border border-gray-700 text-gray-300 focus:border-teal-400 focus:ring-teal-400 transition duration-300 ease-in-out dark:bg-gray-700 dark:border-gray-600"
                id="message"
                placeholder="Enter your message"
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                className="inline-block bg-gradient-to-r from-teal-400 to-blue-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:from-blue-600 hover:to-teal-400 transition duration-300 transform hover:scale-105"
                type="submit"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>

        {/* Contact Information Section */}
        <div className="bg-white bg-opacity-90 dark:bg-gray-800 dark:bg-opacity-90 p-10 rounded-3xl shadow-2xl mb-16 text-center">
          <h2 className="text-3xl font-bold text-orange-500 dark:text-teal-400 mb-4">
            Or Reach Us At
          </h2>
          <p className="text-lg">
            Email:{" "}
            <a
              className="font-bold text-orange-500 dark:text-teal-400  hover:underline"
              href="mailto:suju@gmail.com"
            >
              sujuflavorhub@gmail.com
            </a>
          </p>
          <p className="text-lg">
            Phone:{" "}
            <a
              className="font-bold text-orange-500 dark:text-teal-400 hover:underline"
              href="tel:+123456789"
            >
              +88 017000000
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
