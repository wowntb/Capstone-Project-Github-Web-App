function UserDetails({ userData }) {
  return (
    <div>
      <h2>User Details</h2>
      <div className="avatar-container">
        <img className="avatar" src={userData.avatar_url} alt="User Avatar" />
      </div>
      <a href={userData.html_url} target="_blank" rel="noreferrer">
        <h3>GitHub Profile Page</h3>
      </a>
      <p>Bio: {userData.bio ? userData.bio : "N/A"}</p>
    </div>
  );
}

export default UserDetails;
