
import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Connect your backend or email service here.
    console.log("Contact form:", formData);
    alert("Thank you for contacting us!");

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  const inputClasses =
    "w-full border border-neutral-200 bg-white px-4 py-3.5 text-sm text-neutral-900 outline-none transition focus:border-neutral-900 placeholder:text-neutral-400";

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      {/* Hero Section */}
      <section className="bg-[#f5f3ef] px-5 py-16 text-center sm:py-20 md:py-24">
        <p className="mb-5 text-[11px] font-bold tracking-[0.3em]">
          WE'RE HERE FOR YOU
        </p>

        <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl md:text-8xl">
          LET'S TALK<span className="text-[#a27b54]">.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-lg text-sm leading-7 text-neutral-600 sm:text-base">
          Have a question about your order, our shirts, or sizing?
          We'd love to hear from you.
        </p>
      </section>

      {/* Contact Content */}
      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 py-14 sm:px-8 md:gap-16 md:py-20 lg:grid-cols-2 lg:gap-24 lg:px-12">
        {/* Contact Information */}
        <div>
          <p className="mb-4 text-[11px] font-bold tracking-[0.25em] text-[#a27b54]">
            GET IN TOUCH
          </p>

          <h2 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            We'd love to
            <br />
            hear from you.
          </h2>

          <p className="mt-6 max-w-md text-sm leading-7 text-neutral-500">
            Whether you need help finding your perfect fit or tracking
            an order, our team is ready to help.
          </p>

          <div className="mt-10 space-y-8">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f5f3ef] text-xl">
                ✉
              </div>
              <div>
                <h3 className="text-sm font-semibold">Email us</h3>
                <a
                  href="mailto:support@shoply.com"
                  className="mt-2 block break-all text-sm text-neutral-500 transition hover:text-black"
                >
                  support@shoply.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f5f3ef] text-xl">
                ☎
              </div>
              <div>
                <h3 className="text-sm font-semibold">Call us</h3>
                <p className="mt-2 text-sm text-neutral-500">
                  +91 9321161645
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f5f3ef] text-xl">
                ◷
              </div>
              <div>
                <h3 className="text-sm font-semibold">Working hours</h3>
                <p className="mt-2 text-sm text-neutral-500">
                  Monday – Saturday, 10 AM – 6 PM
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-neutral-200 pt-6">
            <p className="text-[11px] font-bold tracking-[0.2em]">
              GOOD STYLE. GREAT SERVICE.
            </p>
            <p className="mt-2 text-sm text-neutral-500">
              We're just a message away.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="border border-neutral-200 p-5 sm:p-8 md:p-10">
          <p className="mb-4 text-[11px] font-bold tracking-[0.25em] text-[#a27b54]">
            SEND US A MESSAGE
          </p>

          <h2 className="mb-8 text-3xl font-semibold tracking-tight">
            How can we help?
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-xs font-semibold"
              >
                Full name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                className={inputClasses}
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-xs font-semibold"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                className={inputClasses}
                required
              />
            </div>

            <div>
              <label
                htmlFor="subject"
                className="mb-2 block text-xs font-semibold"
              >
                Subject
              </label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className={inputClasses}
                required
              >
                <option value="">Select a topic</option>
                <option value="Order enquiry">Order enquiry</option>
                <option value="Shipping">Shipping & delivery</option>
                <option value="Size and fit">Size & fit</option>
                <option value="Returns">Returns & exchanges</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-xs font-semibold"
              >
                Your message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Tell us how we can help..."
                value={formData.message}
                onChange={handleChange}
                className={`${inputClasses} resize-y`}
                required
              />
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-between bg-neutral-900 px-5 py-4 text-xs font-bold tracking-[0.15em] text-white transition hover:bg-[#a27b54]"
            >
              SEND MESSAGE
              <span className="text-lg">↗</span>
            </button>

            <p className="text-center text-xs text-neutral-400">
              We'll get back to you as soon as possible.
            </p>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Contact;
