"use client";

import React from "react";

interface ContactFormProps {
  email: string;
}

export default function ContactForm({ email }: Readonly<ContactFormProps>) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const subject = encodeURIComponent((data.subject as string) || "Contact Form Submission");
    const body = encodeURIComponent(`Name: ${data.name}\nPhone: ${data.phone}\nEmail: ${data.email}\n\nMessage:\n${data.message}`);

    globalThis.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-lg-6 col-md-6">
          <div className="input-area">
            <input type="text" name="name" placeholder="Name" required />
          </div>
        </div>
        <div className="col-lg-6 col-md-6">
          <div className="input-area">
            <input type="text" name="phone" placeholder="Phone" />
          </div>
        </div>
        <div className="col-lg-12 col-md-6">
          <div className="input-area">
            <input type="email" name="email" placeholder="Email" required />
          </div>
        </div>
        <div className="col-lg-12 col-md-6">
          <div className="input-area">
            <input type="text" name="subject" placeholder="Subjects" />
          </div>
        </div>
        <div className="col-lg-12">
          <div className="input-area">
            <textarea name="message" placeholder="Message" required />
          </div>
        </div>
        <div className="col-lg-12">
          <div className="space24" />
          <div className="input-area text-end">
            <button type="submit" className="vl-btn1">
              Submit Now
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
