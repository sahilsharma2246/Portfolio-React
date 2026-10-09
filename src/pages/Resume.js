/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import firedb from "../Firebase";

function Resume() {
  const [resumeUrl, setResumeUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    firedb.child("Profile").on("value", (snapshot) => {
      const data = snapshot.val();
      if (data && (data.resume || data.resumeUrl)) {
        let url = data.resume || data.resumeUrl;

        // Transform Google Drive share links into direct preview embeds
        if (url.includes("drive.google.com") && url.includes("/file/d/")) {
          const fileId = url.split("/file/d/")[1]?.split("/")[0];
          if (fileId) {
            url = `https://drive.google.com/file/d/${fileId}/preview`;
          }
        }
        setResumeUrl(url);
      }
      setLoading(false);
    });

    return () => firedb.child("Profile").off();
  }, []);

  return (
    <section className="py-8 max-w-5xl mx-auto px-4 space-y-6 bg-[#f8f9fa] text-zinc-900 font-sans min-h-[80vh]">
      {/* Page Header Card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-zinc-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="inline-block px-3.5 py-1.5 bg-cyan-50 text-cyan-700 border border-cyan-200/80 rounded-full text-xs font-semibold tracking-wide uppercase">
            Official Document
          </span>
          <h2 className="text-3xl font-extrabold text-zinc-900 tracking-tight">
            Curriculum Vitae
          </h2>
          <p className="text-zinc-500 text-sm">
            Preview or download my latest resume
          </p>
        </div>

        {resumeUrl && (
          <a
            href={resumeUrl}
            target="_blank"
            rel="noreferrer"
            download
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-zinc-900 hover:bg-zinc-800 text-white font-bold rounded-full transition shadow-xs text-xs sm:text-sm shrink-0"
          >
            📥 Download PDF
          </a>
        )}
      </div>

      {/* PDF Viewer Container */}
      {loading ? (
        <div className="bg-white rounded-3xl p-16 text-center text-zinc-500 border border-zinc-200/80 shadow-sm">
          Loading Resume...
        </div>
      ) : resumeUrl ? (
        <div className="bg-white border border-zinc-200/80 rounded-3xl overflow-hidden shadow-sm p-2 sm:p-4">
          <div className="w-full h-[75vh] md:h-[85vh] rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-200/60">
            <iframe
              src={resumeUrl}
              title="Resume Preview"
              className="w-full h-full border-0"
              allow="autoplay"
            />
          </div>
        </div>
      ) : (
        <div className="text-center py-16 bg-white border border-zinc-200/80 rounded-3xl space-y-3 p-8 shadow-sm">
          <p className="text-zinc-600 text-base font-semibold">
            No resume PDF uploaded yet.
          </p>
          <p className="text-zinc-400 text-xs max-w-md mx-auto">
            Add your PDF link in the Admin Dashboard under{" "}
            <strong className="text-zinc-700">Profile → Resume Link</strong>.
          </p>
        </div>
      )}
    </section>
  );
}

export default Resume;