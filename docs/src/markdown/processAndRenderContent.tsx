import { Typography } from '@material-ui/core';
import React from 'react';
import { Element } from 'react-scroll';

interface RemarkProps {
  // id generated through slug
  id: string;

  component: "h2" | "h3";
}

export class Heading extends React.Component<RemarkProps> {
  render() {
    return (
      <Element name={this.props.id}>
        <Typography variant={this.props.component}>{this.props.children}</Typography>
      </Element>
    );
  }
}
