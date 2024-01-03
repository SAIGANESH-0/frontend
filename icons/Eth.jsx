"use client";
const Eth = ({ handleConnect }) => {
  return (
    <button onClick={() => handleConnect()}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
      >
        <g fill="white" fill-rule="evenodd">
          <path d="M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16s-7.163 16-16 16zm7.994-15.781L16.498 4L9 16.22l7.498 4.353l7.496-4.354zM24 17.616l-7.502 4.351L9 17.617l7.498 10.378L24 17.616z" />
          <g fill-rule="nonzero">
            <path
              fill-opacity=".298"
              d="M16.498 4v8.87l7.497 3.35zm0 17.968v6.027L24 17.616z"
            />
            <path
              fill-opacity=".801"
              d="m16.498 20.573l7.497-4.353l-7.497-3.348z"
            />
            <path fill-opacity=".298" d="m9 16.22l7.498 4.353v-7.701z" />
          </g>
        </g>
      </svg>
    </button>
  );
};
export default Eth;
