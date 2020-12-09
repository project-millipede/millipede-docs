import { makeStyles, Theme } from '@material-ui/core';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';

import { generateMdElement, MdElementProps } from './MdElement.svc';
import { useMdStyles } from './styles/MdStyles';

const useStyles = makeStyles((theme: Theme) => {
  return {
    ...useMdStyles(theme)
  };
});

const MdElement = ({ content }: MdElementProps) => {
  const [markdown, setMarkdown] = useState<unknown>();

  const classes = useStyles();

  useEffect(() => {
    generateMdElement({ content }).then(file => setMarkdown(file.result));
  }, [content]);

  return <div className={clsx(classes.root, 'markdown-body')}>{markdown}</div>;
};

// TODO - get highligh feature enabled

// const pre = ({ children, className }) => {
//   const code = children[0];
//   const text = code.props.children[0];
//   const language = code.props.className.replace(/language-/, "");

//   const classes = useStyles();

//   return (
//     <div className={clsx(classes.root, "markdown-body", className)}>
//       <Highlight {...defaultProps} code={text} language={language} theme={vsDark}>
//         {({ className, style, tokens, getLineProps, getTokenProps }) => (
//           <pre className={className} style={{ ...style, padding: "20px" }}>
//             {tokens.map((line, i) => (
//               <div key={i} {...getLineProps({ line, key: i })}>
//                 {line.map((token, key) => (
//                   <span key={key} {...getTokenProps({ token, key })} />
//                 ))}
//               </div>
//             ))}
//           </pre>
//         )}
//       </Highlight>
//     </div>
//   );
// };

export default MdElement;
