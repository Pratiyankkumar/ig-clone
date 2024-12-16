/* eslint-disable react/prop-types */
function FollowButton({ styles, onClick, children }) {
  return (
    <button onClick={onClick} className={styles}>
      {children}
    </button>
  );
}

export default FollowButton;
