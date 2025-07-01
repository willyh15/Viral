export async function summarizeAnalytics(rawText: string) {
  const key = import.meta.env.VITE_OPENROUTER_API_KEY;

  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${key}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are an analytics assistant for TikTok creators. Your job is to summarize raw text extracted from TikTok analytics screenshots into a short performance report.'
        },
        {
          role: 'user',
          content: `Here is the raw text from a TikTok analytics screenshot:\n\n${rawText}\n\nSummarize the performance and give the user 1 recommendation.`
        }
      ]
    })
  });

  const json = await res.json();
  return json.choices?.[0]?.message?.content || 'No result.';
}
