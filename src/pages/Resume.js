import React, { useEffect, useState } from "react";
import firedb from "../Firebase";

function Resume() {
  const [resumeData, setResumeData] = useState({
    pdfUrl: "",
    previewImgUrl: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch profile resume data from Firebase Realtime Database
    const profileRef = firedb.child("Profile");
    
    const handleData = (snapshot) => {
      const data = snapshot.val();
      if (data) {
        let pdf = data.resume || data.resumeUrl || "";
        let img = data.resumeImage || data.resumeImg || "";

        // Normalize HTTP to HTTPS to prevent mixed-content blocks on hosted domains
        if (pdf.startsWith("http://")) pdf = pdf.replace("http://", "https://");
        if (img.startsWith("http://")) img = img.replace("http://", "https://");

        setResumeData({ pdfUrl: pdf, previewImgUrl: img });
      }
      setLoading(false);
    };

    profileRef.on("value", handleData);
    return () => profileRef.off("value", handleData);
  }, []);

  const { pdfUrl, previewImgUrl } = resumeData;

  return (
    <section className="py-10 max-w-4xl mx-auto px-4 space-y-6 text-zinc-900 font-sans min-h-[80vh]">
      {/* Header Card */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-zinc-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="inline-block px-3 py-1 bg-cyan-50 text-cyan-700 border border-cyan-200 rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
            Official Document
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Curriculum Vitae
          </h2>
          <p className="text-zinc-500 text-sm mt-1">
            View or download my latest resume
          </p>
        </div>

        {pdfUrl && (
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white text-xs sm:text-sm font-semibold rounded-xl transition shadow-xs"
            >
              📄 Open / Download PDF
            </a>
          </div>
        )}
      </div>

      {/* Resume Preview Container */}
      {loading ? (
        <div className="bg-white rounded-2xl p-16 text-center text-zinc-500 border border-zinc-200 shadow-sm">
          Loading Resume...
        </div>
      ) : previewImgUrl || pdfUrl ? (
        <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm p-4 sm:p-6 flex justify-center items-center">
          {previewImgUrl ? (
            /* Reliable image preview of your resume */
            <img
              src={previewImgUrl}
              alt="Resume Preview"
              className="w-full max-w-3xl h-auto rounded-lg border border-zinc-200 object-contain shadow-xs"
            />
          ) : (
            /* Fallback embed for direct PDF links */
            <iframe
              src={pdfUrl}
              title="Resume Document"
              className="w-full h-[75vh] rounded-lg border border-zinc-200"
            />
          )}
        </div>
      ) : (
        <div className="text-center py-16 bg-white border border-zinc-200 rounded-2xl space-y-2 p-6 shadow-sm">
          <p className="text-zinc-700 font-semibold">No resume link uploaded yet.</p>
          <p className="text-zinc-400 text-xs">
            Add your resume URL in your Firebase database under <code className="bg-zinc-100 px-1 py-0.5 rounded">Profile/resume</code>.
          </p>
        </div>
      )}
    </section>
  );
}

export default Resume;