document.addEventListener('DOMContentLoaded', () => {
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');
  const chatWindow = document.getElementById('chat-window');

  if (chatForm) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const userMessage = chatInput.value.trim();
      if (userMessage) {
        // Vibrate when user sends a message
        if (typeof triggerVibration === 'function') triggerVibration();

        addMessage(userMessage, 'user');
        chatInput.value = '';

        // Simulate AI thinking time
        setTimeout(() => {
          const aiResponse = getAIResponse(userMessage);

          // Vibrate when AI responds
          if (typeof triggerVibration === 'function') triggerVibration([100, 30, 100]); // A different pattern for AI response

          addMessage(aiResponse, 'ai');
        }, 600);
      }
    });
  }

  function addMessage(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message', `${sender}-message`);
    messageElement.textContent = message;
    chatWindow.appendChild(messageElement);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }

  function getAIResponse(message) {
    const lowerCaseMessage = message.toLowerCase();

    if (lowerCaseMessage.includes('script') || lowerCaseMessage.includes('code')) {
      return "Of course! For Roblox scripting, you'll use Luau. A good starting point is the official Roblox Developer Hub. What specifically are you trying to script? A leaderboard, a shop, or a tool?";
    } else if (lowerCaseMessage.includes('design') || lowerCaseMessage.includes('build')) {
      return "Roblox Studio is your primary tool for design and building. You can create parts, models, and entire worlds. For user interfaces, you can use ScreenGuis. Are you interested in 3D modeling or UI design?";
    } else if (lowerCaseMessage.includes('monetize') || lowerCaseMessage.includes('money')) {
      return "Monetization in Roblox can be done through Game Passes, Developer Products, or Premium Payouts. Which method are you most curious about?";
    } else if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi')) {
      return "Hello! I am Lumina, your Roblox AI assistant. How can I help you today?";
    } else {
      return "I can help with questions about Roblox scripting, design, and monetization. Try asking something like 'How do I script a part to change color?'";
    }
  }
});
