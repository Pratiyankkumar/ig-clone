/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
function Error({ text }) {
  return (
    <div className="px-2 py-4 text-white absolute top-4 right-4 bg-red-600 shadow-md border-2 rounded-full flex flex-row items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
        />
      </svg>

      <p className="ml-2">{text}</p>
    </div>
  );
}

export default Error;
