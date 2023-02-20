import { Helmet } from 'react-helmet';

import { getPageByUri } from 'lib/pages';
import { getAboutTemplate } from 'lib/acf'
import { WebpageJsonLd } from 'lib/json-ld';
import { helmetSettingsFromMetadata } from 'lib/site';
import useSite from 'hooks/use-site';
import usePageMetadata from 'hooks/use-page-metadata';
import Hero from 'components/Blocks/Hero';
import SliderSection from 'components/Blocks/Slider';
import Layout from 'components/Layout';


export default function AboutPage({ page, acfTemplate  }) {
	const { title, metaTitle, description, slug  } = page;

	const { hero } = acfTemplate;


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
				<Hero props={hero} />
				<SliderSection />
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







