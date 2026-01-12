import { streamText } from 'ai';
import { gateway } from '@ai-sdk/gateway';
import 'dotenv/config';

async function main() {
  const result = streamText({
    model: gateway('openai/gpt-4o'),
    prompt: 'Invent a new holiday and describe its traditions.',
  });

  for await (const textPart of result.textStream) {
    process.stdout.write(textPart);
  }

  console.log();
  console.log('Token usage:', await result.usage);
  console.log('Finish reason:', await result.finishReason);
}

main().catch(console.error);GOOGLE_API_KEY=AIzaSyAb8RN6JwFfUDrVT9hAjL-jnq9SAYxJFS9ApjDC-Xla-CF_qX8Q