import { FaqBlock, ImageBlock, ImageWithText, TextBlock } from '@components/blocks';

const BlocksGroup = ({ blocks, className }) => {
  if (!blocks || !blocks?.length) return null;

  return blocks.map((block) => {
    if (block?.hidden) return null;

    const key = block._id || block._key;

    switch (block._type) {
      case 'block.faq':
        return <FaqBlock key={key} className={className} {...block} />;
      case 'block.image':
        return <ImageBlock key={key} className={className} {...block} />;
      case 'block.imageWithText':
        return <ImageWithText key={key} className={className} {...block} />;
      case 'block.text':
        return <TextBlock key={key} className={className} {...block} />;
      default:
        return null;
    }
  });
};

export default BlocksGroup;
