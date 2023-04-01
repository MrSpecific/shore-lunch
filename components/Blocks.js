import FaqBlock from '@components/blocks/FaqBlock';
import ImageWithText from '@components/blocks/ImageWithText';
import TextBlock from '@components/blocks/TextBlock';

const Blocks = ({ blocks, blockClass }) => {
  if (!blocks || !blocks?.length) return null;

  return blocks.map((block) => {
    if (block?.hidden) return null;

    const key = block._id || block._key;

    switch (block._type) {
      case 'block.faq':
        return <FaqBlock key={key} className={blockClass} {...block} />;
      case 'block.imageWithText':
        return <ImageWithText key={key} className={blockClass} {...block} />;
      case 'block.text':
        return <TextBlock key={key} className={blockClass} {...block} />;
      default:
        return null;
    }
  });
};

export default Blocks;
