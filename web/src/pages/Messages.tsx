import { useEffect, useState, FormEvent } from "react";
import { api } from "../api/client";

interface Match {
  id: string;
  activity: { name: string };
}

interface Message {
  id: string;
  senderId: string;
  content: string | null;
  createdAt: string;
}

export const Messages = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    api
      .listMatches()
      .then(setMatches)
      .catch(() => setMatches([]));
  }, []);

  useEffect(() => {
    if (!selectedId) return;
    api
      .listMessages(selectedId)
      .then(setMessages)
      .catch(() => setMessages([]));
  }, [selectedId]);

  const handleSend = (e: FormEvent) => {
    e.preventDefault();
    if (!selectedId || !text.trim()) return;
    api
      .sendMessage(selectedId, text.trim())
      .then((m) => {
        setMessages((prev) => [...prev, m]);
        setText("");
      })
      .catch(() => {
        // Keep it simple: we do not add error complexity here.
      });
  };

  return (
    <div className="screen" aria-label="Messages">
      <h1 className="screen-title">Messages</h1>
      <div className="messages-layout">
        <aside className="conversations">
          <h2 className="subheading">Friends</h2>
          <ul className="list">
            {matches.map((m) => (
              <li key={m.id}>
                <button
                  type="button"
                  className="list-item-button"
                  onClick={() => setSelectedId(m.id)}
                >
                  <span style={{ fontSize: "1.5rem", marginRight: "0.75rem" }} aria-hidden="true">👤</span>
                  {m.activity?.name || "Friend"}
                </button>
              </li>
            ))}
          </ul>
        </aside>
        <section className="chat" aria-label="Conversation">
          {selectedId ? (
            <>
              <div className="chat-messages">
                {messages.map((msg) => (
                  <div key={msg.id} className="chat-bubble">
                    <span>{msg.content}</span>
                    <span className="chat-time">
                      {new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit"
                      })}
                    </span>
                  </div>
                ))}
              </div>
              <form className="chat-input-row" onSubmit={handleSend}>
                <label className="field-label">
                  Your message
                  <textarea
                    className="field-input"
                    rows={2}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />
                </label>
                <button type="submit" className="large-button">
                  Send
                </button>
              </form>
            </>
          ) : (
            <div className="empty-state">
              <div className="empty-state-icon">💬</div>
              <p className="helper-text">Choose a friend to start talking.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};



