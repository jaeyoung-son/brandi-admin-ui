import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import SectionField from 'components/SectionField';
import ToggleButtonGroup from 'components/ToggleButtonGroup';
import { data } from '../../../../../config';
import { connect } from 'react-redux';
import { setColorFilter } from 'store/actions';

// 버튼 옵션
const availableStatus = [
  { value: false, label: '사용 안함' },
  { value: true, label: '사용함' },
];

// 컬러 옵션
const availableColors = data.generalInfo.colorFilter;

const ColorFilter = ({ setColorFilter }) => {
  // 버튼 상태값 (디폴트: '사용 안함')
  const [active, setActive] = useState(false);
  // 모달 렌더 여부 상태값
  const [showModal, setShowModal] = useState(false);
  // 잠정 선택 컬러 상태값 (컬러 선택시 바뀜)
  const [tempColor, setTempColor] = useState('');
  // 최종 선택 컬러 상태값
  const [selectedColor, setSelectedColor] = useState('');

  const onClickButton = value => {
    setActive(value);
    if (!value) {
      setSelectedColor('');
      setTempColor('');
      // 액션 함수 (store)
      setColorFilter(null);
    }
  };

  // 컬러 선택 핸들링
  const onClickColor = value => {
    setTempColor(value);
  };

  // 모달 렌더 핸들링
  const onShowModal = () => {
    setShowModal(!showModal);
  };

  // 컬러 선택 후 '적용' 누를 시 호출
  const onApplyColor = () => {
    setShowModal(!showModal);
    setSelectedColor(tempColor);
    setColorFilter(tempColor);
  };

  // '취소' 누를 시 호출
  const onCancelColor = () => {
    setShowModal(!showModal);
    setTempColor('');
  };

  return (
    <>
      <SectionField
        label="색상필터(썸네일 이미지)"
        moreInfoText={[
          '베스트 탭, 카테고리 페이지 및 검색페이지의 필터에 적용되며, 선택하지 않으실 경우 색상필터를 사용한 검색결과에 노출되지 않습니다.',
          '썸네일 이미지의 1개 색상만 선택 가능하며, 뷰티 및 다이어트 카테고리의 상품의 경우 선택하실 수 없습니다.',
        ]}
      >
        <ToggleButtonGroup
          options={availableStatus}
          onClick={onClickButton}
          defaultVal={false}
        />
        {active && (
          <ChooseColorWrapper>
            <FormLabel>적용할 색상 찾기:</FormLabel>
            <InputBox value={!selectedColor ? '' : selectedColor} readOnly />
            <SearchButton onClick={onShowModal}>색상 찾기</SearchButton>
            {showModal && <Backdrop onClick={onCancelColor} />}
            {showModal && (
              <ColorSelectModal>
                <ColorHeader>
                  색상 선택
                  <ColorHeaderMoreInfo>
                    * 썸네일 이미지의 1개 색상만 선택 가능합니다.
                  </ColorHeaderMoreInfo>
                </ColorHeader>
                <ColorBody>
                  {availableColors.map(color => (
                    <ColorBox
                      key={color.valueKor}
                      onClick={() => onClickColor(color.valueKor)}
                      isSelected={tempColor === color.valueKor}
                    >
                      <ColorIcon />
                      <ColorNameKor>{color.valueKor}</ColorNameKor>
                      <ColorNameEng>{color.valueEng}</ColorNameEng>
                    </ColorBox>
                  ))}
                </ColorBody>
                <ColorSetButtonWrapper>
                  <ApplyButton onClick={onApplyColor}>적용</ApplyButton>
                  <CancelButton onClick={onCancelColor}>취소</CancelButton>
                </ColorSetButtonWrapper>
              </ColorSelectModal>
            )}
          </ChooseColorWrapper>
        )}
      </SectionField>
    </>
  );
};

export default connect(null, { setColorFilter })(ColorFilter);

// Styled Components
const InputBox = styled.input`
  width: 250px;
  height: 34px;
  background-color: #f8f9fd;
  cursor: not-allowed;
`;

const SearchButton = styled.button`
  width: 120px;
  height: 34px;
  padding: 8px 20px;
  font-size: 13px;
  color: white;
  margin-left: 8px;
  background-color: #36363a;
  border: 1px solid #36363a;
`;

const ChooseColorWrapper = styled.div`
  margin: 20px 0;
  width: 400px;
  display: flex;
  position: relative;
`;

const FormLabel = styled.label`
  min-width: 120px;
  display: flex;
  align-items: center;
`;

const Backdrop = styled.div`
  position: fixed;
  min-width: 100vw;
  min-height: 100vh;
  max-height: 100vh;
  background-color: black;
  z-index: 100;
  opacity: 0.5;
  left: 0;
  top: 0;
`;

const ColorSelectModal = styled.div`
  position: fixed;
  width: 460px;
  height: 550px;
  background-color: white;
  z-index: 200;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 6px;
`;

const ColorHeader = styled.div`
  height: 10%;
  padding: 15px;
  border-bottom: 1px solid #efefef;
  font-size: 18px;
  color: #222222;
  display: flex;
  align-items: center;
`;

const ColorHeaderMoreInfo = styled.span`
  color: #1e90ff;
  font-size: 12px;
  margin-left: 20px;
`;

const ColorBody = styled.div`
  height: 78%;
  padding: 15px;
  display: flex;
  align-content: flex-start;
  flex-wrap: wrap;
`;

const ColorBox = styled.button`
  margin: 0 10px 10px;
  width: 15%;
  height: 90px;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: flex-start;
  padding: none;
  border: 1px solid white;
  &:hover {
    background-color: #e8e8e8;
  }
  ${props => props.isSelected && 'border: 1px solid red;'}
`;

const ColorIcon = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 100%;
  background-color: lightblue;
`;

const ColorNameKor = styled.div`
  margin-top: 3px;
`;

const ColorNameEng = styled.div`
  margin-top: 0;
`;

const ColorSetButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 12%;
`;

const ApplyButton = styled.button`
  color: white;
  background-color: #36363a;
  border: 1px solid #36363a;
`;

const CancelButton = styled.button``;
