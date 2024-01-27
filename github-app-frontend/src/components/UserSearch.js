import { useState } from "react";
import UserDetails from "./UserDetails";
import Repositories from "./Repositories";
// These 2 imports are for the loading icons.
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

function UserSearch() {
  const [username, setUsername] = useState("wowntb");
  const [userData, setUserData] = useState(null);
  // This is a state to manage loading.
  const [loading, setLoading] = useState(false);

  const searchUser = async () => {
    try {
      // Set loading to true before searching user.
      setLoading(true);
      const response = await fetch(`/api/users/${username}`);

      if (!response.ok) {
        throw new Error("User not found");
      }

      const userData = await response.json();
      setUserData(userData);
    } catch (error) {
      console.log("An error occurred: " + error);
    } finally {
      // Set loading to false after searching user.
      setLoading(false);
    }
  };

  return (
    <>
      <div className="outer-div">
        <div className="inner-div">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />
          <button onClick={searchUser}>Search User</button>
        </div>
      </div>

      {/* Render loading icon if loading is true. */}
      {loading && (
        <div className="loading-icon">
          <FontAwesomeIcon icon={faSpinner} spin />
          <span>Loading...</span>
        </div>
      )}

      {/* Render UserDetails and RepoDetails components if userData is available. */}
      {userData && (
        <div>
          <UserDetails userData={userData} />
          {/* userData.repos_url passes https://api.github.com/users/username/repos which is then fetched in the component. */}
          <Repositories repos_url={userData.repos_url} />
        </div>
      )}
    </>
  );
}

export default UserSearch;
