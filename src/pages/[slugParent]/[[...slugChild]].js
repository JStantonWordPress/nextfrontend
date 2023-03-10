import { Helmet } from 'react-helmet';
import { getPageByUri, getAllPages, getBreadcrumbsByUri } from 'lib/pages';
import { WebpageJsonLd } from 'lib/json-ld';
import { helmetSettingsFromMetadata } from 'lib/site';
import useSite from 'hooks/use-site';
import usePageMetadata from 'hooks/use-page-metadata';
import Layout from 'components/Layout';
import FeaturedImage from 'components/FeaturedImage';
import styles from 'styles/pages/Page.module.scss';

export default function Page({ page  }) {

  const { title, metaTitle, description, slug, content, featuredImage } = page;

  const { metadata: siteMetadata = {} } = useSite();

  const { metadata } = usePageMetadata({
    metadata: {
      ...page,
      title: metaTitle,
      description: description || page.og?.description || `Read more about ${title}`,
    },
  });

  if (process.env.WORDPRESS_PLUGIN_SEO !== true) {
    metadata.title = `${title} - ${siteMetadata.title}`;
    metadata.og.title = metadata.title;
    metadata.twitter.title = metadata.title;
  }

  const helmetSettings = helmetSettingsFromMetadata(metadata);

  return (
    <Layout>
      <Helmet {...helmetSettings} />
      <WebpageJsonLd
        title={metadata.title}
        description={metadata.description}
        siteTitle={siteMetadata.title}
        slug={slug}
      />
        <div className="container">
            <div className="grid">
                <div className="col-sm-12">
                    {featuredImage && (
                        <FeaturedImage
                            {...featuredImage}
                            src={featuredImage.sourceUrl}
                            dangerouslySetInnerHTML={featuredImage.caption}
                        />
                    )}
                    <h1 className={styles.title}>{title}</h1>
                    <div
                        className={styles.content}
                        dangerouslySetInnerHTML={{
                            __html: content,
                        }}
                    />
                </div>
            </div>
        </div>
    </Layout>
  );
}

export async function getStaticProps({ params = {} } = {}) {
  const { slugParent, slugChild } = params;

  // We can use the URI to look up our page and subsequently its ID, so
  // we can first contruct our URI from the page params

  let pageUri = `/${slugParent}/`;

  // We only want to apply deeper paths to the URI if we actually have
  // existing children

  if (Array.isArray(slugChild) && slugChild.length > 0) {
    pageUri = `${pageUri}${slugChild.join('/')}/`;
  }

  const { page } = await getPageByUri(pageUri);

  if (!page) {
    return {
      props: {},
      notFound: true,
    };
  }

  const { pages } = await getAllPages({
    queryIncludes: 'index',
  });

  const breadcrumbs = getBreadcrumbsByUri(pageUri, pages);

  return {
    props: {
      page,
      breadcrumbs,
    },
    revalidate: 60
  };
}



export async function getStaticPaths() {

    const {pages} = await getAllPages({
      queryIncludes: 'index',
    });
    // Take all the pages and create path params. The slugParent will always be
    // the top level parent page, where the slugChild will be an array of the
    // remaining segments to make up the path or URI

    // We also filter out the `/` homepage as it will conflict with index.js if
    // as they have the same path, which will fail the build

    const paths = pages
        .filter(
            ({uri}) => typeof uri === 'string' && uri !== '/' && uri !== '/about/'
        )

        .map(({uri}) => {
          const segments = uri.split('/').filter((seg) => seg !== '');

          return {
            params: {
              slugParent: segments.shift(),
              slugChild: segments,
            },

          };
        });

    return {
      paths,
      fallback: 'blocking',
    };
  }


