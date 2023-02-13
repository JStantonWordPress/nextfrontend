import { Helmet } from 'react-helmet';

import { WebpageJsonLd } from 'lib/json-ld';
import { helmetSettingsFromMetadata } from 'lib/site';
import useSite from 'hooks/use-site';

import Layout from 'components/Layout';
import PostCard from 'components/PostCard';
import Pagination from 'components/Pagination/Pagination';

import styles from 'styles/templates/Archive.module.scss';

const DEFAULT_POST_OPTIONS = {};

export default function TemplateArchive({
  title = 'Archive',
  Title,
  posts,
  postOptions = DEFAULT_POST_OPTIONS,
  slug,
  metadata,
  pagination,
}) {
  const { metadata: siteMetadata = {} } = useSite();

  if (process.env.WORDPRESS_PLUGIN_SEO !== true) {
    metadata.title = `${title} - ${siteMetadata.title}`;
    metadata.og.title = metadata.title;
    metadata.twitter.title = metadata.title;
  }

  const helmetSettings = helmetSettingsFromMetadata(metadata);

  return (
    <Layout>
      <Helmet {...helmetSettings} />

      <WebpageJsonLd title={title} description={metadata.description} siteTitle={siteMetadata.title} slug={slug} />

        <div className="container">
            <div className="grid">
                <div className="col-sm-12">
                    <h1>{Title || title}</h1>
                    {metadata.description && (
                        <p
                            className={styles.archiveDescription}
                            dangerouslySetInnerHTML={{
                                __html: metadata.description,
                            }}
                        />
                    )}
                </div>
            </div>
        </div>

        <div className="container">
            <div className="grid">
                {Array.isArray(posts) && (
                    <>
                        {posts.map((post) => {
                            return (
                                <div className="col-sm-6 col-md-4 col-grid" key={post.slug}>
                                    <PostCard post={post} options={postOptions} />
                                </div>
                                );
                            })}
                        {pagination && (
                            <div className="col-sm-12">
                            <Pagination
                                currentPage={pagination?.currentPage}
                                pagesCount={pagination?.pagesCount}
                                basePath={pagination?.basePath}
                            />
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    </Layout>
  );
}
