import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import Register from "pages/register";
import SearchResults from "pages/search-results";
import HomeFeed from "pages/home-feed";
import UserDashboard from "pages/user-dashboard";
import PoliticianProfile from "pages/politician-profile";
import IssueDetail from "pages/issue-detail";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<HomeFeed />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/home-feed" element={<HomeFeed />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/politician-profile" element={<PoliticianProfile />} />
        <Route path="/issue-detail" element={<IssueDetail />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;