"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Search,
  Send,
  Image as ImageIcon,
  FileText,
  Smile,
  MoreVertical,
  Phone,
  Video,
  User,
  Circle,
  Paperclip,
} from "lucide-react";
import { SalesHeader } from "@/components/sales/header";
import {
  mockChatSessions,
  formatTime,
  getStatusColor,
} from "@/lib/mock-data/sales";
import type { ChatSession, ChatMessage } from "@/lib/types/sales";
import { cn } from "@/lib/utils";

const emojis = ["😀", "😊", "👍", "❤️", "🎉", "🔥", "✅", "📱", "💰", "🙏"];

export default function ChatPage() {
  const [sessions, setSessions] = useState<ChatSession[]>(mockChatSessions);
  const [selectedSession, setSelectedSession] = useState<ChatSession | null>(
    mockChatSessions[0]
  );
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedSession?.messages]);

  // Simulate typing indicator
  useEffect(() => {
    if (selectedSession?.status === "online") {
      const interval = setInterval(() => {
        if (Math.random() > 0.7) {
          setIsTyping(true);
          setTimeout(() => setIsTyping(false), 2000);
        }
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [selectedSession]);

  const filteredSessions = sessions.filter((session) =>
    session.customer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!message.trim() || !selectedSession) return;

    const newMessage: ChatMessage = {
      id: `m${Date.now()}`,
      senderId: "staff1",
      senderName: "Nhân viên",
      content: message,
      type: "text",
      timestamp: new Date(),
      isStaff: true,
    };

    setSessions((prev) =>
      prev.map((session) =>
        session.id === selectedSession.id
          ? {
              ...session,
              messages: [...session.messages, newMessage],
              lastMessage: message,
              lastMessageTime: new Date(),
            }
          : session
      )
    );

    setSelectedSession((prev) =>
      prev
        ? {
            ...prev,
            messages: [...prev.messages, newMessage],
            lastMessage: message,
            lastMessageTime: new Date(),
          }
        : null
    );

    setMessage("");
  };

  const handleSelectSession = (session: ChatSession) => {
    setSelectedSession(session);
    // Mark as read
    setSessions((prev) =>
      prev.map((s) =>
        s.id === session.id ? { ...s, unreadCount: 0 } : s
      )
    );
  };

  const insertEmoji = (emoji: string) => {
    setMessage((prev) => prev + emoji);
  };

  const getStatusIndicator = (status: string) => {
    switch (status) {
      case "online":
        return "bg-success";
      case "away":
        return "bg-warning";
      default:
        return "bg-muted";
    }
  };

  const totalUnread = sessions.reduce(
    (sum, session) => sum + session.unreadCount,
    0
  );

  return (
    <div className="flex flex-col h-screen">
      <SalesHeader title="Chat hỗ trợ khách hàng" showSearch={false} />

      <div className="flex-1 flex overflow-hidden">
        {/* Conversations List */}
        <div className="w-80 lg:w-96 border-r bg-card flex flex-col">
          {/* Search */}
          <div className="p-4 border-b">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold">Hội thoại</h2>
              {totalUnread > 0 && (
                <Badge variant="destructive">{totalUnread} mới</Badge>
              )}
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Tìm khách hàng..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          {/* Sessions List */}
          <ScrollArea className="flex-1">
            <div className="p-2">
              {filteredSessions.map((session) => (
                <div
                  key={session.id}
                  className={cn(
                    "flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors",
                    selectedSession?.id === session.id
                      ? "bg-primary/10"
                      : "hover:bg-secondary"
                  )}
                  onClick={() => handleSelectSession(session)}
                >
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {session.customer.name.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <span
                      className={cn(
                        "absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-card",
                        getStatusIndicator(session.status)
                      )}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium truncate">
                        {session.customer.name}
                      </p>
                      {session.lastMessageTime && (
                        <span className="text-xs text-muted-foreground">
                          {formatTime(session.lastMessageTime)}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {session.lastMessage}
                    </p>
                  </div>
                  {session.unreadCount > 0 && (
                    <Badge
                      variant="destructive"
                      className="shrink-0 h-5 min-w-5 justify-center rounded-full px-1.5"
                    >
                      {session.unreadCount}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-secondary/30">
          {selectedSession ? (
            <>
              {/* Chat Header */}
              <div className="h-16 px-4 border-b bg-card flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar>
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {selectedSession.customer.name.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <span
                      className={cn(
                        "absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-card",
                        getStatusIndicator(selectedSession.status)
                      )}
                    />
                  </div>
                  <div>
                    <p className="font-medium">
                      {selectedSession.customer.name}
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Circle
                        className={cn(
                          "h-2 w-2",
                          selectedSession.status === "online"
                            ? "fill-success text-success"
                            : "fill-muted text-muted"
                        )}
                      />
                      {selectedSession.status === "online"
                        ? "Đang hoạt động"
                        : selectedSession.status === "away"
                        ? "Vắng mặt"
                        : "Ngoại tuyến"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <User className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4 max-w-3xl mx-auto">
                  {selectedSession.messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={cn(
                        "flex",
                        msg.isStaff ? "justify-end" : "justify-start"
                      )}
                    >
                      <div
                        className={cn(
                          "max-w-[70%] rounded-2xl px-4 py-2",
                          msg.isStaff
                            ? "bg-primary text-primary-foreground rounded-br-sm"
                            : "bg-card rounded-bl-sm"
                        )}
                      >
                        <p className="text-sm">{msg.content}</p>
                        <p
                          className={cn(
                            "text-xs mt-1",
                            msg.isStaff
                              ? "text-primary-foreground/70"
                              : "text-muted-foreground"
                          )}
                        >
                          {formatTime(msg.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-card rounded-2xl rounded-bl-sm px-4 py-2">
                        <div className="flex gap-1">
                          <span className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]" />
                          <span className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]" />
                          <span className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" />
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Message Input */}
              <div className="p-4 border-t bg-card">
                <div className="flex items-end gap-2 max-w-3xl mx-auto">
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Paperclip className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <ImageIcon className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <FileText className="h-5 w-5" />
                  </Button>

                  <div className="flex-1 relative">
                    <Input
                      placeholder="Nhập tin nhắn..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      className="pr-12"
                    />
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                        >
                          <Smile className="h-4 w-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-2">
                        <div className="flex gap-1 flex-wrap max-w-48">
                          {emojis.map((emoji) => (
                            <Button
                              key={emoji}
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-lg"
                              onClick={() => insertEmoji(emoji)}
                            >
                              {emoji}
                            </Button>
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>

                  <Button onClick={handleSendMessage} disabled={!message.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <User className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>Chọn một hội thoại để bắt đầu</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
