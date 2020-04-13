import { IncomingMessage } from 'http';

export const detectDevice = (req: IncomingMessage) => {
  let userAgent: string;
  if (req) {
    // If you are on the server and you get a 'req' property from your context
    // Get the user-agent from the headers
    userAgent = req.headers['user-agent'];
  } else {
    // If you are on the client you can access the navigator from the window object
    userAgent = navigator.userAgent;
  }

  const isMobile = Boolean(
    userAgent.match(
      /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    )
  );
  return isMobile;
};
