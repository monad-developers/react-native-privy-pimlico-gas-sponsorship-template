import ErrorScreen from "@/components/ui/ErrorScreen";
import FullScreenLoader from "@/components/ui/FullScreenLoader";
import { AuthBoundary } from "@privy-io/expo";
import { Redirect, Slot } from "expo-router";
import React from "react";

export default function AppLayout() {
    return (
        <AuthBoundary
            loading={<FullScreenLoader />}
            error={(error) => <ErrorScreen error={error} />}
            unauthenticated={<Redirect href="/sign-in" />}
        >
            <Slot />
        </AuthBoundary>
    );
}
