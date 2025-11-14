import { configureStore } from "@reduxjs/toolkit";
import fetchBuilderBannerPageInforeducer from "./slices/builderSlice/bannerPageSlice";
import fetchToolsAndEquimentsReducre from "./slices/builderSlice/toolsEquipmentSlice";

export const store = configureStore({
  reducer: {
    tools: fetchToolsAndEquimentsReducre,
    builderBanner: fetchBuilderBannerPageInforeducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
