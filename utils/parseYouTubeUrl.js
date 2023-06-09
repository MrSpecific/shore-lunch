const parseYouTubeUrl = (url) => {
  try {
    const urlObject = new URL(url);

    const videoId =
      urlObject.hostname.toLowerCase() === 'youtu.be'
        ? urlObject.pathname.replace('/', '')
        : urlObject.searchParams.get('v');

    return {
      url,
      urlObject,
      videoId,
    };
  } catch (err) {
    console.error('Problem getting url', err);

    return {
      error: err,
    };
  }
};

export default parseYouTubeUrl;
