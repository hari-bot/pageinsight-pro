import React, { useState, useEffect } from "react";
import HomePage from "./pages/HomePage";
import { Route, Routes } from "react-router-dom";
import PrivacyPolicy from "./components/PrivacyPolicy";
import IGPagesAnalytics from "./pages/IGPagesAnalytics";
import PartnershipAdPermissionsPage from "./pages/PartnershipAdPermissionsPage";
import BoostAccessManagementPage from "./pages/BoostAccessManagementPage";
import CreatePostWithMentionsPage from "./pages/CreatePostWithMentionsPage";

const App = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [pages, setPages] = useState([]);
  const [igPages, setIGPages] = useState([]);
  const [selectedIGPage, setSelectedIGPage] = useState(null);
  const [igInsights, setIGInsights] = useState(null);
  const [engagementInsights, setEngagementInsights] = useState(null);
  const [selectedPage, setSelectedPage] = useState(null);
  const [insights, setInsights] = useState(null);
  const [timePeriod, setTimePeriod] = useState(28);

  useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: "933131578200536",
        cookie: true,
        xfbml: true,
        version: "v21.0",
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
          "public_profile,email,pages_show_list,pages_read_engagement,read_insights,instagram_basic,instagram_manage_insights,instagram_branded_content_creator,instagram_branded_content_ads_brand,instagram_branded_content_brand,pages_manage_posts",
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
        fetchIGPages(); // Fetch IG pages
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
          "page_follows,page_post_engagements,page_impressions,page_actions_post_reactions_like_total,";

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

  const fetchIGPages = () => {
    window.FB.api("/me/accounts", (pagesData) => {
      if (pagesData.data) {
        const igPageRequests = pagesData.data.map((page) =>
          window.FB.api(
            `/${page.id}?fields=connected_instagram_account{username,followers_count,profile_picture_url,biography,media_count}`,
            (igData) => {
              if (igData.connected_instagram_account) {
                setIGPages((prevIGPages) => [
                  ...prevIGPages,
                  igData.connected_instagram_account,
                ]);
              }
            }
          )
        );
        Promise.all(igPageRequests).catch((error) =>
          console.error("Error fetching IG pages:", error)
        );
      }
    });
  };

  const fetchIGPageInsights = () => {
    if (!selectedIGPage) {
      alert("Select an Instagram page!");
      return;
    }

    const metrics = "reach"; // Fetching the reach metric
    const engagementMetrics = "likes,comments,shares,saves";

    // Fetch reach metric for the page
    window.FB.api(
      `/${selectedIGPage.id}/insights?metric=${metrics}&period=day`,
      (insightsData) => {
        if (insightsData && !insightsData.error) {
          setIGInsights(insightsData.data);
          console.log(insightsData.data); // Log to check if the reach data is fetched
        } else {
          console.error("Error fetching IG insights:", insightsData.error);
        }
      }
    );

    // Fetch engagement metrics
    window.FB.api(
      `/${selectedIGPage.id}/insights?metric=${engagementMetrics}&period=day&metric_type=total_value`,
      (engagementInsightsData) => {
        if (engagementInsightsData && !engagementInsightsData.error) {
          setEngagementInsights(engagementInsightsData.data);
          console.log(engagementInsightsData.data); // Log engagement insights
        } else {
          console.error(
            "Error fetching IG engagement insights:",
            engagementInsightsData.error
          );
        }
      }
    );
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <HomePage
            user={user}
            login={login}
            pages={pages}
            setSelectedPage={setSelectedPage}
            fetchPageInsights={fetchPageInsights}
            setTimePeriod={setTimePeriod}
            insights={insights}
            timePeriod={timePeriod}
          />
        }
      />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route
        path="/ig-analytics"
        element={
          <IGPagesAnalytics
            igPages={igPages}
            setSelectedIGPage={setSelectedIGPage}
            fetchIGPageInsights={fetchIGPageInsights}
            igInsights={igInsights}
            engagementInsights={engagementInsights}
          />
        }
      />
      <Route
        path="/partnership-ads"
        element={
          <PartnershipAdPermissionsPage
            igPages={igPages}
            setSelectedIGPage={setSelectedIGPage}
          />
        }
      />
      <Route
        path="/boost-acess"
        element={
          <BoostAccessManagementPage
            igPages={igPages}
            setSelectedIGPage={setSelectedIGPage}
          />
        }
      />
      <Route
        path="/create-post"
        element={
          <CreatePostWithMentionsPage
            pages={pages}
            setSelectedIGPage={setSelectedIGPage}
          />
        }
      />
    </Routes>
  );
};

export default App;
