import { OPENAI_API_HOST, OPENAI_ORGANIZATION } from '@/utils/app/const';

export const config = {
  runtime: 'edge',
};

const handler = async (req: Request): Promise<Response> => {
  try {
    // Retrieve the API key from the request body
    const { key } = (await req.json()) as {
      key: string;
    };

    // Hardcode the model ID for gpt-4-1106-preview
    const modelId = 'gpt-4-1106-preview';
    const url = `${OPENAI_API_HOST}/v1/models/${modelId}`;

    // Fetch the model details from OpenAI API
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key ? key : process.env.OPENAI_API_KEY}`,
        ...(OPENAI_ORGANIZATION && {
          'OpenAI-Organization': OPENAI_ORGANIZATION
        }),
      },
    });

    // Check for unauthorized or error responses
    if (response.status === 401) {
      return new Response(response.body, {
        status: 401,
        headers: response.headers,
      });
    } else if (response.status !== 200) {
      console.error(`OpenAI API returned an error ${response.status}: ${await response.text()}`);
      return new Response('OpenAI API returned an error', { status: response.status });
    }

    // Parse the response
    const modelDetails = await response.json();

    // Return the details of the gpt-4-1106-preview model
    return new Response(JSON.stringify(modelDetails), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      },
    });
  } catch (error) {
    console.error(error);
    // Return a 500 error response
    return new Response('Error fetching model details', { status: 500 });
  }
};

export default handler;
