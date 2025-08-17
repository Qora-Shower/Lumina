const chat = document.querySelector('.chat');
const sendBtn = document.getElementById('sendBtn');
const userInput = document.getElementById('userInput');

function fakeAIResponse(userMsg) {
  const aiMsg = document.createElement('div');
  aiMsg.classList.add('msg', 'ai');
  
  const aiFrame = document.createElement('div');
  aiFrame.classList.add('ai-frame');
  
  aiFrame.innerHTML = `
    <div class="tabs">
      <div class="tab active" role="button">Code</div>
      <div class="tab" role="button">Struktur</div>
      <div class="tab" role="button">Requirements</div>
      <div class="tab" role="button">Resources</div>
    </div>
    <div class="code-block">
      <div class="code-header">
        <span>Beispiel.lua</span>
        <div class="copy-btn" role="button">📋</div>
      </div>
      <pre><code>-- Das ist ein Fake-Code der KI
print("Du hast geschrieben: ${userMsg}")</code></pre>
    </div>
  `;
  
  aiMsg.appendChild(aiFrame);
  chat.appendChild(aiMsg);
  chat.scrollTop = chat.scrollHeight;
}

function sendMessage() {
  const msg = userInput.value.trim();
  if (!msg) return;
  
  const userMsgDiv = document.createElement('div');
  userMsgDiv.classList.add('msg', 'user');
  
  const bubble = document.createElement('div');
  bubble.classList.add('bubble');
  bubble.textContent = msg;
  
  userMsgDiv.appendChild(bubble);
  chat.appendChild(userMsgDiv);
  chat.scrollTop = chat.scrollHeight;
  
  userInput.value = '';
  
  setTimeout(() => fakeAIResponse(msg), 1000);
}

sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});