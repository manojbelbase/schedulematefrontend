import { forwardRef } from "react";

export type TAllowedIcons =
  | "dashboard"
  | "application"
  | "star"
  | "employer"
  | "google"
  | "file-text"
  | "finance"
  | "more-horizontal"
  | "college"
  | "activity-dot";

type TProps = {
  name: TAllowedIcons;
} & React.SVGProps<SVGSVGElement>;
const Icon = forwardRef<SVGSVGElement, TProps>(({ name, ...props }, ref) => {
  switch (name) {
    case "dashboard":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-house"
          {...props}
          ref={ref}
        >
          <path
            d="M2.5 7.49984L10 1.6665L17.5 7.49984V16.6665C17.5 17.1085 17.3244 17.5325 17.0118 17.845C16.6993 18.1576 16.2754 18.3332 15.8333 18.3332H4.16667C3.72464 18.3332 3.30072 18.1576 2.98816 17.845C2.67559 17.5325 2.5 17.1085 2.5 16.6665V7.49984Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7.5 18.3333V10H12.5V18.3333"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "application":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-house"
          {...props}
          ref={ref}
        >
          <g clipPath="url(#clip0_258_1202)">
            <path
              d="M16.667 17.5002V13.3335"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14.167 13.3335H19.167"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3.33301 17.4998V11.6665"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M0.833008 11.6665H5.83301"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10 17.5V10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7.5 6.6665H12.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16.667 10V2.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10 6.66667V2.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3.33301 8.33333V2.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_258_1202">
              <rect width="20" height="20" fill="white" />
            </clipPath>
          </defs>
        </svg>
      );
    case "star":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-house"
          {...props}
          ref={ref}
        >
          <path
            d="M10.0003 1.6665L12.5753 6.88317L18.3337 7.72484L14.167 11.7832L15.1503 17.5165L10.0003 14.8082L4.85033 17.5165L5.83366 11.7832L1.66699 7.72484L7.42533 6.88317L10.0003 1.6665Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "employer":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-house"
          {...props}
          ref={ref}
        >
          <g clipPath="url(#clip0_258_1274)">
            <path
              d="M19.167 17.5001V15.8334C19.1664 15.0948 18.9206 14.3774 18.4681 13.7937C18.0156 13.2099 17.3821 12.793 16.667 12.6084"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14.1663 17.5V15.8333C14.1663 14.9493 13.8152 14.1014 13.19 13.4763C12.5649 12.8512 11.7171 12.5 10.833 12.5H4.16634C3.28229 12.5 2.43444 12.8512 1.80932 13.4763C1.1842 14.1014 0.833008 14.9493 0.833008 15.8333V17.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M13.333 2.6084C14.05 2.79198 14.6855 3.20898 15.1394 3.79366C15.5932 4.37833 15.8395 5.09742 15.8395 5.83757C15.8395 6.57771 15.5932 7.2968 15.1394 7.88147C14.6855 8.46615 14.05 8.88315 13.333 9.06673"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7.50033 9.16667C9.34127 9.16667 10.8337 7.67428 10.8337 5.83333C10.8337 3.99238 9.34127 2.5 7.50033 2.5C5.65938 2.5 4.16699 3.99238 4.16699 5.83333C4.16699 7.67428 5.65938 9.16667 7.50033 9.16667Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_258_1274">
              <rect width="20" height="20" fill="white" />
            </clipPath>
          </defs>
        </svg>
      );
    case "google":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="19"
          height="10"
          viewBox="0 0 19 10"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-house"
          {...props}
          ref={ref}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.7848 4.86319C7.63256 4.86319 4.97625 2.82863 4.04438 0L0 3.08775C1.95431 7.05656 6.03581 9.77231 10.7848 9.77231C13.7158 9.77231 16.5142 8.7315 18.6144 6.7815L14.7756 3.81375C13.6924 4.49606 12.3283 4.86319 10.7848 4.86319Z"
            fill="#34A853"
          />
        </svg>
      );
    case "file-text":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-house"
          {...props}
          ref={ref}
        >
          <path
            d="M14.5837 2.08325H6.25033C5.69779 2.08325 5.16789 2.30275 4.77719 2.69345C4.38649 3.08415 4.16699 3.61405 4.16699 4.16659V20.8333C4.16699 21.3858 4.38649 21.9157 4.77719 22.3064C5.16789 22.6971 5.69779 22.9166 6.25033 22.9166H18.7503C19.3029 22.9166 19.8328 22.6971 20.2235 22.3064C20.6142 21.9157 20.8337 21.3858 20.8337 20.8333V8.33325L14.5837 2.08325Z"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16.6663 17.7083H8.33301"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16.6663 13.5417H8.33301"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10.4163 9.375H9.37467H8.33301"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14.583 2.08325V8.33325H20.833"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "finance":
      return (
        <svg
          width="16"
          height="16"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          {...props}
          ref={ref}
        >
          <g clipPath="url(#clip0_10479_204661)">
            <path
              d="M13.2813 23.5338V24.0221C13.2297 25.3178 11.3793 25.3168 11.3281 24.0221V23.5338C11.3797 22.2381 13.2302 22.2391 13.2813 23.5338ZM16.2109 21.0924C15.6716 21.0924 15.2344 21.5296 15.2344 22.0689V24.0221C15.2859 25.3178 17.1364 25.3168 17.1875 24.0221V22.0689C17.1875 21.5296 16.7503 21.0924 16.2109 21.0924ZM10.3018 16.356C10.8411 16.356 11.2783 15.9188 11.2783 15.3795V14.8142C12.6217 14.6267 13.6231 13.5213 13.6231 12.1446V11.9049C13.6526 10.422 12.3502 9.14867 10.8708 9.17831H9.97594C9.54572 9.17831 9.18229 8.79818 9.18229 8.34823V7.99208C9.18229 7.55487 9.5235 7.22519 9.97594 7.22519H10.8222C11.0709 7.22519 11.3281 7.39169 11.3281 7.6703C11.3281 8.20966 11.7653 8.64687 12.3047 8.64687C12.8441 8.64687 13.2813 8.20966 13.2813 7.6703C13.2813 6.49985 12.4171 5.5226 11.2783 5.31347V4.68612C11.2268 3.39042 9.37633 3.3914 9.32521 4.68612V5.34726C8.12286 5.61405 7.20831 6.75087 7.22916 7.99208V8.34823C7.22916 9.8829 8.46134 11.1314 9.97594 11.1314H10.8708C11.3189 11.1314 11.6699 11.4712 11.6699 11.9049V12.1446C11.6699 12.5691 11.3264 12.8892 10.8708 12.8892H9.41652C9.17653 12.8892 8.93361 12.7383 8.93361 12.4498C8.93361 11.9104 8.4964 11.4732 7.95704 11.4732C7.41769 11.4732 6.98048 11.9104 6.98048 12.4498C6.98048 13.7614 8.00314 14.7952 9.32521 14.8408V15.3795C9.32521 15.9188 9.76241 16.356 10.3018 16.356ZM6.54244 19.7254C6.91793 19.7254 7.27594 19.5076 7.43688 19.1418C7.65407 18.6481 7.42989 18.0719 6.93619 17.8547C3.90909 16.5231 1.95314 13.5391 1.95314 10.2525C2.23414 0.0713289 16.5976 -1.08365 18.4518 8.94076C18.5362 9.47333 19.0366 9.83676 19.5693 9.75219C20.1019 9.66772 20.4652 9.16737 20.3808 8.63471C20.0026 6.25028 18.7819 4.06493 16.9436 2.48119C10.3763 -3.22013 -0.0290893 1.54608 6.11159e-05 10.2527C1.22878e-05 14.3134 2.41393 17.9992 6.14977 19.6426C6.2777 19.6988 6.4111 19.7255 6.54244 19.7254ZM22.0703 11.4244H19.6289C18.3332 11.476 18.3342 13.3264 19.6289 13.3775H21.7144L17.9618 17.1288C17.7653 17.3253 17.5057 17.4346 17.2528 17.4305C17.0336 17.4265 16.81 17.3341 16.6301 17.1752C16.6301 17.1752 16.4958 16.995 16.458 16.9572C15.896 16.3951 15.1434 16.0692 14.4043 16.0631C13.6394 16.0631 12.8606 16.3973 12.2897 16.9825L5.94952 23.3321C5.56847 23.7137 5.56891 24.3321 5.95055 24.7132C6.33219 25.0943 6.9505 25.0937 7.33165 24.7122L13.6763 18.3581C13.6795 18.3549 13.6826 18.3517 13.6858 18.3485C13.8901 18.1386 14.1532 18.0146 14.3946 18.0163C14.6035 18.018 14.8356 18.1196 15.0268 18.2909C15.5261 18.9752 16.3967 19.3684 17.2165 19.3833C17.9996 19.3973 18.7733 19.0796 19.3428 18.51L23.0469 14.8072V16.7467C23.0984 18.0424 24.9489 18.0414 25 16.7467V14.3541C25 12.7387 23.6858 11.4244 22.0703 11.4244ZM14.4043 16.0631C14.3971 16.063 14.4115 16.0631 14.4043 16.0631V16.0631ZM24.0234 19.5299C23.4841 19.5299 23.0469 19.9671 23.0469 20.5064V24.0221C23.0984 25.3178 24.9489 25.3168 25 24.0221V20.5064C25 19.9671 24.5628 19.5299 24.0234 19.5299ZM20.1172 20.4088C19.5778 20.4088 19.1406 20.846 19.1406 21.3853V24.0221C19.1922 25.3178 21.0426 25.3168 21.0938 24.0221V21.3853C21.0938 20.846 20.6566 20.4088 20.1172 20.4088Z"
              fill="currentColor"
            ></path>
          </g>
          <defs>
            <clipPath id="clip0_10479_204661">
              <rect width="25" height="25" fill="white"></rect>
            </clipPath>
          </defs>
        </svg>
      );
    case "more-horizontal":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="19"
          height="19"
          viewBox="0 0 19 19"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-house"
          {...props}
          ref={ref}
        >
          <path
            d="M13.375 0.125C16.0904 0.125001 18.292 2.32659 18.292 5.04199V13.375C18.292 16.0904 16.0904 18.292 13.375 18.292H5.04199C2.32659 18.292 0.125 16.0904 0.125 13.375V10.875C0.125001 10.4608 0.460789 10.125 0.875 10.125C1.28921 10.125 1.625 10.4608 1.625 10.875V13.375C1.625 15.262 3.15502 16.792 5.04199 16.792H13.375C15.262 16.792 16.792 15.262 16.792 13.375V5.04199C16.792 3.15502 15.262 1.625 13.375 1.625H5.04199C3.155 1.625 1.625 3.15504 1.625 5.04199V7.54199C1.62482 7.95604 1.2891 8.29199 0.875 8.29199C0.460897 8.29199 0.125176 7.95604 0.125 7.54199V5.04199C0.125 2.32657 2.32662 0.125 5.04199 0.125H13.375Z"
            fill="#121212"
            stroke="#121212"
            strokeWidth="0.25"
          />
          <path
            d="M5.0835 8.08301C5.72768 8.08318 6.24951 8.60574 6.24951 9.25C6.24934 9.89411 5.72757 10.4158 5.0835 10.416C4.43928 10.416 3.91668 9.89422 3.9165 9.25C3.9165 8.60563 4.43917 8.08301 5.0835 8.08301Z"
            fill="#121212"
            stroke="#121212"
            strokeWidth="0.25"
          />
          <path
            d="M9.25012 8.08301C9.89434 8.08318 10.4161 8.60574 10.4161 9.25C10.416 9.89411 9.89423 10.4158 9.25012 10.416C8.60586 10.416 8.08331 9.89422 8.08313 9.25C8.08313 8.60563 8.60575 8.08301 9.25012 8.08301Z"
            fill="#121212"
            stroke="#121212"
            strokeWidth="0.25"
          />
          <path
            d="M13.4169 8.08301C14.0611 8.08318 14.5829 8.60574 14.5829 9.25C14.5827 9.89411 14.061 10.4158 13.4169 10.416C12.7726 10.416 12.2501 9.89422 12.2499 9.25C12.2499 8.60563 12.7725 8.08301 13.4169 8.08301Z"
            fill="#121212"
            stroke="#121212"
            strokeWidth="0.25"
          />
        </svg>
      );
    case "college":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-house"
          {...props}
          ref={ref}
        >
          <g clipPath="url(#clip0_447_21432)">
            <path
              d="M1.66669 13.7493C1.66669 13.2891 2.03978 12.916 2.50002 12.916H5.00002V9.99935L10 6.66602L15 9.99935V12.916H17.5C17.9603 12.916 18.3334 13.2891 18.3334 13.7493V17.4993C18.3334 17.9596 17.9603 18.3327 17.5 18.3327H1.66669V13.7493Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M10 2.5V6.66667"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M15 5.00085V2.50087C15 2.50087 14.375 3.75087 12.5 2.50087C10.625 1.25087 10 2.50087 10 2.50087V5.00085C10 5.00085 10.625 3.75087 12.5 5.00085C14.375 6.25085 15 5.00085 15 5.00085Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M11.6666 18.3327V12.916H8.33331V18.3327"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7.5 18.334H12.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_447_21432">
              <rect width="20" height="20" fill="white" />
            </clipPath>
          </defs>
        </svg>
      );
    case "activity-dot":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="8"
          height="8"
          viewBox="0 0 8 8"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-house"
          {...props}
          ref={ref}
        >
          <circle cx="4" cy="4" r="4" fill="currentColor" />
        </svg>
      );
  }
});

Icon.displayName = "Icon";

export default Icon;
