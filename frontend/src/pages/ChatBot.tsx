import React, { useState } from 'react';
import { MessageSquare, Send } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: '¡Hola! Soy MivoBot, tu asistente agrícola. Haz clic en una pregunta o escribe para empezar.',
      sender: 'bot',
    },
  ]);
  const [input, setInput] = useState('');

  const predefinedResponses: { [key: string]: string } = {
    '¿Qué es el RiceBlast?':
      'El RiceBlast es una enfermedad causada por un hongo que afecta el arroz. Para controlarlo, puedes usar fungicidas específicos y asegurarte de que el campo esté bien drenado.',
    '¿Cómo puedo cuidar mis cultivos?':
      'Puedes cuidar tus cultivos regándolos de manera adecuada, usando fertilizantes según sus necesidades y revisando regularmente si tienen plagas o enfermedades.',
    '¿Qué fertilizante es bueno para la papa?':
      'Para la papa, usa fertilizantes ricos en nitrógeno, fósforo y potasio. Asegúrate de aplicarlos durante el crecimiento.',
    '¿Cómo prevenir plagas en la uva?':
      'Para prevenir plagas en la uva, realiza podas regulares, mantén el suelo limpio y usa productos orgánicos o insecticidas según sea necesario.',
    '¿Qué hago si mis cultivos tienen plagas?':
      'Identifica la plaga primero. Luego, usa insecticidas específicos o busca remedios naturales como extracto de ajo o neem.',
  };

  const suggestedQuestions = Object.keys(predefinedResponses);

  const handleSend = (question?: string) => {
    const userMessage = question || input;
    if (!userMessage.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      text: userMessage,
      sender: 'user',
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput('');

    const botResponseText =
      predefinedResponses[userMessage] ||
      'Lo siento, no tengo información sobre eso. ¿Puedes preguntar algo más?';

    setTimeout(() => {
      const botResponse: Message = {
        id: newMessage.id + 1,
        text: botResponseText,
        sender: 'bot',
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <MessageSquare className="h-8 w-8 text-green-600" />
        <h1 className="text-3xl font-bold text-gray-900">MivoBot</h1>
      </div>

      <div className="bg-white rounded-lg shadow-md h-[600px] flex flex-col">
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-4 ${
                  message.sender === 'user'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t p-4">
          <div className="mb-4">
            <p className="font-bold text-gray-900 mb-2">Preguntas sugeridas:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((question) => (
                <button
                  key={question}
                  onClick={() => handleSend(question)}
                  className="bg-green-100 text-green-600 px-4 py-2 rounded-lg hover:bg-green-200 transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
          <div className="flex space-x-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Escribe tu mensaje..."
              className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              onClick={() => handleSend()}
              className="bg-green-600 text-white rounded-lg px-6 py-2 hover:bg-green-700 transition-colors"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatBot;
