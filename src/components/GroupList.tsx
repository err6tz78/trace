import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Users, Activity } from "lucide-react";

interface GroupMember {
  id: string;
  name: string;
  avatar?: string;
}

interface Group {
  id: string;
  name: string;
  members: GroupMember[];
  lastActivity?: string;
  isActive?: boolean;
}

interface GroupListProps {
  groups?: Group[];
  onGroupSelect?: (groupId: string) => void;
  onCreateGroup?: () => void;
  onJoinGroup?: () => void;
}

const GroupList = ({
  groups = [
    {
      id: "1",
      name: "Fitness Buddies",
      members: [
        {
          id: "1",
          name: "Alex",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
        },
        {
          id: "2",
          name: "Jamie",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jamie",
        },
        {
          id: "3",
          name: "Taylor",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Taylor",
        },
      ],
      lastActivity: "2 hours ago",
      isActive: true,
    },
    {
      id: "2",
      name: "Weekend Warriors",
      members: [
        {
          id: "1",
          name: "Alex",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
        },
        {
          id: "4",
          name: "Jordan",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan",
        },
      ],
      lastActivity: "Yesterday",
    },
    {
      id: "3",
      name: "Book Club",
      members: [
        {
          id: "5",
          name: "Casey",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Casey",
        },
        {
          id: "6",
          name: "Riley",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Riley",
        },
        {
          id: "7",
          name: "Quinn",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Quinn",
        },
        {
          id: "8",
          name: "Morgan",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Morgan",
        },
      ],
      lastActivity: "3 days ago",
    },
  ],
  onGroupSelect = (groupId: string) => {
    console.log(`Selected group: ${groupId}`);
  },
  onCreateGroup = () => {
    console.log("Create new group");
  },
  onJoinGroup = () => {
    console.log("Join existing group");
  },
}: GroupListProps) => {
  return (
    <Card className="w-full max-w-md mx-auto dark-card">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-bold">My Groups</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onJoinGroup}>
              Join
            </Button>
            <Button
              size="sm"
              onClick={onCreateGroup}
              className="gradient-button"
            >
              <Plus className="h-4 w-4 mr-1" /> Create
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[220px] pr-4">
          <div className="space-y-3">
            {groups.map((group) => (
              <div
                key={group.id}
                className="p-3 rounded-lg border border-border hover:bg-accent/50 cursor-pointer transition-colors bg-card/50"
                onClick={() => onGroupSelect(group.id)}
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Users className="h-5 w-5 text-primary" />
                      {group.isActive && (
                        <span className="absolute -top-1 -right-1 h-2 w-2 bg-green-500 rounded-full" />
                      )}
                    </div>
                    <h3 className="font-medium">{group.name}</h3>
                  </div>
                  {group.isActive && <Badge variant="secondary">Active</Badge>}
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex -space-x-2">
                    {group.members.slice(0, 4).map((member) => (
                      <Avatar
                        key={member.id}
                        className="border-2 border-card h-7 w-7"
                      >
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    ))}
                    {group.members.length > 4 && (
                      <div className="h-7 w-7 rounded-full bg-muted flex items-center justify-center text-xs border-2 border-card">
                        +{group.members.length - 4}
                      </div>
                    )}
                  </div>

                  {group.lastActivity && (
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Activity className="h-3 w-3 mr-1" />
                      {group.lastActivity}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default GroupList;
