import {
  LuConstruction,
  LuLayoutDashboard,
  LuMonitor,
  LuBug,
  LuListTodo,
  LuFileX,
  LuCircleHelp,
  LuLock,
  LuBell,
  LuPackage,
  LuPalette,
  LuServerOff,
  LuSettings,
  LuWrench,
  LuUserCog,
  LuUserX,
  LuUsers,
  LuMessageSquare,
  LuShieldCheck,
  LuAudioWaveform,
  LuCommand,
  LuLayoutList,
  LuUser,
  LuUserPlus,
} from 'react-icons/lu'
import { ClerkLogo } from '@/assets/clerk-logo'
import { type SidebarData } from '../types'

export const sidebarData: SidebarData = {
  user: {
    name: 'satnaing',
    email: 'satnaingdev@gmail.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Shadcn Admin',
      logo: LuCommand,
      plan: 'Vite + ShadcnUI',
    },
    {
      name: 'Acme Inc',
      logo: LuLayoutList,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: LuAudioWaveform,
      plan: 'Startup',
    },
  ],
  navGroups: [
    {
      title: 'Frontend',
      collapsible: true,
      defaultOpen: true,
      items: [
        {
          title: '로그인',
          url: '/auth/login',
          icon: LuUser,
        },
        {
          title: '회원가입',
          url: '/auth/signup',
          icon: LuUserPlus,
        },
      ],
    },
    {
      title: 'Old (참조용)',
      collapsible: true,
      defaultOpen: false,
      items: [
        {
          title: 'Dashboard',
          url: '/old',
          icon: LuLayoutDashboard,
        },
        {
          title: 'Tasks',
          url: '/tasks',
          icon: LuListTodo,
        },
        {
          title: 'Apps',
          url: '/apps',
          icon: LuPackage,
        },
        {
          title: 'Chats',
          url: '/chats',
          badge: '3',
          icon: LuMessageSquare,
        },
        {
          title: 'Users',
          url: '/users',
          icon: LuUsers,
        },
        {
          title: 'Auth',
          icon: LuShieldCheck,
          items: [
            {
              title: 'Sign In',
              url: '/sign-in',
            },
            {
              title: 'Sign In (2 Col)',
              url: '/sign-in-2',
            },
            {
              title: 'Sign Up',
              url: '/sign-up',
            },
            {
              title: 'Forgot Password',
              url: '/forgot-password',
            },
            {
              title: 'OTP',
              url: '/otp',
            },
          ],
        },
        {
          title: 'Errors',
          icon: LuBug,
          items: [
            {
              title: 'Unauthorized',
              url: '/errors/unauthorized',
              icon: LuLock,
            },
            {
              title: 'Forbidden',
              url: '/errors/forbidden',
              icon: LuUserX,
            },
            {
              title: 'Not Found',
              url: '/errors/not-found',
              icon: LuFileX,
            },
            {
              title: 'Internal Server Error',
              url: '/errors/internal-server-error',
              icon: LuServerOff,
            },
            {
              title: 'Maintenance Error',
              url: '/errors/maintenance-error',
              icon: LuConstruction,
            },
          ],
        },
        {
          title: 'Settings',
          icon: LuSettings,
          items: [
            {
              title: 'Profile',
              url: '/settings',
              icon: LuUserCog,
            },
            {
              title: 'Account',
              url: '/settings/account',
              icon: LuWrench,
            },
            {
              title: 'Appearance',
              url: '/settings/appearance',
              icon: LuPalette,
            },
            {
              title: 'Notifications',
              url: '/settings/notifications',
              icon: LuBell,
            },
            {
              title: 'Display',
              url: '/settings/display',
              icon: LuMonitor,
            },
          ],
        },
        {
          title: 'Help Center',
          url: '/help-center',
          icon: LuCircleHelp,
        },
        {
          title: 'Secured by Clerk',
          icon: ClerkLogo,
          items: [
            {
              title: 'Sign In',
              url: '/clerk/sign-in',
            },
            {
              title: 'Sign Up',
              url: '/clerk/sign-up',
            },
            {
              title: 'User Management',
              url: '/clerk/user-management',
            },
          ],
        },
      ],
    },
  ],
}
