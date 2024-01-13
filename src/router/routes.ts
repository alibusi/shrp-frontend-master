import { RouteRecordRaw } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import JobList from "@/views/JobList.vue";
import ContactView from "@/views/ContactView.vue";
import ImputationView from "@/views/ImputationView.vue";
import HelpView from "@/views/HelpView.vue";
import ImputationTabsView from "@/views/ImputationTabsView.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/imputation",
    name: "Imputation",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: ImputationTabsView,
  },
  {
    path: "/jobList",
    name: "Job List",
    component: JobList,
  },
  {
    path: "/help",
    name: "Help",
    component: HelpView,
  },
  {
    path: "/contact",
    name: "Contact",
    component: ContactView,
  },
];
