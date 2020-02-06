import React from 'react';
import styled from 'styled-components';
import BoxDesign from 'components/BoxDesign';
import Navigation from 'components/Navigation/Navigation';
import DataList from 'pages/ProductManagement/Sections/DataList';
import ProductControlSearch from './Sections/ProductControlSearch';

const ProductManagement = () => {
  return (
    <Navigation>
      <PageWrapper>
        <ProductControlSearch />
        <BoxDesign>
          <DataList />
        </BoxDesign>
      </PageWrapper>
    </Navigation>
  );
};

export default ProductManagement;

// Styled Component

const PageWrapper = styled.div`
  padding: 25px 20px 20px;
  background-color: #edf0f5;
`;
