export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { comment, tone } = req.body || {};
  if (!comment || !comment.trim()) {
    return res.status(400).json({ error: 'Comment is required' });
  }

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'openai/gpt-oss-120b',
        messages: [
          {
            role: 'user',
            content: `Generate 3 reply options for this comment: ${comment}. Tone: ${tone}. Each reply under 3 sentences, sound human and natural. Format exactly: Option 1: [reply] Option 2: [reply] Option 3: [reply]. Nothing else.`,
          },
        ],
        max_tokens: 300,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Groq API error:', response.status, errText);
      return res.status(response.status).json({ error: `Groq API error: ${response.status}` });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    console.error('Server error generating replies:', err);
    return res.status(500).json({ error: 'Server error generating replies' });
  }
}
