import React from "react";
import { Link } from "react-router-dom";
import FacebookLoginButton from "../components/FacebookLoginButton";
import UserProfile from "../components/UserProfile";
import PageSelector from "../components/PageSelector";
import InsightsDisplay from "../components/InsightsDisplay";
import NavBar from "../components/Navbar";

const HomePage = ({
  user,
  login,
  pages,
  setSelectedPage,
  fetchPageInsights,
  setTimePeriod,
  insights,
  timePeriod,
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <NavBar />
      <div className="flex-grow container mx-auto px-4 py-8">
        {!user ? (
          <div className="flex justify-center items-center h-full">
            <FacebookLoginButton login={login} />
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-xl p-8">
            <UserProfile user={user} />
            <PageSelector
              pages={pages}
              setSelectedPage={setSelectedPage}
              fetchPageInsights={fetchPageInsights}
              setTimePeriod={setTimePeriod}
            />
            {insights && (
              <InsightsDisplay insights={insights} timePeriod={timePeriod} />
            )}
          </div>
        )}
      </div>
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          <Link to="/privacy-policy" className="hover:underline">
            Privacy Policy
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
