import Link from 'next/link';

import { postPathBySlug, sanitizeExcerpt } from 'lib/posts';
import Image from 'next/image';
import Metadata from 'components/Metadata';

import { FaMapPin } from 'react-icons/fa';
import styles from './PostCard.module.scss';

const PostCard = ({ post, options = {} }) => {

  const { title, excerpt, featuredImage, slug, date, author, categories, isSticky = false } = post;
  const { excludeMetadata = [] } = options;

  const metadata = {};

  if (!excludeMetadata.includes('author')) {
    metadata.author = author;
  }

  if (!excludeMetadata.includes('date')) {
    metadata.date = date;
  }

  if (!excludeMetadata.includes('categories')) {
    metadata.categories = categories;
  }

  let postCardStyle = styles.postCard;

  if (isSticky) {
    postCardStyle = `${postCardStyle} ${styles.postCardSticky}`;
  }


  return (
    <div className={postCardStyle}>
      {isSticky && <FaMapPin aria-label="Sticky Post" />}

      {featuredImage &&
          <div className={styles.postHero}>
            <Link href={postPathBySlug(slug)}>
              <a>
                <Image
                    src={featuredImage.sourceUrl}
                    layout="fill"
                    objectFit="cover"
                    className="flex-img"
                />
              </a>
            </Link>
          </div>
      }

      <Link href={postPathBySlug(slug)}>
        <a>
          <h2
            className={styles.postCardTitle}
            dangerouslySetInnerHTML={{
              __html: title,
            }}
          />
        </a>
      </Link>
      <div className={styles.postCardBody}>
        <Metadata className={styles.postCardMetadata} {...metadata} />
        {excerpt && (
          <div
            className={styles.postCardContent}
            dangerouslySetInnerHTML={{
              __html: sanitizeExcerpt(excerpt),
            }}
          />
        )}
      </div>
    </div>
  );
};

export default PostCard;
