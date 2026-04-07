import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import styles from "./Swiper.module.scss";
import Icon from "../Icon/Icon";
import "swiper/css";
import "swiper/css/navigation";

interface SliderProps {
  images: string[];
}

export default function Slider({ images }: SliderProps) {
  return (
    <div className={styles.swiperWrapper}>
      <button className={styles.prevBtn} type="button">
        <Icon name="arrow-l" size={30} className={styles.arrowIcon} />
      </button>
      <button className={styles.nextBtn} type="button">
        <Icon name="arrow-r" size={30} className={styles.arrowIcon} />
      </button>

      <Swiper
        className={styles.swiper}
        modules={[Navigation, Pagination]}
        slidesPerView={1}
        spaceBetween={10}
        navigation={{
          prevEl: `.${styles.prevBtn}`,
          nextEl: `.${styles.nextBtn}`,
        }}
        pagination={{
          clickable: true,
        }}
      >
        {images.map((image, index) => (
          <SwiperSlide className={styles.slide} key={index}>
            <img
              className={styles.slideImage}
              src={image}
              alt={`slide-${index}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
