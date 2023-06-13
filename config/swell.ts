if (!process.env.NEXT_PUBLIC_SWELL_STORE_ID) {
  throw new Error('Missing required environment variable NEXT_PUBLIC_SWELL_STORE_ID');
}

if (!process.env.NEXT_PUBLIC_SWELL_PUBLIC_KEY) {
  throw new Error('Missing required environment variable NEXT_PUBLIC_SWELL_PUBLIC_KEY');
}

const config = {
  storeId: process.env.NEXT_PUBLIC_SWELL_STORE_ID,
  publicKey: process.env.NEXT_PUBLIC_SWELL_PUBLIC_KEY,
};

export default config;
