import React, { useState, useEffect } from "react";
import FacebookLoginButton from "./components/FacebookLoginButton";
import UserProfile from "./components/UserProfile";
import PageSelector from "./components/PageSelector";
import InsightsDisplay from "./components/InsightsDisplay";

const App = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState(null);
  const [insights, setInsights] = useState(null);
  const [timePeriod, setTimePeriod] = useState(28);

  useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: "1024624052426527",
        cookie: true,
        xfbml: true,
        version: "v12.0",
      });

      window.FB.AppEvents.logPageView();

      window.FB.getLoginStatus((response) => {
        if (response.status === "connected") {
          fetchUserProfile();
        }
      });
    };

    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");

    // eslint-disable-next-line
  }, []);

  const login = () => {
    window.FB.login(
      (response) => {
        if (response.authResponse) {
          fetchUserProfile();
        }
      },
      {
        scope:
          "public_profile,email,pages_show_list,pages_read_engagement,read_insights",
      }
    );
  };

  const fetchUserProfile = () => {
    window.FB.api(
      "/me",
      { fields: "id,name,picture.width(180).height(180)" },
      (userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        fetchUserPages();
      }
    );
  };

  const fetchUserPages = () => {
    window.FB.api("/me/accounts", (pagesData) => {
      setPages(pagesData.data);
    });
  };

  const fetchPageInsights = () => {
    if (!selectedPage) alert("Select a page !!!");
    if (selectedPage) {
      const selectedPageData = pages.find((p) => p.id === selectedPage);
      if (selectedPageData && selectedPageData.access_token) {
        const accessToken = selectedPageData.access_token;
        const metrics =
          "page_follows,page_post_engagements,page_impressions,page_actions_post_reactions_like_total";

        const today = new Date();
        today.setHours(23, 59, 59, 999);
        const until = Math.floor(today.getTime() / 1000);

        const pastDays = new Date();
        pastDays.setDate(today.getDate() - timePeriod);
        pastDays.setHours(0, 0, 0, 0);
        const since = Math.floor(pastDays.getTime() / 1000);

        window.FB.api(
          `/${selectedPage}/insights?metric=${metrics}&since=${since}&until=${until}&period=total_over_range&access_token=${accessToken}`,
          (insightsData) => {
            if (insightsData && !insightsData.error) {
              setInsights(insightsData.data);
              console.log(insightsData.data);
            } else {
              console.error("Error fetching insights:", insightsData.error);
            }
          }
        );
      } else {
        console.error("Access token not found for the selected page.");
      }
    }
  };

  return (
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
  );
};

export default App;
