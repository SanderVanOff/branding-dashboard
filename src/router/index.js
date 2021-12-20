import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/Home.vue";
import store from "@/store";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
      meta: {
        layout: "main",
        auth: true,
        role: "user"
      }
    },
    {
      path: "/branding_by_country",
      name: "BrandingByCountry",
      component: () =>
        import(
          /* webpackChunkName: "about" */ "../views/BrandingByCountry.vue"
        ),
      meta: {
        layout: "main",
        auth: true,
        role: "user"
      }
    },
    {
      path: "/branding_by_city/:id",
      name: "BrandingByCity",
      component: () =>
        import(/* webpackChunkName: "about" */ "../views/BrandingByCity.vue"),
      meta: {
        layout: "main",
        auth: true,
        role: "user"
      }
    },
    {
      path: "/top_branding",
      name: "TopBranding",
      component: () =>
        import(/* webpackChunkName: "about" */ "../views/TopBranding.vue"),
      meta: {
        layout: "main",
        auth: true,
        role: "user"
      }
    },
    {
      path: "/login",
      name: "Login",
      component: () =>
        import(/* webpackChunkName: "about" */ "../views/Login.vue"),
      meta: {
        layout: "empty",
        auth: false,
        role: "user"
      }
    },
    {
      path: "/registration",
      name: "Registration",
      component: () =>
        import(/* webpackChunkName: "about" */ "../views/Registration.vue"),
      meta: {
        layout: "empty",
        auth: false,
        role: "user"
      }
    },
    {
      path: "/about",
      name: "About",
      component: () =>
        import(/* webpackChunkName: "about" */ "../views/About.vue"),
      meta: {
        layout: "main",
        auth: false,
        role: "user"
      }
    },
    {
      path: "/access_settings",
      name: "AccessSettings",
      component: () =>
        import(/* webpackChunkName: "about" */ "../views/AccessSettings.vue"),
      meta: {
        layout: "main",
        auth: true,
        role: "admin"
      }
    },
    {
      path: "/profile",
      name: "Profile",
      component: () =>
        import(/* webpackChunkName: "about" */ "../views/Profile.vue"),
      meta: {
        layout: "main",
        auth: true,
        role: "user"
      }
    },
    {
      path: "*",
      name: "404",
      component: () =>
        import(/* webpackChunkName: "about" */ "../views/404.vue"),
      meta: {
        layout: "empty",
        auth: false,
        role: "user"
      }
    }
  ]
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.auth)) {
    if (store.getters.isAuth) {
      await store.dispatch("getCurrentUser");
      if (to.meta.role !== "admin") {
        switch (to.name) {
          case "BrandingByCity":
            store.getters.availableCities.includes(String(to.params.id))
              ? next()
              : router.replace("/");
            break;
          default:
            next();
            return;
        }
        return;
      } else if (
        to.meta.role === "admin" &&
        store.getters.currentUser.role === "admin"
      ) {
        next();
        return;
      } else {
        next("/");
        return;
      }
    }
    next("/login");
  } else {
    next();
  }
});

export default router;
