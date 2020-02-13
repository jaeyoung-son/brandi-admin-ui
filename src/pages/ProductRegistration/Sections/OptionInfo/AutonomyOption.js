import React, { useState, useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import styled, { css } from 'styled-components';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import Checkbox from '@material-ui/core/Checkbox';

// redux
import { connect } from 'react-redux';
import { addAutonomyOption } from 'store/actions';

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
  firstTitle: {
    padding: '7px',
    paddingLeft: '16px',
  },
  titleCell: {
    padding: '7px',
    paddingLeft: '16px',
    color: '#767a83',
    borderLeft: '1px solid',
    borderLeftColor: '#dbdde2',
  },
  infoTitle: {
    color: '#767a83',
  },
  info: {
    padding: '7px',
    paddingLeft: '16px',
    borderLeft: '1px solid',
    borderLeftColor: '#dbdde2',
    color: '#767a83',
  },
  btn: {
    minWidth: '38px',
    padding: 0,
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
  }),
};

const AutonomyOption = ({ type, list, addAutonomyOption, autonomyRemove, autonomyOptionList, sequenceSetup }) => {
  const classes = useStyles();
  const [option, setOption] = useState('');
  const [optionList, setOptionList] = useState([]);
  const [checked, setChecked] = useState(true);

  const optionNameSet = e => {
    console.log(e.target.value)
    setOption(e.target.value)
  }

  const listSet = (select, id) => {
    console.log(select);
    console.log(id);
    let selectedOptionVals = [];
    select.map(item => selectedOptionVals.push(item.value));
    console.log(selectedOptionVals)
    autonomyOptionList(option, selectedOptionVals, id);
    console.log('state list : ', optionList)
  };
  
  const setDown = id => {
    console.log(id);
    console.log(list[id]);
    if(id !== list.length - 1) {
      let target = list[id + 1];
      list[id + 1] = list[id];
      list[id] = target
      sequenceSetup(list)
    }
  };

  const setUp = id => {
    console.log(id);
    console.log(list[id]);
    if(id !== 0) {
      let target = list[id - 1];
      list[id - 1] = list[id];
      list[id] = target
      console.log(list)
      sequenceSetup(list)
    }
  };

  const removeOption = id => {
    if(list.length > 2){
      autonomyRemove(id)
    }
  };

  const addOption = () => {
    addAutonomyOption();
  };

  const handleChange = id => {
    setChecked(!checked);
  };

  

  return (
    <TableContainer component={Paper} className={classes.container}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead className={classes.title}>
          <TableRow>
            <StyledTableCell
              style={{ width: '15%' }}
              className={classes.firstTitle}
            >
              순서
            </StyledTableCell>
            <StyledTableCell
              style={{ width: '15%' }}
              className={classes.titleCell}
              align="left"
            >
              옵션명
            </StyledTableCell>
            <StyledTableCell
              style={{ width: '60%' }}
              className={classes.titleCell}
              align="left"
            >
              옵션값
            </StyledTableCell>
            <StyledTableCell
              style={{ width: '10%' }}
              className={classes.titleCell}
              align="left"
            ></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* body */}
          {list.map((element, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell
                className={classes.infoTitle}
                component="th"
                scope="row"
              >
                <Button
                  variant="contained"
                  className={classes.btn}
                  onClick={() => 
                    setDown(index)
                  }
                >
                  <ExpandMoreIcon />
                </Button>
                <Button
                  variant="contained"
                  className={classes.btn}
                  onClick={() => 
                    setUp(index)
                  }
                >
                  <ExpandLessIcon />
                </Button>
              </StyledTableCell>
              <StyledTableCell className={classes.info} align="left">
                <InputTag placeholder="예시) 색상" onChange={optionNameSet} value={element.name}></InputTag>
                {type === 1 && (
                  <Checkbox
                    checked={checked}
                    onChange={() => handleChange(index)}
                    value="checked"
                    color="primary"
                  />
                )}
              </StyledTableCell>
              <StyledTableCell className={classes.info} align="left">
                <CreatableSelect
                  styles={customStyles}
                  onChange={value => {
                    listSet(value, index);
                  }}
                  placeholder="옵션을 선택해 주세요."
                  isMulti
                />
              </StyledTableCell>
              <StyledTableCell className={classes.info} align="left">
                {' '}
                <Button
                  variant="contained"
                  className={classes.btn}
                  onClick={() => {
                    removeOption(index);
                  }}
                >
                  <RemoveIcon />
                </Button>
                {index === list.length - 1 && (
                  <Button
                    variant="contained"
                    className={classes.btn}
                    onClick={() => {
                      addOption();
                    }}
                  >
                    <AddIcon />
                  </Button>
                )}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const InputTag = styled.input`
  width: 90%;
  height: 34px;
  background-color: #fafafa;
  &:focus {
    border-color: #999999;
    background-color: white;
  }
`;
const mapStateToProps = state => {
  return {
    type: state.optionInfo.setType,
    list: state.optionInfo.autonomyList,
  };
};
export default connect(mapStateToProps, { addAutonomyOption, autonomyRemove, autonomyOptionList, sequenceSetup })(AutonomyOption);
