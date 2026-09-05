import React from 'react';

const Node = ({ type, children, ...rest }) => {
  const kids = children && children.map((child, index) => <Node key={index} {...child} />);

  switch (type) {
    case 'root':
      return <>{kids}</>;

    case 'paragraph':
      return <p>{kids}</p>;

    case 'strong':
      return <span className="bold">{kids}</span>;

    case 'emphasis':
      return <em>{kids}</em>;

    case 'heading': {
      const depth = rest.depth || 2;
      const HeadingTag = `h${depth}`;
      return <HeadingTag>{kids}</HeadingTag>;
    }

    case 'text':
      return <>{rest.value}</>;

    case 'link':
      return <a href={rest.url}>{kids}</a>;

    case 'list':
      return rest.ordered ? <ol>{kids}</ol> : <ul>{kids}</ul>;

    case 'listItem':
      return <li>{kids}</li>;

    // case 'html':
    //   return <div dangerouslySetInnerHTML={{ __html: rest.value }} />;

    /* Handle all types here … */

    default:
      console.log('Unhandled node type', { type, children, ...rest });
      return <>{kids}</>;
  }
};

const RenderMarkdown = ({ ast }) => <Node {...ast} />;

export default React.memo(RenderMarkdown);
