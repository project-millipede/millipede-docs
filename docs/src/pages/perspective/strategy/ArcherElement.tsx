import React, { ReactElement } from 'react';
import { Relation } from 'react-archer';
import isEqual from 'react-fast-compare';

import { ArcherContainerContextConsumer } from './ArcherContainer';
import { RelationType, SourceToTargetType } from './types';

// const ArcherContainerContext = React.createContext<ArcherContainerContextType>(
//   {}
// );

// export const ArcherContainerContextProvider = ArcherContainerContext.Provider;
// export const ArcherContainerContextConsumer = ArcherContainerContext.Consumer;

interface ArcherContainerContextType {
  registerChild?: (id: string, ref: HTMLElement) => void;
  registerTransitions?: (
    elementId: string,
    newSourceToTargets: Array<SourceToTargetType>
  ) => void;
  unregisterChild?: (id: string) => void;
  unregisterTransitions?: (elementId: string) => void;
}

type OuterProps = {
  id: string;
  relations?: Array<Relation>;
  children: ReactElement;
};

type InnerProps = OuterProps & {
  context: ArcherContainerContextType;
};

export class ArcherElementNoContext extends React.Component<InnerProps> {
  static defaultProps = {
    relations: []
  };

  componentDidUpdate(prevProps: InnerProps) {
    if (isEqual(prevProps.relations, this.props.relations)) return;

    this.registerTransitions(this.props.relations);
  }

  componentDidMount() {
    if (this.props.relations.length === 0) {
      return;
    }

    this.registerTransitions(this.props.relations);
  }

  componentWillUnmount() {
    this.unregisterChild();
    this.unregisterTransitions();
  }

  registerTransitions = (newRelations: Array<Relation>) => {
    const newSourceToTarget = this.generateSourceToTarget(newRelations as any);

    if (!this.props.context.registerTransitions) {
      throw new Error(
        `Could not find "registerTransition" in the context of ` +
          `<ArcherElement>. Wrap the component in a <ArcherContainer>.`
      );
    }

    this.props.context.registerTransitions(this.props.id, newSourceToTarget);
  };

  generateSourceToTarget = (
    relations: Array<RelationType>
  ): Array<SourceToTargetType> => {
    const { id } = this.props;

    return relations.map(
      ({
        targetId,
        sourceAnchor,
        targetAnchor,
        label,
        style
      }: RelationType) => ({
        source: { id, anchor: sourceAnchor },
        target: { id: targetId, anchor: targetAnchor },
        label,
        style
      })
    );
  };

  unregisterTransitions = () => {
    if (!this.props.context.unregisterTransitions) {
      throw new Error(
        `Could not find "unregisterTransitions" in the context of ` +
          `<ArcherElement>. Wrap the component in a <ArcherContainer>.`
      );
    }

    this.props.context.unregisterTransitions(this.props.id);
  };

  onRefUpdate = (ref: HTMLElement) => {
    if (!ref) return;
    if (!this.props.context.registerChild) {
      throw new Error(
        `Could not find "registerChild" in the context of ` +
          `<ArcherElement>. Wrap the component in a <ArcherContainer>.`
      );
    }

    this.props.context.registerChild(this.props.id, ref);
  };

  unregisterChild = () => {
    if (!this.props.context.unregisterChild) {
      throw new Error(
        `Could not find "unregisterChild" in the context of ` +
          `<ArcherElement>. Wrap the component in a <ArcherContainer>.`
      );
    }

    this.props.context.unregisterChild(this.props.id);
  };

  render() {
    // Check that we only have one child to ArcherElement
    React.Children.only(this.props.children);

    // Now, we'll render this child by getting its ref. The ref will be used to compute the element's position.
    // I'm pretty sure there's a cleaner way to get the ref of the child... feel free to suggest it!
    const child = this.props.children;
    return React.cloneElement(child as any, {
      ...(child.props as any),
      ref: this.onRefUpdate
    });
  }

  //   render() {
  //     return (
  //       <div
  //         style={{ ...this.props.style, position: 'relative' }}
  //         className={this.props.className}
  //         ref={this.onRefUpdate}
  //       >
  //         {this.props.children}
  //       </div>
  //     );
  //   }
  // render() {
  //   return (
  //     <div
  //       style={{ position: 'relative' }}
  //       // className={this.props.className}
  //       ref={this.onRefUpdate}
  //     >
  //       {this.props.children}
  //     </div>
  //   );
  // }
}

const ArcherElementWithContext = (props: OuterProps) => (
  <ArcherContainerContextConsumer>
    {context => <ArcherElementNoContext {...props} context={context} />}
  </ArcherContainerContextConsumer>
);

export default ArcherElementWithContext;
