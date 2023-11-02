/*
 * @Descripttion:
 * @version:
 * @Author: 十三
 * @Date: 2022-09-24 11:56:13
 * @LastEditors: 十三
 * @LastEditTime: 2022-12-29 09:31:57
 */

import { isObjectLike } from '@/packages/is';

export function isValidKey(
  key: string | number | symbol,
  object: object
): key is keyof typeof object {
  return key in object;
}
/**
 * 深拷贝
 * @param data
 * @returns
 */
export const cloneDeep = <T>(data: T): T => {
  const diffClone = <T>(_source: T, hash = new WeakMap()) => {
    // 如果不是引用类型，直接return
    if (!isObjectLike(_source)) return _source;
    // 使用hash判断循环引用问题,如果存在，则获取这个值，并返回
    if (hash.has(_source as any)) return hash.get(_source as any);
    // 判断是否是数组
    let target: T = Array.isArray(_source) ? ([] as T) : ({} as T);
    if (Array.isArray(_source)) {
      hash.set(_source, target);
      _source.forEach((item, index) => {
        target[index] = diffClone(item, hash);
      });
      return target;
    }
    // 解决Symbol类型
    const symKeys = Object.getOwnPropertySymbols(_source);
    console.log(_source, symKeys);
    // 解决存在Symbol类型
    if (symKeys.length) {
      // 遍历
      symKeys.forEach(symKey => {
        target[symKey as any] = diffClone(_source[symKey], hash);
      });
      return target;
    }
    if (isObjectLike(_source)) {
      target = Object.create(Object.getPrototypeOf(_source));
      hash.set(_source as any, target);
      for (const key in _source) {
        if ((_source as any).hasOwnProperty.call(_source, key)) {
          target[key] = diffClone(_source[key], hash);
        }
      }
      return target;
    }
    // 处理函数、日期、正则表达式等等
    if (_source instanceof Date) {
      return new Date(_source);
    }
    if (_source instanceof RegExp) {
      return new RegExp(_source.source, _source.flags);
    }
    //其他数据类型直接返回
    return _source;
  };
  // 最后返回深拷贝内容
  return diffClone(data);
};
