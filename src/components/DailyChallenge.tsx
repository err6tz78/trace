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
  title = "Morning Meditation",
  description = "Start your day with a 10-minute meditation session to improve focus and reduce stress.",
  difficulty = "easy",
  status = "new",
  timeEstimate = "10 mins",
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
      <Card className="overflow-hidden">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-xl font-bold">{title}</CardTitle>
            <Badge variant="outline" className={statusColors[status]}>
              {statusText[status]}
            </Badge>
          </div>
          <div className="flex gap-2 mt-1">
            <Badge variant="outline" className={difficultyColors[difficulty]}>
              <Star className="h-3 w-3 mr-1" />
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </Badge>
            <Badge variant="outline">
              <Clock className="h-3 w-3 mr-1" />
              {timeEstimate}
            </Badge>
            {groupChallenge && (
              <Badge
                variant="outline"
                className="bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
              >
                <Users className="h-3 w-3 mr-1" />
                Group
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-sm text-muted-foreground">
            {description}
          </CardDescription>
        </CardContent>
        <CardFooter className="flex justify-between pt-2">
          {status === "completed" ? (
            <div className="flex items-center text-emerald-600 dark:text-emerald-400">
              <Trophy className="h-4 w-4 mr-1" />
              <span className="text-sm font-medium">Challenge completed!</span>
            </div>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={onView}
              className="text-sm"
            >
              View Details
            </Button>
          )}
          {status !== "completed" && (
            <Button onClick={onStart} size="sm" className="gap-1">
              {status === "in-progress" ? "Continue" : "Start Challenge"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default DailyChallenge;
