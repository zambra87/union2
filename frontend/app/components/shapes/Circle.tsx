export function Circle(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      width="424"
      height="424"
      viewBox="0 0 424 424"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="212" height="424" fill="#F6B98F" />
      <path
        d="M0 424C117.084 424 212 329.084 212 212C212 94.9156 117.084 0 0 0V424Z"
        fill="#364940"
      />
      <path
        d="M212 424C329.084 424 424 329.084 424 212C424 94.9156 329.084 0 212 0V424Z"
        fill="#F1564E"
      />
    </svg>
  );
}
