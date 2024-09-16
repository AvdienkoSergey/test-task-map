import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import AboutTaskView from "@/views/AboutTaskView.vue";
import { Observer } from "@/events/_observer";
import { wentToAboutTaskPage$, wentToMapPage$ } from "@/events/page";
import { WorldMap } from "@/entities/Map";

const AboutTask = {
  path: "/",
  name: "about-task",
  component: AboutTaskView,
};
const Map = {
  path: "/map",
  name: "map",
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () =>
    import(/* webpackChunkName: "about" */ "@/views/MapView.vue"),
};
const MapTest = {
  path: "/map-test",
  name: "map-test",
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () =>
    import(/* webpackChunkName: "about" */ "@/views/TestView.vue"),
};

const routes: Array<RouteRecordRaw> = [AboutTask, Map, MapTest];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

function cteateLog(name: string) {
  const printPageName = () => {
    // console.log(`Routing to page: ${name}`);
  };
  return printPageName;
}

const visitAboutTaskPage = new Observer(cteateLog(AboutTask.name));
const visitMapPage = new Observer(cteateLog(Map.name));
wentToAboutTaskPage$.subscribe(visitAboutTaskPage);
wentToMapPage$.subscribe(visitMapPage);

router.beforeEach((to) => {
  console.log(to.name);
  switch (to.name) {
    case AboutTask.name:
      wentToAboutTaskPage$.on(Promise.resolve());
      break;
    case Map.name:
      wentToMapPage$.on(Promise.resolve(WorldMap.downloadDependencies()));
      break;
    case MapTest.name:
      console.log(MapTest.name);
      break;

    default:
      break;
  }
});

export default router;
