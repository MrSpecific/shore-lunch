import RenderMarkdown from '@utils/RenderMarkdown';

const ContentBlock = ({ content }) => {
  return <RenderMarkdown ast={content.content} />;
};

export default ContentBlock;
