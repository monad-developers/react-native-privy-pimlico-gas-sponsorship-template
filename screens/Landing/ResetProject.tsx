import { Collapsible } from "@/components/Collapsible";
import CollapsibleContentContainer from "@/components/CollapsibleContentContainer";
import { ThemedText } from "@/components/ThemedText";

export default function ResetProject() {
    return <Collapsible title="Reset Project">
    <CollapsibleContentContainer>
      <ThemedText>
        You can use the script in the scripts folder to reset the project to a
        blank state.
      </ThemedText>
      <ThemedText>
        This will remove the Privy specific code as well!
      </ThemedText>
      <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText>
    </CollapsibleContentContainer>
  </Collapsible>
}