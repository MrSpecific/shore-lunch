import Image from 'next/image';
import type { CommentWithAuthor } from '@lib/rateMyCatch';
import styles from '@styles/components/CommentList.module.css';

const CommentList = ({ comments }: { comments: CommentWithAuthor[] }) => {
  if (comments.length === 0) {
    return <p className={styles.empty}>No comments yet — be the first to weigh in.</p>;
  }

  return (
    <ul className={styles.commentList}>
      {comments.map((comment) => (
        <li key={comment.id} className={styles.comment}>
          {comment.authorAvatarUrl && (
            <Image
              src={comment.authorAvatarUrl}
              alt=""
              width={32}
              height={32}
              className={styles.avatar}
            />
          )}
          <div>
            <p className={styles.commentMeta}>
              <span className={styles.author}>{comment.authorName}</span>{' '}
              <time dateTime={comment.createdAt.toISOString()}>
                {comment.createdAt.toLocaleDateString()}
              </time>
            </p>
            <p className={styles.commentBody}>{comment.body}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CommentList;
