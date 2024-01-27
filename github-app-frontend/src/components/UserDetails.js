function UserDetails({ userData }) {
  return (
    <div>
      <h2>User Details</h2>
      <div className="avatar-container">
        <img className="avatar" src={userData.avatar_url} alt="User Avatar" />
      </div>
      <a href={userData.html_url} target="_blank" rel="noreferrer">
        <h3>GitHub Page</h3>
      </a>
      <p>User: {userData.login ? userData.login : "N/A"}</p>
      <p>Name: {userData.name ? userData.name : "N/A"}</p>
      <p>Bio: {userData.bio ? userData.bio : "N/A"}</p>
      <p>Location: {userData.location ? userData.location : "N/A"}</p>
    </div>
  );
}

export default UserDetails;
