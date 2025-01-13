import axios from 'axios';
import { MessageInterface } from '@/types/types';
import { API_KEY, API_URL } from '@/config/runpodConfigs';

interface ChatBotAPIResponse {
  output: MessageInterface;
}

async function callChatBotAPI(messages: MessageInterface[]): Promise<MessageInterface> {
  try {
    const response = await axios.post(API_URL, {
      input: { messages }
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      }
    });

    // Type assertion to let TypeScript know the type of `response.data`
    let output = response.data as ChatBotAPIResponse;

    // Return the output message
    return output.output;
  } catch (error) {
    console.error('Error calling the API:', error);
    throw error;
  }
}

export { callChatBotAPI };
