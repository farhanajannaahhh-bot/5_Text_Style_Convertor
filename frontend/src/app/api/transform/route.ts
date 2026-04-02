import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

export async function POST(req: Request) {
  try {
    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json({ error: 'Anthropic API Key is not configured on the server.' }, { status: 500 });
    }
    
    const body = await req.json();
    const { text, tone } = body;

    if (!text || typeof text !== 'string' || !text.trim()) {
      return NextResponse.json({ error: 'Source text is required.' }, { status: 400 });
    }

    if (!tone || typeof tone !== 'string') {
      return NextResponse.json({ error: 'Tone is required.' }, { status: 400 });
    }

    const prompt = `Rewrite the following text in a ${tone} tone. Keep the original meaning but fully adapt the style and vocabulary. Do not output anything except the rewritten text itself - no introductory or concluding remarks.

Original Text:
"${text}"`;

    const message = await anthropic.messages.create({
      max_tokens: 1024,
      model: 'claude-haiku-4-5-20251001',
      messages: [
        { role: 'user', content: prompt }
      ]
    });

    const resultText = message.content[0]?.type === 'text' ? message.content[0].text : '';

    return NextResponse.json({ result: resultText.trim() });
  } catch (error: any) {
    console.error('Anthropic API Route Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to transform request' }, { status: 500 });
  }
}
