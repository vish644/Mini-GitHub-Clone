import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar";

const Dashboard = () => {
  // states
  const [repositories, setRepositories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestedRepositories, setSuggestedRepositories] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    const fetchRepositories = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/repo/user/${userId}`,
        );
        setRepositories(res.data || []);
      } catch (error) {
        console.log("Error while fetching repositories:", error);
      }
    };

    const fetchSuggestedRepositories = async () => {
      try {
        const res = await axios.get("http://localhost:3000/repo/all");
        setSuggestedRepositories(res?.data?.repositories || []);
        console.log("Suggested repositories:", suggestedRepositories);
      } catch (error) {
        console.log("Error while fetching repositories:", error);
      }
    };

    fetchRepositories();
    fetchSuggestedRepositories();
  }, []);

  useEffect(() => {
    if (searchQuery === "") {
      setSearchResults(repositories);
    } else {
      const filteredRepo = repositories.filter((repo) =>
        repo.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );

      setSearchResults(filteredRepo);
    }
  }, [searchQuery, repositories]);

  return (
    <>
      <Navbar />
      <section className="flex flex-row items-center justify-between gap-20">
        <aside>
          <h3>Suggested Repositories</h3>
          {suggestedRepositories.map((row) => {
            return (
              <div key={row._id}>
                <h4>{row.name}</h4>
                <h4>{row.description}</h4>
              </div>
            );
          })}
        </aside>
        <main>
          <h3>Your Repositories</h3>
          <div>
            <input
              type="text"
              value={searchQuery}
              placeholder="Search..."
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-2"
            />
          </div>
          {repositories.map((row) => {
            return (
              <div key={row._id}>
                <h4>{row.name}</h4>
                <h4>{row.description}</h4>
              </div>
            );
          })}
        </main>
        <aside>
          <h3>Upcoming Events</h3>
          <ul>
            <li>
              <p>Tech Conference - Dec 15</p>
            </li>
            <li>
              <p>Tech Conference - Dec 15</p>
            </li>
            <li>
              <p>Tech Conference - Dec 15</p>
            </li>
          </ul>
        </aside>
      </section>
    </>
  );
};

export default Dashboard;
