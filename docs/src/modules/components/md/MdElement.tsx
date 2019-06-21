import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import Highlight from 'react-highlight';

import { generateMdElement } from './MdElement.svc';
import { useMdStyles } from './styles/MdStyles';

export interface MdElementProps {
  content: string;
}

function MdElement({ content }: MdElementProps) {
  const [markdown, setMarkdown] = useState('');
  const classes = useMdStyles();

  useEffect(() => {
    generateMdElement({ content }).then(result => setMarkdown(result.contents as string));
  }, [content]);

  return <div className={clsx(classes.root, 'markdown-body')}>{markdown}</div>;
}

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

const pre = ({ children, className }) => {
  const language = className.replace(/language-/, '');

  return (
    <Highlight
      // {...defaultProps}
      code={children}
      language={language}
    >
      {({
        // className,
        style,
        tokens,
        getLineProps,
        getTokenProps
      }) => (
        <pre
          // className={className}
          style={{ ...style, padding: '20px' }}
        >
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};

export default MdElement;
