/*
 * @Descripttion:
 * @version:
 * @Author: 十三
 * @Date: 2022-11-19 20:45:42
 * @LastEditors: 十三
 * @LastEditTime: 2022-12-23 14:12:45
 */

import { getTag } from '@/packages/helper';

/**
 * 是否为大陆手机号
 * @param phone
 * @returns
 */
export const isPhone = (phone: string) => {
  return /^1[3,4,5,6,7,8,9][0-9]{9}$/.test(phone);
};
/**
 * 校验身份证
 * @param card 身份证
 * @returns boolean
 */
export const isIdCard = (card: string): boolean => {
  return /^[1-9]\d{5}(19|20)\d{2}((0[1-9]|1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(
    card
  );
};

/**
 * 是否是伪对象
 * @param value 校验值
 * @returns Boolean
 */
export const isObjectLike = <T>(value: T) => {
  return typeof value === 'object' && value !== null;
};

/**
 * 是否是数值类型
 * @param value 校验值
 * @returns Boolean
 */
export const isNumber = <T>(value: T): boolean => {
  return typeof value === 'number' || (isObjectLike(value) && getTag(value) === '[object Number]');
};

/**
 * 判断一个字符串是否是数字，包括小数点和其他符号
 * @param value
 * isNumeric('123') //true
 * isNumeric('-45.67'); // 输出: true
 * isNumeric('3.14e-10'); // 输出: true
 * isNumeric('abc'); // 输出: false
 */
export const isNumeric = value => {
  if (isNumber(value)) return isNumber(value);
  return /^[-+]?(\d+(\.\d*)?|\.\d+)([eE][-+]?\d+)?$/.test(value);
};
export const isString = value => {
  const type = typeof value;
  return (
    type === 'string' ||
    (type === 'object' &&
      value !== null &&
      !Array.isArray(value) &&
      getTag(value) === '[object String]')
  );
};
// export const isHasMediaDevice = () => {};

/**
 * 判断是否为函数
 * @param value
 */
export const isFunction = <T>(value: T) => {
  return typeof value === 'function';
};
