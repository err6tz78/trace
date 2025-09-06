import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Heart, MessageCircle, Share2, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface Comment {
  id: string;
  username: string;
  avatar: string;
  content: string;
  timestamp: string;
}

interface Post {
  id: string;
  username: string;
  avatar: string;
  image: string;
  description: string;
  timestamp: string;
  likes: number;
  comments: Comment[];
  challengeName: string;
  isLiked: boolean;
}

const SocialFeed = ({ posts = defaultPosts }: { posts?: Post[] }) => {
  const [feedPosts, setFeedPosts] = useState<Post[]>(posts);
  const [showComments, setShowComments] = useState<Record<string, boolean>>({});

  const handleLike = (postId: string) => {
    setFeedPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            isLiked: !post.isLiked,
          };
        }
        return post;
      }),
    );
  };

  const toggleComments = (postId: string) => {
    setShowComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="sticky top-0 z-10 p-4 bg-card border-b">
        <h2 className="text-xl font-bold">Social Feed</h2>
      </div>

      <div className="space-y-4 p-4">
        {feedPosts.map((post) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="overflow-hidden">
              <CardHeader className="p-4 pb-0">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Avatar>
                      <AvatarImage src={post.avatar} alt={post.username} />
                      <AvatarFallback>
                        {post.username.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{post.username}</p>
                      <p className="text-xs text-muted-foreground">
                        {post.timestamp}
                      </p>
                    </div>
                  </div>
                  <Badge variant="secondary">{post.challengeName}</Badge>
                </div>
              </CardHeader>

              <CardContent className="p-0 mt-4">
                <div className="relative aspect-square w-full">
                  <img
                    src={post.image}
                    alt="Challenge completion"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-4">
                  <p>{post.description}</p>
                </div>
              </CardContent>

              <CardFooter className="flex flex-col p-4 pt-0 space-y-4">
                <div className="flex justify-between items-center w-full">
                  <div className="flex space-x-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-0 h-auto"
                      onClick={() => handleLike(post.id)}
                    >
                      <Heart
                        className={`h-5 w-5 mr-1 ${post.isLiked ? "fill-red-500 text-red-500" : ""}`}
                      />
                      <span>{post.likes}</span>
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-0 h-auto"
                      onClick={() => toggleComments(post.id)}
                    >
                      <MessageCircle className="h-5 w-5 mr-1" />
                      <span>{post.comments.length}</span>
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-0 h-auto"
                      onClick={() => console.log(`Share post ${post.id}`)}
                    >
                      <Share2 className="h-5 w-5" />
                    </Button>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-0 h-auto"
                    onClick={() =>
                      console.log(`More options for post ${post.id}`)
                    }
                  >
                    <MoreHorizontal className="h-5 w-5" />
                  </Button>
                </div>

                {showComments[post.id] && (
                  <div className="w-full space-y-2 pt-2 border-t">
                    {post.comments.map((comment) => (
                      <div key={comment.id} className="flex space-x-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage
                            src={comment.avatar}
                            alt={comment.username}
                          />
                          <AvatarFallback>
                            {comment.username.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center">
                            <p className="text-sm font-medium">
                              {comment.username}
                            </p>
                            <span className="text-xs text-muted-foreground ml-2">
                              {comment.timestamp}
                            </span>
                          </div>
                          <p className="text-sm">{comment.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Default mock data
const defaultPosts: Post[] = [
  {
    id: "1",
    username: "alex_fitness",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
    description: "Completed today's 5k run challenge! 🏃‍♂️ Personal best time!",
    timestamp: "2 hours ago",
    likes: 24,
    isLiked: false,
    challengeName: "5K Run",
    comments: [
      {
        id: "c1",
        username: "runner_pro",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=runner",
        content: "Amazing time! What was your pace?",
        timestamp: "1 hour ago",
      },
      {
        id: "c2",
        username: "fitness_guru",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=fitness",
        content: "Keep it up! 💪",
        timestamp: "45 min ago",
      },
    ],
  },
  {
    id: "2",
    username: "meditation_master",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=meditation",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80",
    description:
      "Day 7 of the mindfulness challenge complete. Finding my inner peace. 🧘‍♀️",
    timestamp: "5 hours ago",
    likes: 42,
    isLiked: true,
    challengeName: "Mindfulness",
    comments: [
      {
        id: "c3",
        username: "zen_life",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=zen",
        content: "This challenge changed my life too!",
        timestamp: "3 hours ago",
      },
    ],
  },
  {
    id: "3",
    username: "healthy_eats",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=healthy",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80",
    description:
      "Made this colorful salad for the nutrition challenge! All organic ingredients. 🥗",
    timestamp: "1 day ago",
    likes: 56,
    isLiked: false,
    challengeName: "Healthy Eating",
    comments: [
      {
        id: "c4",
        username: "chef_mike",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=chef",
        content: "Looks delicious! Recipe please?",
        timestamp: "20 hours ago",
      },
      {
        id: "c5",
        username: "nutrition_coach",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=nutrition",
        content: "Perfect balance of nutrients!",
        timestamp: "18 hours ago",
      },
      {
        id: "c6",
        username: "vegan_life",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=vegan",
        content: "Is this fully vegan? Looks amazing!",
        timestamp: "12 hours ago",
      },
    ],
  },
];

export default SocialFeed;
