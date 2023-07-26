/*
 * @Descripttion:
 * @version:
 * @Author: 十三
 * @Date: 2022-11-20 12:26:10
 * @LastEditors: 十三
 * @LastEditTime: 2022-12-26 17:07:21
 */
import { Omit, Partial } from '@/packages/helper';

export type IProps<T = any> = T & {
  children: T[];
};
export interface IOptions {
  /**
   * 父节点的键名称
   */
  parent: string;
  /**
   * 数据节点标识
   */
  key: string;
  /**
   * 作为父节点的依据值
   */
  pid: string | number | null;
}

/**
 * 树形结构转换
 * @param arrData 原数组数据
 * @param options
 * @returns
 */
export const useTransformTree = <T>(
  arrData: T[],
  options: Partial<IOptions> = {
    parent: 'parent',
    key: 'id',
    pid: null
  }
) => {
  const res: IProps<T>[] = [];
  options.key = options.key || 'id';
  options.parent = options.parent || 'parent';
  options.pid = options.pid === undefined ? null : options.pid;
  arrData.forEach(item => {
    if (item[options.parent!] === options.pid) {
      const children = useTransformTree(
        arrData.filter(v => v[options.parent ?? 'parent'] !== options.pid),
        {
          parent: options.parent,
          key: options.key,
          pid: item[options.key!]
        }
      );
      children.length ? res.push({ ...item, children }) : res.push({ ...item, children: [] });
    }
  });
  return res;
};

/**
 *
 * @param data 树形结构扁平化
 * @param options
 * @returns
 */
interface ITreeOptions {
  children?: string;
}

export const useTransformList = <T>(
  data: T[],
  options: ITreeOptions = {
    children: 'children'
  }
): Omit<T, 'children'>[] => {
  const { children = 'children' } = options;
  let res: Omit<T, 'children'>[] = [];

  const transform = (node: T): void => {
    const cloneData = { ...node };
    delete cloneData[children];
    res.push(cloneData);

    if (node[children] && node[children].length) {
      for (const child of node[children]) {
        transform(child);
      }
    }
  };

  for (const node of data) {
    transform(node);
  }

  return res;
};
