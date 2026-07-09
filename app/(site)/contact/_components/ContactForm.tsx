"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

// Assuming you have these Shadcn UI components setup.
// If not, standard HTML <input> and <textarea> tags will work with Tailwind!
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const currentForm = e.currentTarget;
    const form = new FormData(currentForm);
    const name = form.get("name")?.toString().trim() || "";
    const email = form.get("email")?.toString().trim() || "";
    const subject = form.get("subject")?.toString().trim() || "";
    const message = form.get("message")?.toString().trim() || "";

    if (!name || !email || !subject || !message) {
      toast.error("Please fill in all fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || "Failed to send message.");
      }

      toast.success("Message sent! We'll get back to you soon.");
      currentForm.reset();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-gray-50 py-16 md:py-24">
      <div className="layout-container">
        <div className="mx-auto max-w-3xl rounded-[2.5rem] border border-gray-100 bg-white p-8 shadow-sm md:p-12 lg:p-16">
          <div className="mb-10 text-center">
            <h2 className="text-heading-md text-dark mb-4">Get in Touch</h2>
            <p className="text-body-md text-muted">
              Have a question, need prayer, or want to learn more about our ministry? Send us a message and our team
              will get back to you.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Name & Email Row */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="name" className="text-dark text-sm font-bold">
                  Full Name
                </label>
                <Input
                  id="name"
                  name="name"
                  required
                  placeholder="John Doe"
                  className="focus-visible:ring-danger-500 rounded-xl border-gray-200 bg-gray-50 px-4 py-6"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-dark text-sm font-bold">
                  Email Address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="john@example.com"
                  className="focus-visible:ring-danger-500 rounded-xl border-gray-200 bg-gray-50 px-4 py-6"
                />
              </div>
            </div>

            {/* Subject Line */}
            <div className="space-y-2">
              <label htmlFor="subject" className="text-dark text-sm font-bold">
                Subject
              </label>
              <Input
                id="subject"
                name="subject"
                required
                placeholder="How can we help?"
                className="focus-visible:ring-danger-500 rounded-xl border-gray-200 bg-gray-50 px-4 py-6"
              />
            </div>

            {/* Message Area */}
            <div className="space-y-2">
              <label htmlFor="message" className="text-dark text-sm font-bold">
                Message
              </label>
              <Textarea
                id="message"
                name="message"
                required
                placeholder="Write your message here..."
                rows={5}
                className="focus-visible:ring-danger-500 resize-none rounded-xl border-gray-200 bg-gray-50 px-4 py-4"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              size="xl"
              disabled={isSubmitting}
              className="bg-danger-500 shadow-danger-500/20 hover:bg-danger-600 w-full rounded-full font-bold text-white shadow-lg active:scale-95 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
              <Send className="ml-2 size-5" />
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
