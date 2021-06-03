import { useCallback, useRef } from 'react';

// In your component you'll still recieve a `ref`,
// but it will be a callback function instead of a ref object

// TODO:
// Eval if attachToNode, detachFromNode fn have to be dependencies of setNodeRef cb

export const useCallbackRef = <T>(
  attachToNode: (node: T) => void,
  detachFromNode: (node: T) => void
): [(node: T) => void] => {
  const nodeRef = useRef<T>(null);
  const setNodeRef = useCallback((node: T) => {
    if (nodeRef.current) {
      // Make sure to cleanup any event listeners added to the last instance
      detachFromNode(nodeRef.current);
    }

    // Save a reference to the node
    nodeRef.current = node;

    // Check if a node is actually passed.
    if (nodeRef.current) {
      attachToNode(node);
    }
  }, []);

  return [setNodeRef];
};
