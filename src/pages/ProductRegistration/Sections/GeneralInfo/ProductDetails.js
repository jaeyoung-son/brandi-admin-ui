import React from 'react';
import SectionField from 'components/SectionField';
import ToggleButtonGroup from 'components/ToggleButtonGroup';
import ProductEditor from './ProductEditor';

const ProductDetails = () => {
  return (
    <SectionField
      label="상세 상품 정보"
      moreInfoText="상품상세이미지의 권장 사이즈는 가로사이즈 1000px 이상입니다."
      isRequired
    >
      <ProductEditor />
    </SectionField>
  );
};

export default ProductDetails;
