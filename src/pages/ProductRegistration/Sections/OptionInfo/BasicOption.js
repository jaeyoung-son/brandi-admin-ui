import React, { useState } from 'react';
import Select from 'react-select';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import styled, { css } from 'styled-components';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { data } from './Data';
import axios from 'axios';
// component

// redux
import { connect } from 'react-redux';
import { selectBasicColor, selectBasicSize, setStock } from 'store/actions';

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  container: {
    overflow: 'visible',
    width: '90%',
  },
  table: {},
  title: {
    height: '50px',
  },
  titleCell: {
    padding: '7px',
    paddingLeft: '16px',
    color: '#767a83',
  },
  infoTitle: {
    color: '#767a83',
  },
  info: {
    borderLeft: '1px solid',
    borderLeftColor: '#dbdde2',
    color: '#767a83',
  },
});

const customStyles = {
  menu: (provided, state) => ({
    ...provided,
  }),
  control: () => ({
    height: 40,
    borderRadius: 0,
    fontSize: 13,
    border: '1px solid #dbdde2',
    display: 'flex',
    alignItems: 'center',
  }),
  container: base => ({
    ...base,
    width: '80%',
  }),
};

const BasicOption = ({ selectBasicColor, selectBasicSize, setStock }) => {
  const classes = useStyles();
  const [activeId, setActiveId] = useState(0);
  const [optionData, setOptionData] = useState([]);
  // All stock set
  const onClick = id => {
    if (id === 0) {
      setStock(false, id);
    } else {
      setStock(true, id);
    }
    setActiveId(id);
  };
  // color option set
  const selectedColor = color => {
    let selectedColorVals = [];
    color.map(option => selectedColorVals.push(option.value));
    selectBasicColor(selectedColorVals);
  };
  // size option set
  const selectedSize = size => {
    let selectedSizeVals = [];
    size.map(option => selectedSizeVals.push(option.value));
    selectBasicSize(selectedSizeVals);
  };

  return (
    <TableContainer component={Paper} className={classes.container}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead className={classes.title}>
          <TableRow>
            <StyledTableCell className={classes.titleCell}>
              기본옵션 항목 선택
            </StyledTableCell>
            <StyledTableCell
              className={classes.titleCell}
              align="right"
            ></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <StyledTableRow>
            <StyledTableCell
              className={classes.infoTitle}
              component="th"
              scope="row"
            >
              색 상
            </StyledTableCell>
            <StyledTableCell className={classes.info} align="left">
              <Select
                styles={customStyles}
                options={data.colorData}
                onChange={selectedColor}
                placeholder="색상 옵션을 선택해 주세요."
                isMulti
              />
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell
              className={classes.infoTitle}
              component="th"
              scope="row"
            >
              사이즈
            </StyledTableCell>
            <StyledTableCell className={classes.info} align="left">
              <Select
                styles={customStyles}
                options={data.sizeData}
                onChange={selectedSize}
                placeholder="사이즈 옵션을 선택해 주세요."
                isMulti
              />
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell
              className={classes.infoTitle}
              component="th"
              scope="row"
            >
              재고관리여부
            </StyledTableCell>
            <StyledTableCell className={classes.info} align="left">
              <ButtonGroupWrapper>
                {['수량 관리 안함', '재고 수량 관리'].map((option, idx) => (
                  <OptionButton
                    key={idx}
                    id={idx}
                    onClick={() => onClick(idx)}
                    activeId={activeId === idx}
                    value={option}
                  >
                    {option}
                  </OptionButton>
                ))}
              </ButtonGroupWrapper>
            </StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
const ButtonGroupWrapper = styled.div``;

const OptionButton = styled.button`
  border: 1px solid #ddd;
  width: 140px;
  padding: 8px 20px;
  font-size: 13px;
  color: #767a83;
  ${props =>
    props.activeId &&
    css`
      color: white;
      background-color: #36363a;
      border: 1px solid #36363a;
    `}
`;

export default connect(null, {
  selectBasicColor,
  selectBasicSize,
  setStock,
})(BasicOption);
