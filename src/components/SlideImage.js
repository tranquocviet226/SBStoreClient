import React from 'react';
import {StyleSheet} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';

const SlideImage = () => {
  const images = [
    'https://cdn.pocket-lint.com/r/s/1200x/assets/images/149132-laptops-review-macbook-pro-13-inch-2019-review-business-as-usual-image1-mjmo9napgu.jpg',
    'https://cdn.fptshop.com.vn/uploads/images/tin-tuc/80747/Originals/Apple-nen-dem-toi-dieu-gi-cho-macbook-pro-2019-5.jpg',
    'https://cdn.tgdd.vn/Files/2019/07/17/1180055/macbookair2019vsmacbookpro2019_800x534.jpg',
    'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2019/07/danh-gia-macbook-pro-2019-10.jpg', // Network image
  ];

  return (
    <SliderBox
      images={images}
      sliderBoxHeight={200}
    //   onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
      dotColor="#FFEE58"
      inactiveDotColor="#90A4AE"
      paginationBoxVerticalPadding={20}
      imageLoadingColor="#F8C516"
    //   autoplay
    //   circleLoop
    />
  );
};

export default SlideImage;

const styles = StyleSheet.create({});
