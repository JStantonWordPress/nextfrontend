import { Helmet } from 'react-helmet';

import { getPageByUri } from 'lib/pages';
import { getAboutTemplate } from 'lib/acf'
import { WebpageJsonLd } from 'lib/json-ld';
import { helmetSettingsFromMetadata } from 'lib/site';
import useSite from 'hooks/use-site';
import usePageMetadata from 'hooks/use-page-metadata';
import Hero from 'components/Blocks/Hero';
import Layout from 'components/Layout';
import styles from "../styles/pages/Page.module.scss";


export default function AboutPage({ page, acfTemplate  }) {
	const { title, metaTitle, description, slug  } = page;

	const {hero, about} = acfTemplate;


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
				<Hero props={hero} />
				<div className="container">
					<div className="grid">
						<div className="col-sm-12">
							<h1 className={styles.title}>{title}-{template}</h1>
							<p>{hero.title}</p>
							<p>{about.aboutCopy}</p>

						</div>
					</div>
				</div>
		</Layout>
	);
}




export async function getStaticProps() {



	let pageUri = `/about/`;

	const { page } = await getPageByUri(pageUri);

	if (!page) {
		return {
			props: {},
			notFound: true,
		};
	}

	const aboutTemplateResponse = await getAboutTemplate({
		ID: page.id,
	});
	const acfTemplate = aboutTemplateResponse.data.data.page;


	return {
		props: {
			page,
			acfTemplate,
		},
		revalidate: 60
	};
}







