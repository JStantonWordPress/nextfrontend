import { Helmet } from 'react-helmet';

import { getPageByUri } from 'lib/pages';
import { WebpageJsonLd } from 'lib/json-ld';
import { helmetSettingsFromMetadata } from 'lib/site';
import useSite from 'hooks/use-site';
import usePageMetadata from 'hooks/use-page-metadata';


import Layout from 'components/Layout';
import styles from "../styles/pages/Page.module.scss";

export default function AboutPage({ page }) {
    const { title, metaTitle, description, slug  } = page;

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
    const template = page.template.templateName;


    return (
        <Layout>
            <Helmet {...helmetSettings} />
            <WebpageJsonLd
                title={metadata.title}
                description={metadata.description}
                siteTitle={siteMetadata.title}
                slug={slug}
            />
            <h1 className={styles.title}>{title}-{template}</h1>
            <p>Homepage</p>
        </Layout>
    );
}


export async function getStaticProps() {

    let pageUri = `/`;

    const { page } = await getPageByUri(pageUri);

    if (!page) {
        return {
            props: {},
            notFound: true,
        };
    }

    return {
        props: {
            page,
        },
        revalidate: 60
    };
}