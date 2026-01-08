/**
 * Chat screen - one to one only
 * Large text bubbles
 * Voice message record button
 * Send button
 * Read aloud toggle
 * Block and report button
 * Back button returns to Messages list
 */

import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { mockApi } from "../services/mockApi";
import { useAppStore } from "../state/store";
import { useTextToSpeech } from "../hooks/useTextToSpeech";
import { TopBar } from "../components/navigation/TopBar";
import "./ChatPage.css";

interface Message {
  id: string;
  senderId: string;
  content: string | null;
  createdAt: string;
  isVoice?: boolean;
}

interface Match {
  id: string;
  activity: { name: string };
  user: { firstName: string };
}

export const ChatPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, accessibility } = useAppStore();
  const { speak, stop } = useTextToSpeech();
  const [match, setMatch] = useState<Match | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageText, setMessageText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!id) {
      navigate("/messages");
      return;
    }

    // Load match and messages
    mockApi
      .getMatches()
      .then((matches) => {
        const found = matches.find((m) => m.id === id);
        if (found) {
          setMatch(found);
          return mockApi.getMessages(id);
        }
        return [];
      })
      .then(setMessages)
      .catch(() => {
        setMessages([]);
        navigate("/messages");
      });
  }, [id, navigate]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !messageText.trim()) return;

    try {
      const newMessage = await mockApi.sendMessage(id, messageText.trim());
      setMessages((prev) => [...prev, newMessage]);
      setMessageText("");
    } catch (err) {
      // Error handling
    }
  };

  const handleReadAloud = (content: string) => {
    if (accessibility.textToSpeech) {
      speak(content);
    }
  };

  if (!match) {
    return (
      <div className="chat-page">
        <TopBar title="Messages" backTo="/messages" />
        <div className="page-loading">
          <div className="loading" aria-label="Loading conversation"></div>
          <p>Loading conversation...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-page">
      <TopBar title={match.user.firstName} backTo="/messages" />

      <div className="chat-conversation">
        <div className="chat-header">
          <p className="chat-activity">{match.activity.name}</p>
        </div>

              <div className="chat-messages-container">
                {messages.map((msg) => {
                  const isSent = msg.senderId === user?.id;
                  return (
                    <div
                      key={msg.id}
                      className={`message-bubble ${isSent ? "sent" : "received"}`}
                    >
                      <p>{msg.content}</p>
                      <span className="message-time">
                        {new Date(msg.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit"
                        })}
                      </span>
                      {!isSent && accessibility.textToSpeech && (
                        <button
                          className="read-aloud-button"
                          onClick={() => msg.content && handleReadAloud(msg.content)}
                          aria-label="Read message aloud"
                        >
                          🔊 Read
                        </button>
                      )}
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              <form onSubmit={handleSend} className="chat-input-form">
                <textarea
                  className="textarea-field"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Type your message..."
                  rows={3}
                />
                <div className="chat-actions">
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => setIsRecording(!isRecording)}
                    aria-pressed={isRecording}
                  >
                    {isRecording ? "⏹ Stop recording" : "🎤 Record voice"}
                  </button>
                  <button type="submit" className="btn-primary" disabled={!messageText.trim()}>
                    Send
                  </button>
                </div>
              </form>

        <div className="chat-safety">
          <button
            className="btn-danger"
            onClick={() => {
              if (
                confirm(
                  "Are you sure you want to block and report this person?"
                )
              ) {
                // Handle block and report
                navigate("/help");
              }
            }}
          >
            Block and report
          </button>
        </div>
      </div>
    </div>
  );
};
