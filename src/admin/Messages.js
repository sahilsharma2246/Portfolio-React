/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import firedb from "../Firebase";

function Messages() {
  const [messages, setMessages] = useState({});

  useEffect(() => {
    firedb.child("Messages").on("value", (snapshot) => {
      setMessages(snapshot.val() || {});
    });
  }, []);

  const deleteMessage = (id) => {
    if (window.confirm("Delete message?")) {
      firedb.child(`Messages/${id}`).remove();
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-700 pb-4">
        <h2 className="text-2xl font-bold text-white">Contact Messages</h2>
        <p className="text-slate-400 text-sm">View user submissions from contact form</p>
      </div>

      <div className="space-y-4">
        {Object.keys(messages).length === 0 ? (
          <p className="text-slate-500 text-sm">No messages received yet.</p>
        ) : (
          Object.keys(messages).map((id) => (
            <div key={id} className="bg-slate-800/80 border border-slate-700/60 p-5 rounded-xl space-y-3 shadow-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-cyan-400">{messages[id].name}</h4>
                  <a href={`mailto:${messages[id].email}`} className="text-xs text-slate-400 hover:underline">
                    {messages[id].email}
                  </a>
                </div>
                <button
                  onClick={() => deleteMessage(id)}
                  className="px-3 py-1 bg-red-600/80 hover:bg-red-500 text-white text-xs font-semibold rounded"
                >
                  Delete
                </button>
              </div>
              <p className="text-sm text-slate-200 bg-slate-900/60 p-3 rounded-lg leading-relaxed border border-slate-800">
                {messages[id].message}
              </p>
              {messages[id].timestamp && (
                <p className="text-[10px] text-slate-500 text-right">
                  Sent on: {new Date(messages[id].timestamp).toLocaleString()}
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Messages;