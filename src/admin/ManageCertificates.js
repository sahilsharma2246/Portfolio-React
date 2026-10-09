/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import firedb from "../Firebase";

function ManageCertificates() {
    const initialState = {
        title: "",
        issuer: "",
        image: "",
        downloadUrl: "",
    };

    const [cert, setCert] = useState(initialState);
    const [certificates, setCertificates] = useState({});
    const [editId, setEditId] = useState("");

    useEffect(() => {
        firedb.child("Certificates").on("value", (snapshot) => {
            if (snapshot.val() != null) {
                setCertificates(snapshot.val());
            } else {
                setCertificates({});
            }
        });
    }, []);

    const handleChange = (e) => {
        setCert({ ...cert, [e.target.name]: e.target.value });
    };

    const saveCert = (e) => {
        e.preventDefault();
        if (!cert.title) {
            alert("Please enter Certificate Title");
            return;
        }

        if (editId) {
            firedb.child(`Certificates/${editId}`).set(cert, (err) => {
                if (!err) {
                    alert("Certificate Updated Successfully");
                    setCert(initialState);
                    setEditId("");
                }
            });
        } else {
            firedb.child("Certificates").push(cert, (err) => {
                if (!err) {
                    alert("Certificate Added Successfully");
                    setCert(initialState);
                }
            });
        }
    };

    const deleteCert = (id) => {
        if (window.confirm("Are you sure you want to delete this certificate?")) {
            firedb.child(`Certificates/${id}`).remove();
        }
    };

    return (
        <div className="space-y-8">
            <div className="border-b border-slate-700 pb-4">
                <h2 className="text-2xl font-bold text-white">Manage Certificates</h2>
                <p className="text-slate-400 text-sm">Add or edit certificates shown to users</p>
            </div>

            {/* Form with 4 inputs */}
            <form onSubmit={saveCert} className="bg-slate-800/80 border border-slate-700/60 p-6 rounded-xl space-y-4 shadow-xl">
                <h3 className="text-lg font-semibold text-cyan-400">
                    {editId ? "Edit Certificate" : "Add New Certificate"}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        1.             <label className="block text-xs text-slate-300 mb-1">Certificate Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            placeholder="e.g. Full-Stack Web Development"
                            value={cert.title}
                            onChange={handleChange}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                        />
                    </div>

                    <div>
                        <label className="block text-xs text-slate-300 mb-1">2. Issuer Name</label>
                        <input
                            type="text"
                            name="issuer"
                            placeholder="e.g. Coursera / Udemy / SS Fasteners"
                            value={cert.issuer}
                            onChange={handleChange}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs text-slate-300 mb-1">3. Certificate Image URL (Viewable Image)</label>
                        <input
                            type="text"
                            name="image"
                            placeholder="Image link (https://...)"
                            value={cert.image}
                            onChange={handleChange}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                        />
                    </div>

                    <div>
                        <label className="block text-xs text-slate-300 mb-1">4. Download File URL (PDF or Image Download Link)</label>
                        <input
                            type="text"
                            name="downloadUrl"
                            placeholder="Download link (https://...)"
                            value={cert.downloadUrl}
                            onChange={handleChange}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                        />
                    </div>
                </div>

                <div className="flex gap-3 pt-2">
                    <button type="submit" className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg transition">
                        {editId ? "Update Certificate" : "Add Certificate"}
                    </button>

                    {editId && (
                        <button
                            type="button"
                            onClick={() => {
                                setCert(initialState);
                                setEditId("");
                            }}
                            className="px-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-slate-200 font-medium rounded-lg transition"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            {/* List */}
            <div className="space-y-3">
                <h3 className="text-lg font-bold text-white">Certificate List</h3>
                {Object.keys(certificates).length === 0 ? (
                    <p className="text-slate-500 text-sm">No certificates added yet.</p>
                ) : (
                    Object.keys(certificates).map((id) => (
                        <div key={id} className="bg-slate-800/60 border border-slate-700/60 p-4 rounded-xl flex items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                
                                <div>
                                    <h4 className="font-bold text-white">{certificates[id].title}</h4>
                                    <p className="text-xs text-slate-400">
                                        Issuer: <span className="text-cyan-400">{certificates[id].issuer}</span>
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-2 shrink-0">
                                <button
                                    onClick={() => {
                                        setCert(certificates[id]);
                                        setEditId(id);
                                    }}
                                    className="px-3 py-1.5 bg-amber-600/80 hover:bg-amber-500 text-white text-xs font-semibold rounded"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => deleteCert(id)}
                                    className="px-3 py-1.5 bg-red-600/80 hover:bg-red-500 text-white text-xs font-semibold rounded"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default ManageCertificates;