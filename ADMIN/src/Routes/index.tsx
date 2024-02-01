import { IRouter } from './types'
import Dashboard from '~/Pages/Dashboard/Dashboard'
import Employer from '~/Pages/Employer/Employer'
import Candidate from '~/Pages/Candidate/Candidate'
import News from '~/Pages/News/News'
import DetailEmployer from '~/Pages/Employer/DetailEmployer/DetailEmployer'
import DetailCandidate from '~/Pages/Candidate/DetailCandidate/DetailCandidate'
import PricesSetting from '~/Pages/PricesSetting/PricesSetting'
import AdvSetting from '~/Pages/AdvSetting/AdvSetting'
import CVSetting from '~/Pages/CVSetting/CVSetting'
import SettingPassword from '~/Pages/SettingPassword/SettingPassword'
import CreateUpdateNews from '~/Pages/News/CreateUpdateNews'
import Posts from '~/Pages/Posts/Posts'
import DetailPosts from '~/Pages/Posts/DetailPosts'
import ProgramSetting from '~/Pages/ProgramSetting/ProgramSetting'
export const RouteContainer: IRouter[] = [
  {
    path: '/',
    exact: true,
    element: Dashboard,
    isAuth: false
  },
  {
    path: '/employer',
    exact: true,
    element: Employer,
    isAuth: false
  },
  {
    path: '/candidate',
    exact: true,
    element: Candidate,
    isAuth: false
  },
  {
    path: '/news',
    exact: true,
    element: News,
    isAuth: false
  },
  {
    path: '/setting-price',
    exact: true,
    element: PricesSetting,
    isAuth: false
  },
  {
    path: '/setting-adv',
    exact: true,
    element: AdvSetting,
    isAuth: false
  },
  {
    path: '/setting-cv',
    exact: true,
    element: CVSetting,
    isAuth: false
  },
  {
    path: '/setting-password',
    exact: true,
    element: SettingPassword,
    isAuth: false
  },
  {
    path: '/employer/detail/:id',
    exact: true,
    element: DetailEmployer,
    isAuth: false
  },
  {
    path: '/candidate/detail/:id',
    exact: true,
    element: DetailCandidate,
    isAuth: false
  },
  {
    path: '/news/create',
    exact: true,
    element: CreateUpdateNews,
    isAuth: false
  },
  {
    path: '/news/detail/:id',
    exact: true,
    element: CreateUpdateNews,
    isAuth: false
  },
  {
    path: '/posts',
    exact: true,
    element: Posts,
    isAuth: false
  },
  {
    path: '/posts/detail/:id',
    exact: true,
    element: DetailPosts,
    isAuth: false
  },
  {
    path: '/setting-program',
    exact: true,
    element: ProgramSetting,
    isAuth: false
  }
]
