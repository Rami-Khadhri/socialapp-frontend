<template>
  <div class="h-screen bg-gray-800 fixed top-0 left-0 w-full">
    <!-- Previous header code remains the same -->
    <div class="max-w-4xl mx-auto h-full flex flex-col px-4">
      <div class="py-4 flex items-center space-x-3">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        <h1 class="text-lg font-semibold text-white">AI Assistant</h1>
      </div>

      <div class="flex-1 min-h-0 bg-gray-900 rounded-t-lg">
        <div ref="messagesContainer" class="h-full overflow-y-auto py-4">
          <!-- Welcome Message -->
          <div v-if="messages.length === 0" class="h-full flex items-center justify-center">
            <div class="text-center space-y-3">
              <h2 class="text-2xl font-bold text-white">Welcome to AI Assistant</h2>
              <p class="text-gray-400">Ask me anything - I'm here to help!</p>
            </div>
          </div>

          <!-- Chat Messages -->
          <div class="space-y-4">
            <div v-for="(message, idx) in messages" :key="idx" class="px-4">
              <div :class="[
                'p-4 rounded-lg',
                message.type === 'user' ? 'bg-gray-800' : 'bg-gray-700'
              ]">
                <div class="flex space-x-4">
                  <!-- Avatar -->
                  <div class="flex-shrink-0">
                    <div :class="[
                      'w-8 h-8 rounded-full flex items-center justify-center',
                      message.type === 'user' ? 'bg-blue-500' : 'bg-purple-500'
                    ]">
                      <svg v-if="message.type === 'user'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                      </svg>
                      <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                        <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                      </svg>
                    </div>
                  </div>
                  
                  <!-- Message Content -->
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-400 mb-1">
                      {{ message.type === 'user' ? 'You' : 'AI Assistant' }}
                    </p>
                    <div class="prose prose-invert max-w-none">
                      <p class="text-gray-100 whitespace-pre-wrap">
                        {{ message.displayContent }}
                        <span v-if="message.isAnimating" class="animate-pulse">|</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Input Area remains the same -->
      <div class="bg-gray-900 rounded-b-lg px-4 py-4">
        <form @submit.prevent="sendMessage" class="flex space-x-4">
          <div class="flex-1 relative">
            <textarea
              v-model="userInput"
              @keydown.enter.exact.prevent="sendMessage"
              rows="1"
              class="w-full bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 px-4 py-3 resize-none"
              placeholder="Type your message..."
              :disabled="loading"
            ></textarea>
            <div class="absolute right-3 bottom-3 text-xs text-gray-500">
              Press Enter ↵
            </div>
          </div>
          <button
            type="submit"
            :disabled="loading || !userInput.trim()"
            class="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInput: '',
      messages: [],
      loading: false
    }
  },
  methods: {
    async animateText(messageIndex, fullText) {
      const message = this.messages[messageIndex];
      const typingSpeed = 25; // Milliseconds per character
      
      message.isAnimating = true;
      
      for (let i = 0; i <= fullText.length; i++) {
        message.displayContent = fullText.slice(0, i);
        await new Promise(resolve => setTimeout(resolve, typingSpeed));
      }
      
      message.isAnimating = false;
      message.displayContent = fullText;
    },

    async sendMessage() {
      if (!this.userInput.trim() || this.loading) return;

      const userMessage = this.userInput.trim();
      this.messages.push({ 
        type: 'user', 
        content: userMessage,
        displayContent: userMessage,
        isAnimating: false 
      });
      
      this.userInput = '';
      this.loading = true;

      try {
        const response = await fetch('http://localhost:8081/api/ask', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            question: userMessage
          })
        });

        const data = await response.json();
        
        if (data.error) {
          const errorMessage = 'Sorry, I encountered an error. Please try again.';
          this.messages.push({ 
            type: 'assistant', 
            content: errorMessage,
            displayContent: '',
            isAnimating: false 
          });
          await this.animateText(this.messages.length - 1, errorMessage);
        } else {
          this.messages.push({ 
            type: 'assistant', 
            content: data.answer,
            displayContent: '',
            isAnimating: false 
          });
          await this.animateText(this.messages.length - 1, data.answer);
        }
      } catch (err) {
        const errorMessage = 'Sorry, I encountered an error. Please try again.';
        this.messages.push({ 
          type: 'assistant', 
          content: errorMessage,
          displayContent: '',
          isAnimating: false 
        });
        await this.animateText(this.messages.length - 1, errorMessage);
      } finally {
        this.loading = false;
        // Scroll to bottom after message is added
        this.$nextTick(() => {
          const container = this.$refs.messagesContainer;
          container.scrollTop = container.scrollHeight;
        });
      }
    }
  },
  mounted() {
    // Focus the input on mount
    this.$nextTick(() => {
      const textarea = document.querySelector('textarea');
      if (textarea) textarea.focus();
    });
  }
}
</script>

<style scoped>
textarea {
  min-height: 24px;
  max-height: 200px;
}

/* Custom Scrollbar */
.overflow-y-auto::-webkit-scrollbar {
  width: 5px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #4B5563;
  border-radius: 5px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #6B7280;
}
</style>