import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/Login.vue'
import Callback from "@/views/Callback.vue";
import store from "@/_store";
import SearchView from "@/views/SearchView.vue";
import HouseView from "@/views/HouseView.vue";
import AdminView from "@/views/admin/AdminView.vue";
import JwtResponse from "@/_models/_response/JwtResponse";
import AdminCompetitionsView from "@/views/admin/tabs/AdminCompetitionsReview.vue";
import AdminTeamView from "@/views/admin/tabs/AdminTeamView.vue";
import AdminCategoryView from "@/views/admin/tabs/AdminCategoryView.vue";
import AdminMatchView from "@/views/admin/tabs/AdminMatchView.vue";
import CompetitionView from "@/views/competition/Competition.vue";
import MatchCompetitionView from "@/views/competition/tabs/MatchCompetitionView.vue";
import TeamCompetitionView from "@/views/competition/tabs/TeamCompetitionView.vue";
import InfoView from "@/views/informations/InfoView.vue";
import Credits from "@/views/informations/tabs/Credits.vue";
import Rules from "@/views/informations/tabs/Rules.vue";
import PrivacyPolicy from "@/views/informations/tabs/PrivacyPolicy.vue";
import RulesView from "@/views/informations/tabs/RulesView.vue";

Vue.use(VueRouter)

export enum RouteName {
  COMPETITION_MATCH = 'COMPETITION_MATCH',
  COMPETITION_TEAM = 'COMPETITION_TEAM',
}

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    children: [
      {
        path: '',
        component: HouseView
      },
      {
        path: 'competition/:id',
        name: 'competition',
        component: CompetitionView,
        children: [
          {
            path: 'matchs',
            name: RouteName.COMPETITION_MATCH,
            component: MatchCompetitionView
          },
          {
            path: 'teams',
            name: RouteName.COMPETITION_TEAM,
            component: TeamCompetitionView
          }
        ]
      },
      {
        path: 'search',
        component: SearchView
      },
      {
        path: 'info',
        component: InfoView,
        children: [
          {
            path: 'credits',
            component: Credits
          },
          {
            path: 'rules',
            component: RulesView
          },
          {
            path: 'privacyPolicy',
            component: PrivacyPolicy
          }
        ]
      },
      {
        path: 'admin',
        component: AdminView,
        children: [
          {
            path: 'competitions',
            component: AdminCompetitionsView
          },
          {
            path: 'teams',
            component: AdminTeamView
          },
          {
            path: 'categories',
            component: AdminCategoryView
          },
          {
            path: 'matchs',
            component: AdminMatchView
          }
        ]
      }
    ]
  },
  {
    path: '/callback',
    name: 'callback',
    component: Callback
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  const currentUser: JwtResponse = store.getters['AuthModule/getCurrentUser'];
  if ((!currentUser || !currentUser.id) && to.name !== 'login') {
    const user = localStorage.getItem('user');
    if (user) {
      store.commit('AuthModule/setCurrentUser', JSON.parse(user));
      next();
    } else {
      next({ name: 'login' });
    }
  }
  next();
});

export default router
