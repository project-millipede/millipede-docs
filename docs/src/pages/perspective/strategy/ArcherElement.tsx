import React, { ReactElement } from 'react';
import { Relation } from 'react-archer';
import isEqual from 'react-fast-compare';

import { ArcherContainerContextConsumer } from './ArcherContainer';
import { RelationType, SourceToTargetType } from './types';

interface ArcherContainerContextType {
  registerChild?: (id: string, ref: React.RefObject<HTMLElement>) => void;
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

  elementRef: React.RefObject<HTMLElement> = React.createRef<HTMLElement>();

  componentDidUpdate(prevProps: InnerProps) {
    if (isEqual(prevProps.relations, this.props.relations)) return;

    this.registerTransitions(this.props.relations);
  }

  componentDidMount() {
    this.registerTransitions(this.props.relations);
    this.props.context.registerChild(this.props.id, this.elementRef);
  }

  componentWillUnmount() {
    this.unSetRef();
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

  // refSet = (ref: HTMLElement) => {
  //   if (!ref) return;
  //   if (!this.props.context.registerChild) {
  //     throw new Error(
  //       `Could not find "registerChild" in the context of ` +
  //         `<ArcherElement>. Wrap the component in a <ArcherContainer>.`
  //     );
  //   }

  //   this.props.context.registerChild(this.props.id, ref);
  // };

  // unregisterChild = () => {
  //   if (!this.props.context.unregisterChild) {
  //     throw new Error(
  //       `Could not find "unregisterChild" in the context of ` +
  //         `<ArcherElement>. Wrap the component in a <ArcherContainer>.`
  //     );
  //   }

  //   this.props.context.unregisterChild(this.props.id);
  // };

  unSetRef = () => {
    if (!this.props.context.unregisterChild) {
      throw new Error(
        `Could not find "unregisterChild" in the context of ` +
          `<ArcherElement>. Wrap the component in a <ArcherContainer>.`
      );
    }

    this.props.context.unregisterChild(this.props.id);
  };

  render() {
    const { children } = this.props;
    return React.cloneElement(children, {
      ref: this.elementRef
    });
  }
}

const ArcherElementWithContext = (props: OuterProps) => (
  <ArcherContainerContextConsumer>
    {context => <ArcherElementNoContext {...props} context={context} />}
  </ArcherContainerContextConsumer>
);

export default ArcherElementWithContext;
