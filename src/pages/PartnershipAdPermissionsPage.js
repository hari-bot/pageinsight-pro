import React, { useState, useEffect, useCallback } from "react";
import { ChevronDown, RefreshCw } from "lucide-react";
import NavBar from "../components/Navbar";

const PartnershipAdPermissionsPage = ({ igPages, setSelectedIGPage }) => {
  const [selectedPage, setSelectedPage] = useState(null);
  const [creatorUsername, setCreatorUsername] = useState("");
  const [existingPermissions, setExistingPermissions] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handlePageChange = (e) => {
    const selected = igPages.find((page) => page.id === e.target.value);
    setSelectedPage(selected);
    setSelectedIGPage(selected);
  };

  const fetchExistingPermissions = useCallback(() => {
    if (!selectedPage) return;

    setIsRefreshing(true);
    window.FB.api(
      `/${selectedPage.id}/branded_content_ad_permissions`,
      (response) => {
        if (response && !response.error) {
          setExistingPermissions(response.data);
          console.log("Existing Permissions:", response);
        } else {
          console.error("Error fetching existing permissions:", response.error);
        }
        setIsRefreshing(false);
      }
    );
  }, [selectedPage]); // Only re-run when selectedPage changes

  const requestPartnershipPermission = () => {
    if (!selectedPage || !creatorUsername) {
      alert("Select a page and enter a creator's username!");
      return;
    }

    window.FB.api(
      `/${selectedPage.id}/branded_content_ad_permissions`,
      "POST",
      {
        creator_instagram_username: creatorUsername,
      },
      (response) => {
        if (response && response.id) {
          alert(`Permission request sent to ${creatorUsername}!`);
          fetchExistingPermissions();
        } else {
          console.error("Error requesting permission:", response.error);
        }
      }
    );
  };

  const revokePermission = (creatorId) => {
    window.FB.api(
      `/${selectedPage.id}/branded_content_ad_permissions`,
      "POST",
      {
        creator_instagram_account: creatorId,
        revoke: true,
        access_token: "<ACCESS_TOKEN>",
      },
      (response) => {
        if (response && response.id) {
          alert("Permission revoked successfully!");
          fetchExistingPermissions();
        } else {
          console.error("Error revoking permission:", response.error);
        }
      }
    );
  };

  useEffect(() => {
    if (selectedPage) {
      fetchExistingPermissions();
    }
  }, [selectedPage, fetchExistingPermissions]); // Added fetchExistingPermissions to dependency array

  return (
    <div className="bg-gray-100 min-h-screen">
      <NavBar />
      <div className="container mx-auto p-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Manage Partnership Ad Permissions
        </h1>

        <div className="mb-8">
          <label
            htmlFor="igPage"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Select Instagram Page
          </label>
          <div className="relative">
            <select
              id="igPage"
              onChange={handlePageChange}
              className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select a page</option>
              {igPages.map((page) => (
                <option key={page.id} value={page.id}>
                  {page.username}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Request New Permission
          </h2>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <input
              type="text"
              value={creatorUsername}
              onChange={(e) => setCreatorUsername(e.target.value)}
              className="flex-grow bg-white border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter creator's username"
            />
            <button
              onClick={requestPartnershipPermission}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
            >
              Request Permission
            </button>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              Existing Permissions
            </h2>
            <button
              onClick={fetchExistingPermissions}
              disabled={isRefreshing || !selectedPage}
              className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw
                className={`h-5 w-5 mr-2 ${isRefreshing ? "animate-spin" : ""}`}
              />
              Refresh
            </button>
          </div>
          {existingPermissions.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {existingPermissions.map((permission) => (
                <li
                  key={permission.id}
                  className="py-4 flex items-center justify-between"
                >
                  <div>
                    <a
                      href={`https://www.instagram.com/${permission.creator_username}/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-black hover:underline hover:to-blue-600"
                    >
                      {permission.creator_username}
                    </a>
                    <span className="ml-2 px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {permission.permission_status}
                    </span>
                  </div>
                  {permission.permission_status === "APPROVED" && (
                    <button
                      onClick={() => revokePermission(permission.creator_id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors duration-200"
                    >
                      Revoke
                    </button>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center py-8 text-lg">
              No existing permissions found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PartnershipAdPermissionsPage;
