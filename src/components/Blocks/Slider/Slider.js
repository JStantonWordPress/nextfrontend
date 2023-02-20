import styles from './Slider.module.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";

const SliderSection = () => {

	var settings = {
		slidesToShow: 6,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 0,
		speed: 5000,
		pauseOnHover: false,
		cssEase: 'linear',
		arrows: false
	};

	return (
		<div className={styles.sliderFluid} >
				<div className="grid grid-bleed">
					<div className="col-sm-12">

						<Slider {...settings}>
							<div>
								<img className={styles.sliderImage} src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Next.js_Logotype_Light_Background.svg/1280px-Next.js_Logotype_Light_Background.svg.png" />
							</div>
							<div>
								<img className={styles.sliderImage} src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Next.js_Logotype_Light_Background.svg/1280px-Next.js_Logotype_Light_Background.svg.png" />
							</div>
							<div>
								<img className={styles.sliderImage} src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Next.js_Logotype_Light_Background.svg/1280px-Next.js_Logotype_Light_Background.svg.png" />
							</div>
							<div>
								<img className={styles.sliderImage} src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Next.js_Logotype_Light_Background.svg/1280px-Next.js_Logotype_Light_Background.svg.png" />
							</div>
							<div>
								<img className={styles.sliderImage} src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Next.js_Logotype_Light_Background.svg/1280px-Next.js_Logotype_Light_Background.svg.png" />
							</div>
							<div>
								<img className={styles.sliderImage} src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Next.js_Logotype_Light_Background.svg/1280px-Next.js_Logotype_Light_Background.svg.png" />
							</div>
							<div>
								<img className={styles.sliderImage} src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Next.js_Logotype_Light_Background.svg/1280px-Next.js_Logotype_Light_Background.svg.png" />
							</div>
							<div>
								<img className={styles.sliderImage} src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Next.js_Logotype_Light_Background.svg/1280px-Next.js_Logotype_Light_Background.svg.png" />
							</div>
							<div>
								<img className={styles.sliderImage} src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Next.js_Logotype_Light_Background.svg/1280px-Next.js_Logotype_Light_Background.svg.png" />
							</div>
							<div>
								<img className={styles.sliderImage} src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Next.js_Logotype_Light_Background.svg/1280px-Next.js_Logotype_Light_Background.svg.png" />
							</div>
						</Slider>
					</div>
				</div>
		</div>
	);
};

export default SliderSection;
