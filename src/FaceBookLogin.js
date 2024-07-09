import React, { useState, useEffect } from "react";
import { FacebookLoginButton } from "react-social-login-buttons";

const FacebookLogin = () => {
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
          "public_profile,email,pages_show_list,pages_read_engagement,read_insights ",
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

  const fetchPageInsights = (pageId) => {
    const selectedPageData = pages.find((p) => p.id === pageId);
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
        `/${pageId}/insights?metric=${metrics}&since=${since}&until=${until}&access_token=${accessToken}`,
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
  };

  return (
    <div className="App container mx-auto h-screen flex items-center justify-center">
      {!user ? (
        <div className="border rounded-lg shadow-md py-16 px-5">
          <div className="mb-10 text-left">
            <h1 className="text-3xl font-semibold">
              Welcome to PageInsightPro
            </h1>
            <h2 className="text-2xl text-gray-600">Sign in to your account</h2>
          </div>
          <FacebookLoginButton onClick={login} />
        </div>
      ) : (
        <div className="">
          <div className="flex justify-between">
            <div>
              <h1 className="text-4xl font-semibold">Welcome, {user.name}</h1>
              <h2 className="text-xl text-gray-500">
                Unlock the Insights of Your Pages
              </h2>
            </div>
            <img
              className="rounded-full"
              src={user.picture.data.url}
              alt="Profile"
            />
          </div>

          <div className="m-4">
            <select
              onChange={(e) => setSelectedPage(e.target.value)}
              defaultValue=""
              className="px-4 py-2 mt-2 text-md text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
            >
              <option value="" className="text-md" disabled>
                Select a Page
              </option>
              {pages.map((page) => (
                <option key={page.id} value={page.id} className="text-md">
                  {page.name}
                </option>
              ))}
            </select>
            <button
              className="bg-blue-500 text-white px-2 py-2 rounded-md ml-10"
              onClick={() => fetchPageInsights(selectedPage)}
            >
              Get Insights
            </button>
          </div>

          {insights && (
            <div className="grid grid-cols-2 gap-4">
              {insights.map((insight, index) => (
                <div
                  key={index}
                  className="border border-blue-300 p-5 rounded-lg shadow-sm"
                >
                  <h3 className="text-lg font-semibold">{insight.title}</h3>
                  <p className="text-xl font-semibold">
                    {insight.values[0].value}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FacebookLogin;
