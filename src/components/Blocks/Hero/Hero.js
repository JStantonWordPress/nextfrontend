import styles from './Hero.module.scss';
import Link from 'next/link';

const Hero = ({ props }) => {

	const { title, copy, cta  } = props;

	return (
		<div className={styles.heroFluid}>
			<div className="container">
				<div className="grid">
					<div className="col-sm-6">
						<h1>{title}</h1>
						<p>{copy}</p>
						<Link href={cta.url}>{cta.title}</Link>
					</div>
					<div className="col-sm-6">

					</div>
				</div>
			</div>
		</div>
	);
};

export default Hero;
