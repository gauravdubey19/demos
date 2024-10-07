"use client";
import Link from 'next/link';

const HelpDesk = () => {
  return (
    <div className="m-8 h-[90vh] overflow-y-scroll">
      {/* Welcome Section */}
      <div className="text-center mb-8 px-24">
        <h2 className="text-2xl mb-4">Hi, How can we help?</h2>
        <p className="text-gray-600 mb-6">
          Welcome to our Help & Support Center. Here you can find answers to
          common questions, track your orders, manage returns, and more. Our
          goal is to provide you with the best possible support experience.
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-8 px-24">
        <input
          type="text"
          placeholder="Ask any question..."
          className="w-full p-3 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <span className="text-center flex justify-center text-gray-500 mt-2">
          Or <span className="text-black font-bold ml-1">choose</span> an option
        </span>
      </div>

      {/* FAQ Section */}
      <div className="flex justify-evenly items-center px-12">
        <div className="bg-yellow-100 p-4 rounded-md w-60">
          <div className="flex justify-center mb-2">
            <span className="text-2xl">❓</span>
          </div>
          <Link href="/contact" passHref>
            <div className="text-center cursor-pointer">
              <p className="text-lg font-semibold">FAQ</p>
              <small className="text-gray-500">
                Find quick answers to common questions here!
              </small>
            </div>
          </Link>
        </div>
        <div className="bg-blue-50 p-4 rounded-md w-60">
          <div className="flex justify-center mb-2">
            <span className="text-2xl">❓</span>
          </div>
          <Link href="/contact" passHref>
            <div className="text-center cursor-pointer">
              <p className="text-lg font-semibold">Queries</p>
              <small className="text-gray-500">
                Find queries and get quick assistance here!
              </small>
            </div>
          </Link>
        </div>
      </div>

      {/* Submit Ticket Form */}
      <div className="mt-8 flex justify-center px-4 sm:px-6 lg:px-2">
        <div className="w-full max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-md">
          <h2 className="text-2xl font-semibold mb-6">Submit a Ticket</h2>
          <form>
            {/* Full Name Input */}
            <div className="mb-4">
              <label htmlFor="fullName" className="block text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                id="fullName"
                placeholder="Full Name"
                className="w-full p-3 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400 hover:bg-yellow-100"
                required
              />
            </div>

            {/* Email Input */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                id="email"
                placeholder="john.doe@example.com"
                className="w-full p-3 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400 hover:bg-yellow-100"
                required
              />
            </div>

            {/* Issue Type Select */}
            <div className="mb-4">
              <label htmlFor="issueType" className="block text-gray-700 mb-2">Issue Type</label>
              <select
                id="issueType"
                className="w-full p-3 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400 hover:bg-yellow-100"
                required
              >
                <option value="">Select Issue Type</option>
                <option>Order Issue</option>
                <option>Payment Issue</option>
                <option>Product Issue</option>
                <option>Return & Exchange Issue</option>
                <option>Account Issue</option>
                <option>Shipping Issue</option>
                <option>Technical Issue</option>
                <option>General Inquiry</option>
              </select>
            </div>

            {/* Order Number Input */}
            <div className="mb-4">
              <label htmlFor="orderNumber" className="block text-gray-700 mb-2">Order Number</label>
              <input
                type="text"
                id="orderNumber"
                placeholder="Order no."
                className="w-full p-3 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400 hover:bg-yellow-100"
              />
            </div>

            {/* Description Textarea */}
            <div className="mb-6">
              <label htmlFor="description" className="block text-gray-700 mb-2">Detailed Message/Description</label>
              <textarea
                id="description"
                placeholder="Detailed Message/Description"
                className="w-full p-3 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400 hover:bg-yellow-100 resize-y"
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className='flex justify-center'>
              <button
                type="submit"
                className="w-1/3 p-3 bg-yellow-400 text-white font-bold rounded-md hover:bg-yellow-500 transition-colors"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HelpDesk;
