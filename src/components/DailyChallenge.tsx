import React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock, Star, Trophy, Users } from "lucide-react";

interface DailyChallengeProps {
  title?: string;
  description?: string;
  difficulty?: "easy" | "medium" | "hard";
  status?: "new" | "in-progress" | "completed";
  timeEstimate?: string;
  groupChallenge?: boolean;
  onStart?: () => void;
  onView?: () => void;
}

const DailyChallenge = ({
  title = "Meditation",
  description = "30 Min.",
  difficulty = "easy",
  status = "new",
  timeEstimate = "30 mins",
  groupChallenge = false,
  onStart = () => console.log("Challenge started"),
  onView = () => console.log("View challenge details"),
}: DailyChallengeProps) => {
  const difficultyColors = {
    easy: "bg-green-500/10 text-green-600 dark:text-green-400",
    medium: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
    hard: "bg-red-500/10 text-red-600 dark:text-red-400",
  };

  const statusColors = {
    new: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    "in-progress": "bg-purple-500/10 text-purple-600 dark:text-purple-400",
    completed: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  };

  const statusText = {
    new: "New",
    "in-progress": "In Progress",
    completed: "Completed",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <div className="gradient-card rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-white/80 text-sm mb-1">Daily Goals</p>
              <h3 className="text-xl font-bold">{title}</h3>
              <p className="text-white/90">{description}</p>
            </div>
            <div className="relative w-16 h-16">
              <svg className="w-16 h-16 progress-ring" viewBox="0 0 36 36">
                <path
                  className="text-white/20"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="transparent"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-white"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeDasharray="72, 100"
                  strokeLinecap="round"
                  fill="transparent"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold">72%</span>
              </div>
            </div>
          </div>

          <div className="bg-black/20 rounded-xl p-4 mb-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-white/80 text-sm">Total Calories</p>
                <p className="text-xl font-bold">546 kcal</p>
              </div>
              <div className="text-right">
                <p className="text-white/80 text-sm">Total Distance</p>
                <p className="text-xl font-bold">3.5 km</p>
              </div>
            </div>
          </div>

          {status !== "completed" && (
            <Button
              onClick={onStart}
              className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30"
              variant="outline"
            >
              {status === "in-progress"
                ? "Continue Challenge"
                : "Start Challenge"}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default DailyChallenge;
