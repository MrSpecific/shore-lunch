async function postData({ url, data = {} }: { url: string; data?: Record<string, unknown> }) {
  if (!process.env.KLAVIYO_PRIVATE_KEY) return {};

  const response = await fetch(`${url}?api_key=${process.env.KLAVIYO_PRIVATE_KEY}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return response;
}

async function klaviyoHandler({ data }: { data: Record<string, any> }) {
  try {
    const { firstname, lastname, email, interest } = data;

    const body = {
      profiles: [
        {
          first_name: firstname,
          last_name: lastname,
          interest,
          email,
        },
      ],
    };

    const result = await postData({
      url: `https://a.klaviyo.com/api/v2/list/${process.env.KLAVIYO_NEWSLETTER_LIST_ID}/subscribe`,
      data: body,
    });

    return {
      status: 'success',
      data: await (result as Response).json(),
    }; // let client know outcome
  } catch (error) {
    // Failed to send data to Klaviyo
    return {
      status: 'error',
      error,
    };
  }
}

export default klaviyoHandler;
