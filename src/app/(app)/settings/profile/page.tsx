"use client";

import { useGetProfile } from "@/hooks/use-api-query";
import { BreadcrumbItem } from "../../_components/breadcrumb";
import { MainContainer } from "../../_components/main-container";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";

const BREADCRUMB_ITEMS: BreadcrumbItem[] = [
  { label: "Settings", href: "/settings" },
  { label: "Profile" },
];

export default function ProfilePage() {
  const { data: profile, isLoading } = useGetProfile();
  const router = useRouter();

  if (isLoading) {
    return (
      <MainContainer title="Profile" breadcrumbItems={BREADCRUMB_ITEMS}>
        <div>Loading...</div>
      </MainContainer>
    );
  }

  return (
    <MainContainer title="Profile" breadcrumbItems={BREADCRUMB_ITEMS}>
      <div className="grid gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Profile Information</CardTitle>
            <Button onClick={() => router.push("/settings/profile/edit")}>
              Edit Profile
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={profile?.avatar || ""} />
                  <AvatarFallback>
                    {profile?.first_name?.[0]}
                    {profile?.last_name?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-medium">
                    {profile?.first_name} {profile?.last_name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {profile?.email}
                  </p>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">First Name</p>
                    <p className="text-sm text-muted-foreground">
                      {profile?.first_name}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Last Name</p>
                    <p className="text-sm text-muted-foreground">
                      {profile?.last_name}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">
                    {profile?.email}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium">Email Verification</p>
                  <p className="text-sm text-muted-foreground">
                    {profile?.email_verified_at ? "Verified" : "Not verified"}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Created At</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(profile?.created_at || "").toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Updated At</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(profile?.updated_at || "").toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainContainer>
  );
}
