/* eslint-disable react/prop-types */
function FollowButton({ styles, onClick }) {
  return (
    <button onClick={onClick} className={styles}>
      Follow
    </button>
  );
}

export default FollowButton;
