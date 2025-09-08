import React, { useState } from "react";
import {
  Home as HomeIcon,
  Users,
  Calendar,
  Bell,
  User,
  Moon,
  Sun,
  ArrowLeft,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import DailyChallenge from "./DailyChallenge";
import GroupList from "./GroupList";
import SocialFeed from "./SocialFeed";
import CreateGroupDialog from "./CreateGroupDialog";

const Home = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [isDarkMode, setIsDarkMode] = useState(true); // Dark mode as default
  const [showCreateGroup, setShowCreateGroup] = useState(false);

  // Set dark mode as default on component mount
  React.useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    }
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

  const handleCreateGroup = (groupData: {
    name: string;
    description: string;
  }) => {
    console.log("Creating group:", groupData);
    // Here you would typically call an API to create the group
  };

  const renderHeader = () => {
    if (activeTab === "home") {
      return (
        <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-md border-b border-border/50 px-6 py-4 flex justify-between items-center">
          <div>
            <p className="text-sm text-muted-foreground">Hello,</p>
            <h1 className="text-xl font-bold text-foreground">Sherman</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNotifications}
              className="rounded-full bg-muted/50 hover:bg-muted border border-border/30"
            >
              <Bell size={18} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => console.log("Search")}
              className="rounded-full bg-foreground text-background hover:bg-foreground/90"
            >
              <Search size={18} />
            </Button>
          </div>
        </header>
      );
    }

    return (
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-md border-b border-border/50 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setActiveTab("home")}
            className="rounded-full gradient-button"
          >
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-xl font-bold text-foreground">
            {activeTab === "challenges" && "Daily Activities"}
            {activeTab === "groups" && "Your Groups"}
            {activeTab === "profile" && "Profile"}
          </h1>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            className="rounded-full"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
        </div>
      </header>
    );
  };

  return (
    <div className="app-container">
      {renderHeader()}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        {activeTab === "home" && (
          <>
            {/* Daily Goals Section */}
            <section>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Daily Goals</h2>
              </div>
              <DailyChallenge />
            </section>

            {/* Top Routines Section */}
            <section>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Top Routines</h2>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-card border border-border">
                  <div className="w-10 h-10 rounded-full gradient-button flex items-center justify-center">
                    <span className="text-white text-lg">▶</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">How to overcome anxiety</h3>
                    <p className="text-sm text-muted-foreground">
                      Daniel Polivex
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-card border border-border">
                  <div className="w-10 h-10 rounded-full gradient-button flex items-center justify-center">
                    <span className="text-white text-lg">▶</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">How to be positive</h3>
                    <p className="text-sm text-muted-foreground">
                      Ralph Edwards
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {activeTab === "challenges" && (
          <section>
            <div className="space-y-4">
              <DailyChallenge
                title="Morning Run"
                description="Complete a 5km morning run to boost your energy for the day"
                difficulty="medium"
                status="new"
                timeEstimate="30 mins"
              />
              <DailyChallenge
                title="Healthy Breakfast"
                description="Prepare and eat a nutritious breakfast with fruits and proteins"
                difficulty="easy"
                status="in-progress"
                timeEstimate="15 mins"
              />
              <DailyChallenge
                title="Team Workout"
                description="Join your group for an intense workout session"
                difficulty="hard"
                status="new"
                timeEstimate="45 mins"
                groupChallenge={true}
              />
            </div>
          </section>
        )}

        {activeTab === "groups" && (
          <section>
            <GroupList onCreateGroup={() => setShowCreateGroup(true)} />
          </section>
        )}

        {activeTab === "profile" && (
          <section>
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-24 h-24 rounded-full gradient-button mx-auto mb-4 flex items-center justify-center">
                  <User size={40} className="text-white" />
                </div>
                <h2 className="text-xl font-bold">Sherman</h2>
                <p className="text-muted-foreground">Challenge Enthusiast</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 rounded-lg bg-card border border-border">
                  <div className="text-2xl font-bold text-primary">47</div>
                  <div className="text-sm text-muted-foreground">
                    Challenges
                  </div>
                </div>
                <div className="text-center p-4 rounded-lg bg-card border border-border">
                  <div className="text-2xl font-bold text-primary">12</div>
                  <div className="text-sm text-muted-foreground">Groups</div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <CreateGroupDialog
        open={showCreateGroup}
        onOpenChange={setShowCreateGroup}
        onCreateGroup={handleCreateGroup}
      />

      {/* Bottom Navigation */}
      <nav className="sticky bottom-0 bg-background/95 backdrop-blur-md border-t border-border/50 px-6 py-3 safe-area-pb">
        <div className="flex justify-around items-center max-w-md mx-auto">
          <button
            className={`nav-item ${activeTab === "home" ? "active" : ""}`}
            onClick={() => setActiveTab("home")}
          >
            <HomeIcon size={20} />
            <span className="text-xs mt-1 font-medium">Home</span>
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
