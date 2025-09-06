import React, { useState } from "react";
import {
  Home as HomeIcon,
  Users,
  Calendar,
  Bell,
  User,
  Moon,
  Sun,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import DailyChallenge from "./DailyChallenge";
import GroupList from "./GroupList";
import SocialFeed from "./SocialFeed";

const Home = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const handleViewAllChallenges = () => {
    console.log("Navigate to all challenges");
    setActiveTab("challenges");
  };

  const handleViewAllGroups = () => {
    console.log("Navigate to all groups");
    setActiveTab("groups");
  };

  const handleRefreshFeed = () => {
    console.log("Refreshing social feed");
    window.location.reload();
  };

  const handleNotifications = () => {
    console.log("Open notifications");
  };

  const handleProfile = () => {
    console.log("Open profile");
    setActiveTab("profile");
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-card border-b px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold text-primary">Challenges</h1>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            className="rounded-full"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleNotifications}
            className="rounded-full"
          >
            <Bell size={20} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleProfile}
            className="rounded-full bg-primary text-primary-foreground"
          >
            <User size={16} />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        {/* Daily Challenge Section */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Today's Challenge</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleViewAllChallenges}
              className="text-primary"
            >
              View All
            </Button>
          </div>
          <DailyChallenge />
        </section>

        {/* Groups Section */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Your Groups</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleViewAllGroups}
              className="text-primary"
            >
              View All
            </Button>
          </div>
          <GroupList />
        </section>

        {/* Social Feed Section */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Social Feed</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRefreshFeed}
              className="text-primary"
            >
              Refresh
            </Button>
          </div>
          <SocialFeed />
        </section>
      </main>

      {/* Bottom Navigation */}
      <nav className="sticky bottom-0 bg-card border-t px-4 py-2">
        <div className="flex justify-around items-center">
          <button
            className={`nav-item ${activeTab === "home" ? "active" : ""}`}
            onClick={() => setActiveTab("home")}
          >
            <HomeIcon size={20} />
            <span className="text-xs mt-1">Home</span>
          </button>
          <button
            className={`nav-item ${activeTab === "challenges" ? "active" : ""}`}
            onClick={() => setActiveTab("challenges")}
          >
            <Calendar size={20} />
            <span className="text-xs mt-1">Challenges</span>
          </button>
          <button
            className={`nav-item ${activeTab === "groups" ? "active" : ""}`}
            onClick={() => setActiveTab("groups")}
          >
            <Users size={20} />
            <span className="text-xs mt-1">Groups</span>
          </button>
          <button
            className={`nav-item ${activeTab === "profile" ? "active" : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            <User size={20} />
            <span className="text-xs mt-1">Profile</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Home;
