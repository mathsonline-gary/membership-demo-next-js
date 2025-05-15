"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Smartphone, Laptop, Tablet } from "lucide-react";

type DeviceItem = {
  id: number;
  name: string;
  type: string;
  lastActive: string;
};

const DEVICE_ITEMS: DeviceItem[] = [
  {
    id: 1,
    name: "MacBook Pro",
    type: "laptop",
    lastActive: "2 hours ago",
  },
  {
    id: 2,
    name: "iPhone 13",
    type: "smartphone",
    lastActive: "1 day ago",
  },
  {
    id: 3,
    name: "iPad Pro",
    type: "tablet",
    lastActive: "3 days ago",
  },
];

const DeviceItem = ({ name, type, lastActive, id }: DeviceItem) => {
  const handleRevokeAccess = () => {
    console.log("Revoking access for device", id);
  };

  return (
    <div className="rounded-lg border p-4">
      <div className="flex items-center justify-between">
        <div className="grid gap-1">
          <p className="font-medium flex items-center gap-2">
            {type === "laptop" && <Laptop className="h-4 w-4" />}
            {type === "smartphone" && <Smartphone className="h-4 w-4" />}
            {type === "tablet" && <Tablet className="h-4 w-4" />}
            {name}
          </p>
          <p className="text-sm text-muted-foreground">
            Last active: {lastActive}
          </p>
        </div>
        <Button size="sm" onClick={handleRevokeAccess}>
          Revoke Access
        </Button>
      </div>
    </div>
  );
};

export function DevicesTab() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Smartphone className="h-5 w-5 text-muted-foreground" />
          <CardTitle>Device Management</CardTitle>
        </div>
        <CardDescription>
          Manage devices that have access to your account
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {DEVICE_ITEMS.map((device) => (
          <DeviceItem key={device.id} {...device} />
        ))}
      </CardContent>
    </Card>
  );
}
