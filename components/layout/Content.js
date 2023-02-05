import RenderMarkdown from '@utils/RenderMarkdown';
import classNames from 'classnames';

const Content = ({ markdown, className }) => {
  return (
    <div className={classNames('markdown-content', className)}>
      <RenderMarkdown ast={markdown.content} />
    </div>
  );
};

export default Content;
