/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import firedb from "../Firebase";

function Certificates() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    const certRef = firedb.child("Certificates");
    const handleValue = (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setCertificates(list);
      } else {
        setCertificates([]);
      }
      setLoading(false);
    };

    certRef.on("value", handleValue);
    return () => certRef.off("value", handleValue);
  }, []);

  return (
    <section className="py-12 max-w-6xl mx-auto px-4 space-y-8 bg-[#f8f9fa] text-zinc-900 font-sans min-h-[80vh]">
      {/* Title Section */}
      <div className="bg-white p-8 sm:p-10 rounded-3xl border border-zinc-200/80 shadow-sm space-y-2">
        <span className="inline-block px-3.5 py-1.5 bg-cyan-50 text-cyan-700 border border-cyan-200/80 rounded-full text-xs font-semibold tracking-wide uppercase">
          Qualifications
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
          Certificates & Credentials
        </h2>
        <p className="text-zinc-500 text-sm">
          Verified achievements and training completions
        </p>
      </div>

      {/* Content Section */}
      {loading ? (
        <div className="bg-white rounded-3xl p-12 text-center text-zinc-500 border border-zinc-200/80 shadow-sm">
          Loading certificates...
        </div>
      ) : certificates.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center text-zinc-400 border border-zinc-200/80 shadow-sm">
          No certificates found.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="bg-white border border-zinc-200/80 rounded-3xl overflow-hidden shadow-sm hover:border-indigo-200 hover:shadow-md transition duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Certificate Image Viewer */}
                {cert.image ? (
                  <div
                    className="relative cursor-pointer group overflow-hidden bg-zinc-100 border-b border-zinc-100 h-48"
                    onClick={() => setPreviewImage(cert.image)}
                  >
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                    <div className="absolute inset-0 bg-zinc-900/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white font-semibold text-xs backdrop-blur-xs">
                      🔍 Click to Preview
                    </div>
                  </div>
                ) : (
                  <div className="h-48 bg-zinc-100 border-b border-zinc-100 flex items-center justify-center text-zinc-400 text-sm">
                    📜 Certificate Preview
                  </div>
                )}

                {/* Title and Issuer */}
                <div className="p-6 space-y-1">
                  <h3 className="text-lg font-bold text-zinc-900 leading-snug">
                    {cert.title}
                  </h3>
                  <p className="text-xs text-zinc-500">
                    Issued by{" "}
                    <span className="text-cyan-700 font-semibold">
                      {cert.issuer}
                    </span>
                  </p>
                </div>
              </div>

              {/* Download Button */}
              <div className="p-6 pt-0">
                {cert.downloadUrl || cert.image ? (
                  <a
                    href={cert.downloadUrl || cert.image}
                    target="_blank"
                    rel="noreferrer"
                    download
                    className="block w-full text-center bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold py-3 rounded-full transition shadow-xs"
                  >
                    📥 Download Certificate
                  </a>
                ) : (
                  <span className="block text-center text-xs text-zinc-400 italic py-1">
                    No download link provided
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox / Modal for Previewing Image */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 bg-zinc-950/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setPreviewImage(null)}
        >
          <div className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center">
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-cyan-400 text-xs font-bold bg-zinc-900 px-4 py-2 rounded-full border border-zinc-700 shadow-md transition"
            >
              ✕ Close
            </button>
            <img
              src={previewImage}
              alt="Full Certificate Preview"
              className="max-w-full max-h-[85vh] object-contain rounded-2xl border border-zinc-200 shadow-2xl bg-white"
            />
          </div>
        </div>
      )}
    </section>
  );
}

export default Certificates;