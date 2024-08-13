import React from "react";
import { Link } from "react-router-dom";
import FacebookLoginButton from "../components/FacebookLoginButton";
import UserProfile from "../components/UserProfile";
import PageSelector from "../components/PageSelector";
import InsightsDisplay from "../components/InsightsDisplay";

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
    <div className="App container mx-auto h-screen flex flex-col justify-between items-center">
      <div className="App container mx-auto h-screen flex items-center justify-center">
        {!user ? (
          <FacebookLoginButton login={login} />
        ) : (
          <div className="w-3/4 border rounded-lg px-20 py-10 shadow-xl">
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
      <footer className="w-full text-center p-4 border-t">
        <Link to="/privacy-policy" className="text-blue-500 underline">
          Privacy Policy
        </Link>
      </footer>
    </div>
  );
};

export default HomePage;
