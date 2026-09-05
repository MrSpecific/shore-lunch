'use client';

import YouTube from 'react-youtube';

const videoOptions = {
  width: '1280',
  height: '780',
  playerVars: {},
};

export default function YouTubeEmbed({
  videoId,
  className,
}: {
  videoId?: string | null;
  className?: string;
}) {
  if (!videoId) return null;

  return <YouTube videoId={videoId} opts={videoOptions} className={className} />;
}
