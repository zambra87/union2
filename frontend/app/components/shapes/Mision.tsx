export function Mision(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      width="60"
      height="60"
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0)">
        <rect width="60" height="60" fill="#F7C9AB" />
        <circle cx="60" r="30" fill="#FFB14A" />
        <circle cx="60" cy="60" r="30" fill="#FFB14A" />
        <circle cy="60" r="30" fill="#FFB14A" />
        <circle r="30" fill="#405B4E" />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width="60" height="60" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
