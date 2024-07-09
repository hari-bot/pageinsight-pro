import React, { useState, useEffect } from "react";
import FacebookLoginButton from "./components/FacebookLoginButton";
import UserProfile from "./components/UserProfile";
import PageSelector from "./components/PageSelector";
import InsightsDisplay from "./components/InsightsDisplay";

const App = () => {
  const [user, setUser] = useState(null);
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState(null);
  const [insights, setInsights] = useState(null);

  useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: "1024624052426527",
        cookie: true,
        xfbml: true,
        version: "v12.0",
      });

      window.FB.AppEvents.logPageView();
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
      { fields: "id,name,picture.width(150).height(150)" },
      (userData) => {
        setUser(userData);
        fetchUserPages();
      }
    );
  };

  const fetchUserPages = () => {
    window.FB.api("/me/accounts", (pagesData) => {
      setPages(pagesData.data);
      console.log(pagesData.data);
    });
  };

  const fetchPageInsights = () => {
    if (!selectedPage) alert("Select a page !!!");
    if (selectedPage) {
      const selectedPageData = pages.find((p) => p.id === selectedPage);
      if (selectedPageData && selectedPageData.access_token) {
        const accessToken = selectedPageData.access_token;
        const metrics =
          "page_follows,page_impressions,page_actions_post_reactions_like_total,page_post_engagements";

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        yesterday.setHours(0, 0, 0, 0);
        const since = Math.floor(yesterday.getTime() / 1000);

        const today = new Date();
        today.setHours(23, 59, 59, 999); // End of today
        const until = Math.floor(today.getTime() / 1000);

        window.FB.api(
          `/${selectedPage}/insights?metric=${metrics}&since=${since}&until=${until}&access_token=${accessToken}`,
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
        <div className="">
          <UserProfile user={user} />
          <PageSelector
            pages={pages}
            setSelectedPage={setSelectedPage}
            fetchPageInsights={fetchPageInsights}
          />
          {insights && <InsightsDisplay insights={insights} />}
        </div>
      )}
    </div>
  );
};

export default App;
