import klaviyoHandler from '@lib/klaviyo';

async function handler(req, res) {
  if (req.method !== 'POST') return res.status(400).send('Bad request');

  const body = req.body;
  const result = {
    success: false,
    message: '',
    klaviyo: {},
  };

  if (!body || !body.firstname || !body.lastname || !body.email) {
    result.message = 'Name or email not found';
    return res.status(200).send(result);
  }

  const klaviyoResponse = klaviyoHandler({ data: body });

  result.klaviyo = await klaviyoResponse;

  if (result.klaviyo?.status === 'success') {
    result.success = true;
    result.message = 'Success';
  }

  return res.status(200).send(result);
}

export default handler;
