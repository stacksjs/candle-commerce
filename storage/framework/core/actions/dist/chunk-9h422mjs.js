// @bun
import"./chunk-eb689h23.js";
import {
  route
} from "./chunk-e1py21ak.js";
import"./chunk-h3h7cvw1.js";
import"./chunk-3rkn8egm.js";
import"./chunk-1yw79y36.js";
import"./chunk-z7g8sgtg.js";
import"./chunk-0be2fzx4.js";
import"./chunk-1n9mxrp7.js";
import"./chunk-zzerxbrm.js";
import"./chunk-geb98aw8.js";
import"./chunk-p8vym9ay.js";
import"./chunk-0rra9d59.js";
import"./chunk-zpek37sa.js";
import"./chunk-rea8cd7n.js";
import"./chunk-dexqv5xb.js";
import"./chunk-kxsrvkd8.js";
import"./chunk-389b9wtx.js";
import"./chunk-147kr0ac.js";
import"./chunk-jycndeyj.js";
import"./chunk-1j66gxht.js";

// ../../../../routes/api.ts
route.get("/foo/bar/{id}", () => "hello world, foo bar");
route.get("/", () => "hello world");
route.get("/hello/world", () => "hello world, buddy");
route.post("/email/subscribe", "Actions/SubscriberEmailAction");
route.get("/generate-registration-options", "Actions/Auth/GenerateRegistrationAction");
route.post("/verify-registration", "Actions/Auth/VerifyRegistrationAction");
route.get("/generate-authentication-options", "Actions/Auth/GenerateAuthenticationAction");
route.post("/verify-authentication", "Actions/Auth/VerifyAuthenticationAction");
route.health();
route.get("/install", "Actions/InstallAction");
route.post("/ai/ask", "Actions/AI/AskAction");
route.post("/ai/summary", "Actions/AI/SummaryAction");
route.post("/register", "Actions/Auth/RegisterAction");
route.post("/login", "Actions/Auth/LoginAction");
route.post("/logout", "Actions/Auth/LogoutAction");
route.get("/me", "Actions/Auth/FetchUserAction").middleware("auth");
route.get("/activities", "Actions/FetchActivitiesAction");
route.post("/activities", "Actions/StoreActivitiesAction").middleware("auth");
route.put("/activities/{id}", "Actions/UpdateActivityAction").middleware("auth");
route.delete("/activities/{id}", "Actions/DeleteActivityAction").middleware("auth");
