import ReceiveSheet from "@/components/sheets/ReceiveSheet";
import SendSheet from "@/components/sheets/SendSheet";
import SignSheet from "@/components/sheets/SignSheet";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import React, { useCallback } from "react";

export default function BottomSheets({
    sheetType,
    setSheetType,
    bottomSheetRef,
  }: {
    sheetType: "send" | "receive" | "sign" | null;
    setSheetType: (type: "send" | "receive" | "sign" | null) => void;
    bottomSheetRef: React.RefObject<BottomSheet | null>;
  }) {
    const snapPoints = ["90%"];
  
    const handleClose = useCallback(() => {
      setSheetType(null);
      bottomSheetRef.current?.close();
    }, []);
  
    return (
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose
        handleStyle={{ display: "none" }}
        backgroundStyle={{ backgroundColor: "#fff" }}
        backdropComponent={BottomSheetBackdrop}
        onClose={handleClose}
      >
        {sheetType === "send" && <SendSheet />}
        {sheetType === "receive" && <ReceiveSheet />}
        {sheetType === "sign" && <SignSheet />}
      </BottomSheet>
    );
  }