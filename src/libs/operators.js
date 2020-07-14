import { Platform } from 'react-native';
import Toast from 'react-native-root-toast';
import { colors } from '../theme/colors';
import { dySize, getFontSize } from './responsive';

const HTML = require('html-parse-stringify');

const iOSNormalFontSize = 20;

export const validateEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const showToast = (text, param) => {
  Toast.show(text, {
    duration: param.long ? Toast.durations.LONG : Toast.durations.SHORT,
    position: param.position === 'bottom' ? Toast.positions.BOTTOM : param.position === 'top' ? Toast.positions.TOP : Toast.positions.CENTER,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0
  });
};

export const clarifyText = (text) => {
  let temp = text;
  temp = temp.replace('#038;', '');
  temp = temp.replace('#8211;', '');
  return temp;
};

export const convertHTML = (html) => {
  const data = HTML.parse(html);
  console.log('Parsed HTML', data);
  const result = [];
  data.map((item) => {
    result.push(changeElement(item));
    return true;
  });
  console.log(HTML.stringify(result));
  return HTML.stringify(result);
};

const changeElement = (element) => {
  const temp = element;
  const additionalStyle = 'font-family: impact, sans-serif; line-height: 24px;';
  if (temp.name === 'p') {
    temp.attrs = {
      style: temp.attrs.style === undefined ? additionalStyle : temp.attrs.style + ' ' + additionalStyle
    };
  } else if (temp.name === 'span') {
    temp.attrs = {
      style: temp.attrs.style === undefined ? additionalStyle : temp.attrs.style + ' ' + additionalStyle
    };
  } else if (temp.name === 'li') {
    temp.attrs = {
      style: temp.attrs.style === undefined ? additionalStyle : temp.attrs.style + ' ' + additionalStyle
    };
  } else if (temp.name === 'iframe') {
    temp.attrs = {
      ...element.attrs,
      width: `${dySize(335)}px`,
      height: `${dySize(335 * element.attrs.height / element.attrs.width)}px`,
    };
  }
  if (temp.children !== undefined) {
    const children = [];
    temp.children.map((item) => {
      children.push(changeElement(item));
      return true;
    });
    temp.children = children;
  }
  return temp;
};
