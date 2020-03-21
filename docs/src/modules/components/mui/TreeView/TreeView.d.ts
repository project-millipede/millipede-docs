import { StandardProps } from '@material-ui/core';
import * as React from 'react';

export interface TreeViewPropsBase
  extends StandardProps<
    React.HTMLAttributes<HTMLUListElement>,
    TreeViewClassKey
  > {
  /**
   * The default icon used to collapse the node.
   */
  defaultCollapseIcon?: React.ReactNode;
  /**
   * The default icon displayed next to a end node. This is applied to all
   * tree nodes and can be overridden by the TreeItem `icon` prop.
   */
  defaultEndIcon?: React.ReactNode;
  /**
   * Expanded node ids. (Uncontrolled)
   */
  defaultExpanded?: Array<string>;
  /**
   * The default icon used to expand the node.
   */
  defaultExpandIcon?: React.ReactNode;
  /**
   * The default icon displayed next to a parent node. This is applied to all
   * parent nodes and can be overridden by the TreeItem `icon` prop.
   */
  defaultParentIcon?: React.ReactNode;
  /**
   * If `true` selection is disabled.
   */
  disableSelection?: boolean;
  /**
   * Expanded node ids. (Controlled)
   */
  expanded?: Array<string>;
  /**
   * Callback fired when tree items are expanded/collapsed.
   *
   * @param {object} event The event source of the callback.
   * @param {array} nodeIds The ids of the expanded nodes.
   */
  onNodeToggle?: (event: React.ChangeEvent<{}>, nodeIds: Array<string>) => void;
}

export interface MultiSelectTreeViewProps extends TreeViewPropsBase {
  /**
   * Selected node ids. (Uncontrolled)
   * When `multiSelect` is true this takes an array of strings; when false (default) a string.
   */
  defaultSelected?: Array<string>;
  /**
   * Selected node ids. (Controlled)
   * When `multiSelect` is true this takes an array of strings; when false (default) a string.
   */
  selected?: Array<string>;
  /**
   * If true `ctrl` and `shift` will trigger multiselect.
   */
  multiSelect?: true;
  /**
   * Callback fired when tree items are selected/unselected.
   *
   * @param {object} event The event source of the callback
   * @param {(array|string)} value of the selected nodes. When `multiSelect` is true
   * this is an array of strings; when false (default) a string.
   */
  onNodeSelect?: (event: React.ChangeEvent<{}>, nodeIds: Array<string>) => void;
}

export interface SingleSelectTreeViewProps extends TreeViewPropsBase {
  /**
   * Selected node ids. (Uncontrolled)
   * When `multiSelect` is true this takes an array of strings; when false (default) a string.
   */
  defaultSelected?: string;
  /**
   * Selected node ids. (Controlled)
   * When `multiSelect` is true this takes an array of strings; when false (default) a string.
   */
  selected?: string;
  /**
   * If true `ctrl` and `shift` will trigger multiselect.
   */
  multiSelect?: false;
  /**
   * Callback fired when tree items are selected/unselected.
   *
   * @param {object} event The event source of the callback
   * @param {(array|string)} value of the selected nodes. When `multiSelect` is true
   * this is an array of strings; when false (default) a string.
   */
  onNodeSelect?: (event: React.ChangeEvent<{}>, nodeIds: string) => void;
}

export type TreeViewProps =
  | SingleSelectTreeViewProps
  | MultiSelectTreeViewProps;

export type TreeViewClassKey = 'root';

export default function TreeView(props: TreeViewProps): JSX.Element;