import * as React from 'react';

export function Vision(props) {
  return (
    <svg
      {...props}
      width="60"
      height="60"
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="60" height="60" fill="#F7C9AB" />
      <rect width="30" height="30" fill="#F7C9AB" />
      <path
        d="M60 30C60 13.4315 46.5685 -2.03558e-06 30 -1.31134e-06C13.4315 -5.87108e-07 -7.24234e-07 13.4315 0 30L60 30Z"
        fill="#405B4E"
      />
      <path
        d="M30 60C46.5685 60 60 46.5685 60 30C60 13.4315 46.5685 0 30 0V60Z"
        fill="#FE5245"
      />
    </svg>
  );
}
