import React from "react";
import Text from "@/components/ui/Text";
import { Link } from "expo-router";
import SafeArea from "@/components/ui/SafeArea";

export default function ProfilePage() {
  return (
    <SafeArea>
      <Text>ProfilePage</Text>
      <Link href={"/test"}>
        <Text>Go to Testing Page</Text>
      </Link>
    </SafeArea>
  );
}
