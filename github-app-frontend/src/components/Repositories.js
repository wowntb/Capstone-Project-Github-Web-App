import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

function Repositories({ repos_url }) {
  // State to store all repository data, details for each repo, and loading status.
  const [allReposData, setAllReposData] = useState(null);
  const [repoDetails, setRepoDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to fetch all repository data from the provided URL.
    const fetchRepos = async () => {
      try {
        const response = await fetch(repos_url);
        if (!response.ok) {
          throw new Error("Repository data not found");
        }
        const repoData = await response.json();
        setAllReposData(repoData);
        setLoading(false);
      } catch (error) {
        console.error(
          "An error occurred while fetching repository data:",
          error
        );
      }
    };

    // Call the fetchRepos function when the component mounts.
    fetchRepos();

    // Cleanup function to clear the state when the component unmounts or before the effect runs again.
    return () => {
      setAllReposData(null);
    };
  }, [repos_url]); // Run this effect whenever repos_url changes.

  useEffect(() => {
    // Function to fetch details (last commit date and creation date) for each repository.
    const fetchRepoDetails = async () => {
      if (allReposData) {
        const details = {};
        for (const repo of allReposData) {
          // Initialise details for each repo with an empty array for lastCommits and creation date.
          details[repo.name] = {
            lastCommits: [],
            creationDate: repo.created_at,
          };
          try {
            // The fetch would fail with the URL having "{/sha}" at the end so I had to remove it with .replace().
            const commitsUrl = repo.commits_url.replace("{/sha}", "");
            const response = await fetch(commitsUrl);
            if (!response.ok) {
              throw new Error("Failed to fetch commit data");
            }
            const commitsData = await response.json();
            // This slice is used to get the 5 most recent commits.
            const lastCommits = commitsData.slice(0, 5).map((commit) => ({
              message: commit.commit.message,
              date: commit.commit.author.date,
            }));
            details[repo.name].lastCommits = lastCommits;
          } catch (error) {
            console.error(
              "An error occurred while fetching commit data:",
              error
            );
          }
        }
        // Update the state with repo details.
        setRepoDetails(details);
      }
    };

    // Call the fetchRepoDetails function when allReposData changes.
    fetchRepoDetails();
  }, [allReposData]); // Run this effect whenever allReposData changes.

  return (
    <div>
      <h2>Repositories</h2>
      <div className="repo-container">
        {loading ? (
          // Render a loading message while repository data is being fetched.
          <p>
            Loading repository data...{" "}
            <FontAwesomeIcon icon={faSpinner} pulse />
          </p>
        ) : allReposData ? (
          // If repository data is available, map through the data and render each repo.
          allReposData.map((repo, index) => (
            <div key={index}>
              <h3>
                {/* Render the repo name as a link to the GitHub repository. */}
                <a href={repo.html_url} target="_blank" rel="noreferrer">
                  {repo.name}
                </a>
              </h3>
              <p>Description: {repo.description}</p>
              <p>Creation Date: {repoDetails[repo.name]?.creationDate}</p>
              <p>Last 5 Commits:</p>
              <ul>
                {repoDetails[repo.name]?.lastCommits.map((commit, index) => (
                  <li key={index}>
                    <strong>Date:</strong> {commit.date}.{" "}
                    <strong>Message:</strong> {commit.message}
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          // If no repository data is found, display a message.
          <p>No repository data found.</p>
        )}
      </div>
    </div>
  );
}

export default Repositories;
