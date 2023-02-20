import styles from './Hero.module.scss';
import Link from 'next/link';

const Hero = ({ props }) => {

	const { title, copy, backgroundImage, cta  } = props;

	return (
		<div className={styles.heroFluid} style={{backgroundImage: "url(" + backgroundImage.sourceUrl + ")"}}>
			<div className="container">
				<div className="grid">
					<div className="col-sm-6">
						<h1>{title}</h1>
						<p>{copy}</p>
						<Link href={cta.url}>{cta.title}</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Hero;
