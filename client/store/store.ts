import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/authSlice/registrationSlice";
import loginUserReducer from "./slices/authSlice/loginSlice";
import forgotPasswordReducer from "./slices/authSlice/forgotSlice";
import fetchToolsAndEquimentsReducre from "./slices/builderSlice/toolsEquipmentSlice";
import fetchBuilderBannerPageInforeducer from "./slices/builderSlice/bannerPageSlice";
import testimonialsReducer from "./slices/testimonialsSlice";
import whyToChooseUsReducer from "./slices/whyToChooseUsSlice";

export const store = configureStore({
  reducer: {
    registerUser: userReducer,
    loginUser: loginUserReducer,
    forgotPassword: forgotPasswordReducer,
    tools: fetchToolsAndEquimentsReducre,
    builderBanner: fetchBuilderBannerPageInforeducer,
    testimonials: testimonialsReducer,
    whyToChooseUs: whyToChooseUsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
