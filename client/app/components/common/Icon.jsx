export const HeartIcon = ({ className = "" }) => {
  return (
    <svg
      className={`${className} heart-icon`}
      enableBackground="new 467 392 58 57"
      viewBox="467 392 58 57"
      xmlns="http://www.w3.org/2000/svg"
      fill=""
      stroke="#000"
      strokeWidth="2"
    >
      <g
        id="Group"
        fill="none"
        fillRule="evenodd"
        transform="translate(467 392)"
      >
        <path
          d="M29.144 20.773c-.063-.13-4.227-8.67-11.44-2.59C7.63 28.795 28.94 43.256 29.143 43.394c.204-.138 21.513-14.6 11.44-25.213-7.214-6.08-11.377 2.46-11.44 2.59z"
          id="heart"
          strokeLinejoin="round"
        />
        <circle
          id="main-circ"
          fill="#E2264D"
          opacity="0"
          cx="29.5"
          cy="29.5"
          r="1.5"
        />

        <g id="grp7" opacity="0" transform="translate(7 6)">
          <circle id="oval1" fill="#FF6347" cx="2" cy="6" r="2" />
          <circle id="oval2" fill="#FF4500" cx="5" cy="2" r="2" />
        </g>

        <g id="grp6" opacity="0" transform="translate(0 28)">
          <circle id="oval1" fill="#FF6347" cx="2" cy="7" r="2" />
          <circle id="oval2" fill="#FF4500" cx="3" cy="2" r="2" />
        </g>

        <g id="grp3" opacity="0" transform="translate(52 28)">
          <circle id="oval2" fill="#FF6347" cx="2" cy="7" r="2" />
          <circle id="oval1" fill="#FF4500" cx="4" cy="2" r="2" />
        </g>

        <g id="grp2" opacity="0" transform="translate(44 6)">
          <circle id="oval2" fill="#FF6347" cx="5" cy="6" r="2" />
          <circle id="oval1" fill="#FF4500" cx="2" cy="2" r="2" />
        </g>

        <g id="grp5" opacity="0" transform="translate(14 50)">
          <circle id="oval1" fill="#FFA500" cx="6" cy="5" r="2" />
          <circle id="oval2" fill="#FF6347" cx="2" cy="2" r="2" />
        </g>

        <g id="grp4" opacity="0" transform="translate(35 50)">
          <circle id="oval1" fill="#FFA500" cx="6" cy="5" r="2" />
          <circle id="oval2" fill="#FF6347" cx="2" cy="2" r="2" />
        </g>

        <g id="grp1" opacity="0" transform="translate(24)">
          <circle id="oval1" fill="#FFA500" cx="2.5" cy="3" r="2" />
          <circle id="oval2" fill="#FF6347" cx="7.5" cy="2" r="2" />
        </g>
      </g>
    </svg>
  );
};

export const GoogleIcon = () => {
  return (
    <svg
      className="google-icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 533.5 544.3"
    >
      <path
        fill="#4285f4"
        d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
      />
      <path
        fill="#34a853"
        d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
      />
      <path
        fill="#fbbc04"
        d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
      />
      <path
        fill="#ea4335"
        d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
      />
    </svg>
  );
};

export const CloseIcon = () => {
  return <span className="close-icon" aria-hidden="true" />;
};

export const FacebookIcon = () => {
  return (
    <svg
      className="facebook-icon"
      fill="#3b5998"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z" />
    </svg>
  );
};
