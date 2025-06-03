import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'contact';
  timestamp: Date;
};

type Chat = {
  id: string;
  contactName: string;
  contactAvatar?: string;
  lastMessage: string;
  unreadCount: number;
  messages: Message[];
};

const ChatPage = () => {
  const { chatId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeChat, setActiveChat] = useState<Chat | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);
  const [message, setMessage] = useState('');

  // Загрузка чатов (моковые данные)
  useEffect(() => {
    const loadChats = async () => {
      try {
        setLoading(true);
        // Имитация загрузки данных
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const mockChats: Chat[] = [
          {
            id: '1',
            contactName: 'Иван Иванов',
            contactAvatar: 'https://randomuser.me/api/portraits/men/1.jpg',
            lastMessage: 'Привет, как дела?',
            unreadCount: 2,
            messages: [
              {
                id: '1-1',
                text: 'Привет!',
                sender: 'contact',
                timestamp: new Date(Date.now() - 3600000)
              },
              {
                id: '1-2',
                text: 'Как дела?',
                sender: 'contact',
                timestamp: new Date(Date.now() - 3500000)
              },
              {
                id: '1-3',
                text: 'Привет! Всё отлично, спасибо!',
                sender: 'user',
                timestamp: new Date(Date.now() - 3400000)
              }
            ]
          },
          {
            id: '2',
            contactName: 'Мария Петрова',
            contactAvatar: 'https://randomuser.me/api/portraits/women/1.jpg',
            lastMessage: 'Когда встречаемся?',
            unreadCount: 0,
            messages: [
              {
                id: '2-1',
                text: 'Привет! Когда встречаемся?',
                sender: 'contact',
                timestamp: new Date(Date.now() - 86400000)
              }
            ]
          }
        ];

        setChats(mockChats);
        
        if (chatId) {
          const chat = mockChats.find(c => c.id === chatId);
          setActiveChat(chat || null);
        }
        
      } catch (err) {
        console.error('Ошибка загрузки чатов:', err);
        setError('Не удалось загрузить чаты. Пожалуйста, попробуйте позже.');
      } finally {
        setLoading(false);
      }
    };

    loadChats();
  }, [chatId]);

  const handleSendMessage = () => {
    if (!message.trim() || !activeChat) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
      timestamp: new Date()
    };
    
    setActiveChat({
      ...activeChat,
      messages: [...activeChat.messages, newMessage],
      lastMessage: message
    });
    
    setMessage('');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-xl font-medium text-gray-600">Загрузка чатов...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="max-w-md p-6 bg-white rounded-lg shadow-md text-center">
          <div className="text-red-500 text-xl font-medium mb-4">{error}</div>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Попробовать снова
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Список чатов */}
      <div className="w-full md:w-80 bg-white border-r border-gray-200 overflow-y-auto mt-10">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-800">Чаты</h1>
        </div>
        
        <div className="divide-y divide-gray-200">
          {chats.map(chat => (
            <div 
              key={chat.id}
              className={`p-4 hover:bg-gray-50 cursor-pointer ${activeChat?.id === chat.id ? 'bg-blue-50' : ''}`}
              onClick={() => setActiveChat(chat)}
            >
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  {chat.contactAvatar ? (
                    <img 
                      src={chat.contactAvatar} 
                      alt={chat.contactName}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                      <span className="text-gray-600 text-sm">
                        {chat.contactName.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {chat.contactName}
                    </p>
                    {chat.unreadCount > 0 && (
                      <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                        {chat.unreadCount}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 truncate">
                    {chat.lastMessage}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Область сообщений */}
      <div className="flex-1 flex flex-col">
        {activeChat ? (
          <>
            {/* Шапка чата */}
            <div className="p-4 border-b border-gray-200 bg-white flex items-center mt-12">
              {activeChat.contactAvatar ? (
                <img 
                  src={activeChat.contactAvatar} 
                  alt={activeChat.contactName}
                  className="h-10 w-10 rounded-full object-cover mr-3"
                />
              ) : (
                <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center mr-3">
                  <span className="text-gray-600 text-sm">
                    {activeChat.contactName.charAt(0)}
                  </span>
                </div>
              )}
              <h2 className="text-lg font-semibold text-gray-900">
                {activeChat.contactName}
              </h2>
            </div>

            {/* Сообщения */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
              <div className="space-y-4">
                {activeChat.messages.map(msg => (
                  <div 
                    key={msg.id} 
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-xs md:max-w-md rounded-lg px-4 py-2 ${msg.sender === 'user' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-white border border-gray-200 text-gray-800'}`}
                    >
                      <p>{msg.text}</p>
                      <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-blue-200' : 'text-gray-500'}`}>
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Поле ввода сообщения */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Напишите сообщение..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center p-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Выберите чат</h3>
              <p className="text-gray-500">Выберите диалог из списка или начните новый</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;