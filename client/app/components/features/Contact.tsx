"use client";

import { useForm } from "react-hook-form";
import { usePortfolioStore } from "../../stores/usePortfolioStore";
import { yupResolver } from "@hookform/resolvers/yup";
import { contactSchema } from "../../common/validator";
import toast from "react-hot-toast";
import {
  Calendar,
  CheckCircle,
  Copy,
  FileText,
  Lock,
  Mail,
  Send,
} from "lucide-react";
import { CONTACT_METHODS, directEmail } from "../../common/data";
import * as yup from "yup";

type FormData = yup.InferType<typeof contactSchema>;

function Contact() {
  const { selectedRating, setSelectedRating } = usePortfolioStore();
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        toast.custom(
          (t) => (
            <div
              className={`${
                t.visible ? "animate-enter" : "animate-leave"
              } max-w-md w-full bg-[#282832]/95 border border-[#d2bbff]/30 text-[#f1f0f5] shadow-[0_12px_40px_rgba(0,0,0,0.8)] backdrop-blur-md rounded-xl p-4 flex items-center gap-3 pointer-events-auto`}
            >
              <CheckCircle className="w-5 h-5 text-[#d2bbff] shrink-0" />
              <div className="font-mono text-xs tracking-wide">
                Copied{" "}
                <span className="text-[#d2bbff] font-semibold">{text}</span> to
                clipboard
              </div>
            </div>
          ),
          { duration: 2600 },
        );
      },
      () => {
        toast.error("Failed to copy text");
      },
    );
  };

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(contactSchema),
    defaultValues: {
      rating: 5,
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/testimonial`,
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.ok) {
        toast.success("Feedback sent!");
        reset();
      } else {
        toast.error("Unable to send feedback.");
      }
    } catch (error) {
      toast.error(
        error || error?.message || "An error occurred while sending feedback.",
      );
    }
  };

  return (
    <section
      id="contact"
      className="max-w-7xl mx-auto px-6 lg:px-12 py-20 border-t border-[#27272e]"
    >
      <div className="flex flex-col mb-12">
        <div className="font-mono text-xs uppercase tracking-wider text-[#ff8c61] font-semibold mb-2 flex items-center gap-2">
          <Mail className="w-4 h-4" />
          <span>Fast-Track Recruiter Triage</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#f1f0f5]">
          Let's Connect &amp; Collaborate
        </h2>
        <p className="text-sm text-[#9d9bb0] mt-2 max-w-xl">
          Interested in bringing cloud or full-stack engineering to your
          engineering organization?
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Direct Contact Cards */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="p-6 rounded-2xl bg-[#121215] border border-[#27272e] flex flex-col gap-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#27272e]/60">
              <div className="flex items-center gap-2.5">
                <FileText className="w-5 h-5 text-[#d2bbff]" />
                <span className="font-mono text-sm font-semibold text-[#f1f0f5]">
                  Direct Contact Information
                </span>
              </div>
              <span className="font-mono text-[11px] text-emerald-400 font-medium px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                Available
              </span>
            </div>

            <div className="flex flex-col gap-4 text-xs font-mono">
              <div className="flex flex-col gap-1.5">
                <span className="text-[#4a4857] uppercase text-[10px] tracking-wider">
                  Direct Email
                </span>
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#0e0e11] border border-[#27272e]">
                  <span className="text-[#f1f0f5] font-medium select-all">
                    {directEmail}
                  </span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(directEmail, "Email")}
                    className="cursor-pointer px-2.5 py-1 rounded-md bg-[#202026] hover:bg-[#282832] text-[#d2bbff] flex items-center gap-1 transition-colors"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-[#4a4857] uppercase text-[10px] tracking-wider">
                  Direct Phone
                </span>
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#0e0e11] border border-[#27272e]">
                  <span className="text-[#f1f0f5] font-medium">
                    +234 (805) 4945 601
                  </span>
                  <span className="text-[#9d9bb0] text-[11px]">
                    Chat / Call
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#0e0e11] border border-[#27272e] flex flex-col gap-1">
                <span className="text-[#4a4857] text-[10px] uppercase">
                  Location
                </span>
                <div className="flex items-center justify-between">
                  <span className="text-[#f1f0f5] font-medium">
                    LG, NG (WAT / GMT+1)
                  </span>
                  <span className="text-[10px] text-[#9d9bb0]">
                    Remote &amp; Hybrid
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#0e0e11] border border-[#27272e] flex items-center gap-2.5 text-[#9d9bb0]">
                <Calendar className="w-4 h-4 text-[#d2bbff]" />
                <span className="text-[11px]">
                  Available for Enterprise &amp; Lead Roles
                </span>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-2 border-t border-[#27272e]/60 flex flex-col gap-2.5">
              <span className="font-mono text-[10px] uppercase text-[#4a4857] tracking-wider">
                Profiles &amp; Ecosystem
              </span>
              <div className="grid grid-cols-4 gap-2.5">
                {CONTACT_METHODS.map((soc, idx) => {
                  const IconComp = soc.icon;
                  return (
                    <a
                      key={idx}
                      href={soc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-[#0e0e11] border border-[#27272e] text-[#9d9bb0] hover:text-white transition-all group"
                    >
                      <IconComp
                        className={`w-4 h-4 ${soc.theme === "primary" ? "group-hover:text-[#d2bbff]" : "group-hover:text-[#ff8c61]"}`}
                      />
                      <span className="font-mono text-[10px] mt-1">
                        {soc.name}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Feedback & Review Form */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-8 rounded-2xl bg-[#121215] border border-[#27272e] flex flex-col gap-6 shadow-xl"
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#27272e]/60">
              <div>
                <h3 className="text-lg font-semibold text-[#f1f0f5]">
                  Share Your Feedback &amp; Ratings
                </h3>
                <p className="text-xs text-[#9d9bb0] mt-0.5">
                  Review portfolio depth, evaluate system architectures.
                </p>
              </div>
              <span className="font-mono text-xs text-[#ff8c61] font-medium px-2.5 py-1 rounded bg-[#ff6b35]/10 border border-[#ff6b35]/20">
                Evaluation
              </span>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="fullName"
                  className="font-mono text-xs text-[#9d9bb0]"
                >
                  Full Name *
                </label>
                <input
                  id="fullName"
                  type="text"
                  placeholder="Sarah Jenkins"
                  {...register("full_name")}
                  className="w-full px-4 py-3 rounded-xl bg-[#0e0e11] border border-[#27272e] text-[#f1f0f5] placeholder:text-[#4a4857] text-sm focus:outline-none focus:border-[#d2bbff] transition-colors"
                />
                {errors.full_name && (
                  <span className="font-mono text-[11px] text-red-400">
                    {errors.full_name.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="font-mono text-xs text-[#9d9bb0]"
                >
                  Work Email *
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="sarah@company.com"
                  {...register("email")}
                  className="w-full px-4 py-3 rounded-xl bg-[#0e0e11] border border-[#27272e] text-[#f1f0f5] placeholder:text-[#4a4857] text-sm focus:outline-none focus:border-[#d2bbff] transition-colors"
                />
                {errors.email && (
                  <span className="font-mono text-[11px] text-red-400">
                    {errors.email.message}
                  </span>
                )}
              </div>
            </div>

            {/* Star Rating Options */}
            <div className="flex flex-col gap-2.5">
              <label
                htmlFor="rating"
                className="font-mono text-xs text-[#9d9bb0]"
              >
                Overall Rating *
              </label>
              <div className="flex flex-wrap gap-2">
                {[5, 4, 3, 2, 1].map((star) => (
                  <label
                    key={star}
                    onClick={() => {
                      setSelectedRating(star);
                      setValue("rating", star);
                    }}
                    className={`cursor-pointer p-2 rounded-xl bg-[#0e0e11] border flex flex-col items-center justify-center gap-1 text-center transition-all ${
                      selectedRating === star
                        ? "border-[#ff8c61] bg-[#ff6b35]/10"
                        : "border-[#27272e] hover:border-[#ff8c61]/50"
                    }`}
                  >
                    <input
                      id="rating"
                      type="radio"
                      value={star}
                      {...register("rating")}
                      className="hidden"
                    />
                    <span className="text-sm text-[#ff8c61]">
                      {"★".repeat(star)}
                      {"☆".repeat(5 - star)}
                    </span>
                    <span
                      className={`font-mono text-[10px] font-medium ${
                        selectedRating === star
                          ? "text-[#ff8c61]"
                          : "text-[#9d9bb0]"
                      }`}
                    >
                      {star} {star === 1 ? "Star" : "Stars"}
                    </span>
                  </label>
                ))}
              </div>
              {errors.rating && (
                <span className="font-mono text-[11px] text-red-400">
                  {errors.rating.message}
                </span>
              )}
            </div>

            {/* Message Textarea */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="message"
                className="font-mono text-xs text-[#9d9bb0]"
              >
                Comment / Message *
              </label>
              <textarea
                id="message"
                rows={4}
                placeholder="Share your feedback, architectural critique, or project impressions..."
                {...register("comment")}
                className="w-full px-4 py-3 rounded-xl bg-[#0e0e11] border border-[#27272e] text-[#f1f0f5] placeholder:text-[#4a4857] text-sm focus:outline-none focus:border-[#d2bbff] transition-colors resize-none"
              />
              {errors.comment && (
                <span className="font-mono text-[11px] text-red-400">
                  {errors.comment.message}
                </span>
              )}
            </div>

            {/* Submit Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-[#27272e]/60">
              <span className="text-xs text-[#4a4857] font-mono flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-emerald-400" />
                <span>Encrypted / Secure transmission via TLS 1.3</span>
              </span>
              <button
                type="submit"
                disabled={isSubmitting}
                className="cursor-pointer w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#ff6b35] hover:bg-[#ff5517] text-white font-medium text-xs font-mono shadow-[0_0_20px_-3px_rgba(255,107,53,0.5)] transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Submit Feedback &amp; Review</span>
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
