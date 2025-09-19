import { MenuItem } from './menu.mock'

export const introMenuItems: MenuItem[] = [
  {
    id: 'about',
    title: 'kanc:navigation.menu.about.title',
    children: [
      { id: 'greeting', title: 'kanc:navigation.menu.about.greeting', path: '/about/greeting' },
      {
        id: 'history',
        title: 'kanc:navigation.menu.about.history',
        children: [
          { id: 'purpose', title: 'kanc:navigation.menu.about.purpose', path: '/about/history/purpose' },
          { id: 'vision', title: 'kanc:navigation.menu.about.vision', path: '/about/history/vision' },
          { id: 'facility', title: 'kanc:navigation.menu.about.facility', path: '/about/history/facility' },
        ]
      },
      { id: 'achievement', title: 'kanc:navigation.menu.about.achievement', path: '/about/achievement' },
      { id: 'ci', title: 'kanc:navigation.menu.about.ci', path: '/about/ci' },
      { id: 'talent', title: 'kanc:navigation.menu.about.talent', path: '/about/talent' },
      { id: 'ethics', title: 'kanc:navigation.menu.about.ethics', path: '/about/ethics' },
      {
        id: 'org',
        title: 'kanc:navigation.menu.about.org',
        children: [
          { id: 'chart', title: 'kanc:navigation.menu.about.chart', path: '/about/org/chart' },
          { id: 'staff', title: 'kanc:navigation.menu.about.staff', path: '/about/org/staff' },
        ]
      },
      { id: 'location', title: 'kanc:navigation.menu.about.location', path: '/about/location' },
    ],
  },
  {
    id: 'tech',
    title: 'kanc:navigation.menu.tech.title',
    children: [
      {
        id: 'process',
        title: 'kanc:navigation.menu.tech.process',
        children: [
          { id: 'module', title: 'kanc:navigation.menu.tech.module', path: '/tech/process/module' },
          { id: 'thin-film', title: 'kanc:navigation.menu.tech.thinFilm', path: '/tech/process/thin-film' },
          { id: 'etching', title: 'kanc:navigation.menu.tech.etching', path: '/tech/process/etching' },
          { id: 'patterning', title: 'kanc:navigation.menu.tech.patterning', path: '/tech/process/patterning' },
          { id: 'post', title: 'kanc:navigation.menu.tech.post', path: '/tech/process/post' },
          { id: 'epi', title: 'kanc:navigation.menu.tech.epi', path: '/tech/process/epi' },
        ]
      },
      { id: 'analysis', title: 'kanc:navigation.menu.tech.analysis', path: '/tech/analysis' },
      { id: 'device', title: 'kanc:navigation.menu.tech.device', path: '/tech/device' },
    ],
  },
  {
    id: 'service',
    title: 'kanc:navigation.menu.service.title',
    children: [
      {
        id: 'fab',
        title: 'kanc:navigation.menu.service.fab',
        children: [
          { id: 'overview', title: 'kanc:navigation.menu.service.fabOverview', path: '/service/fab/overview' },
          { id: 'info', title: 'kanc:navigation.menu.service.info', path: '/service/fab/info' },
          { id: 'tour', title: 'kanc:navigation.menu.service.tour', path: '/service/fab/tour' },
          { id: 'equipment', title: 'kanc:navigation.menu.service.equipment', path: '/service/fab/equipment' },
        ]
      },
      { id: 'education', title: 'kanc:navigation.menu.service.education', path: '/service/education' },
      {
        id: 'rental',
        title: 'kanc:navigation.menu.service.rental',
        children: [
          { id: 'guide', title: 'kanc:navigation.menu.service.rentalGuide', path: '/service/rental/guide' },
          { id: 'building', title: 'kanc:navigation.menu.service.building', path: '/service/rental/building' },
          { id: 'companies', title: 'kanc:navigation.menu.service.companies', path: '/service/rental/companies' },
        ]
      },
      {
        id: 'venue',
        title: 'kanc:navigation.menu.service.venue',
        children: [
          { id: 'cleanroom', title: 'kanc:navigation.menu.service.cleanroom', path: '/service/venue/cleanroom' },
        ]
      },
    ],
  },
  {
    id: 'notice',
    title: 'kanc:navigation.menu.notice.title',
    children: [
      { id: 'notice', title: 'kanc:navigation.menu.notice.list', path: '/notice/list' },
      {
        id: 'announcement',
        title: 'kanc:navigation.menu.notice.announcement',
        children: [
          { id: 'bidding', title: 'kanc:navigation.menu.notice.bidding', path: '/notice/announcement/bidding' },
          { id: 'recruitment', title: 'kanc:navigation.menu.notice.recruitment', path: '/notice/announcement/recruitment' },
          { id: 'family', title: 'kanc:navigation.menu.notice.family', path: '/notice/announcement/family' },
        ]
      },
      { id: 'law', title: 'kanc:navigation.menu.notice.law', path: '/notice/law' },
    ],
  },
  {
    id: 'support',
    title: 'kanc:navigation.menu.support.title',
    children: [
      { id: 'status', title: 'kanc:navigation.menu.support.status', path: '/support/status' },
      {
        id: 'intro',
        title: 'kanc:navigation.menu.support.intro',
        children: [
          {
            id: 'single-creator',
            title: 'kanc:navigation.menu.support.singleCreator',
            children: [
              { id: 'biz-intro', title: 'kanc:navigation.menu.support.bizIntro', path: '/support/intro/single-creator/intro' },
              { id: 'companies', title: 'kanc:navigation.menu.support.participatingCompanies', path: '/support/intro/single-creator/companies' },
            ]
          },
          {
            id: 'nano-sme',
            title: 'kanc:navigation.menu.support.nanoSme',
            children: [
              { id: 'biz-intro', title: 'kanc:navigation.menu.support.bizIntro', path: '/support/intro/nano-sme/intro' },
              { id: 'companies', title: 'kanc:navigation.menu.support.participatingCompanies', path: '/support/intro/nano-sme/companies' },
            ]
          },
        ]
      },
      {
        id: 'ended',
        title: 'kanc:navigation.menu.support.ended',
        children: [
          { id: 'platform', title: 'kanc:navigation.menu.support.platform', path: '/support/ended/platform' },
          { id: 'certification', title: 'kanc:navigation.menu.support.certification', path: '/support/ended/certification' },
        ]
      },
      {
        id: 'event',
        title: 'kanc:navigation.menu.support.event',
        children: [
          { id: 'conference', title: 'kanc:navigation.menu.support.conference', path: '/support/event/conference' },
          { id: 'nanokorea', title: 'kanc:navigation.menu.support.nanokorea', path: '/support/event/nanokorea' },
        ]
      },
      {
        id: 'transfer',
        title: 'kanc:navigation.menu.support.transfer',
        children: [
          { id: 'guide', title: 'kanc:navigation.menu.support.transferGuide', path: '/support/transfer/guide' },
          { id: 'patent', title: 'kanc:navigation.menu.support.patent', path: '/support/transfer/patent' },
        ]
      },
      {
        id: 'commercialization',
        title: 'kanc:navigation.menu.support.commercialization',
        children: [
          { id: 'overview', title: 'kanc:navigation.menu.support.overview', path: '/support/commercialization/overview' },
        ]
      },
    ],
  },
  {
    id: 'activity',
    title: 'kanc:navigation.menu.activity.title',
    children: [
      { id: 'news', title: 'kanc:navigation.menu.activity.news', path: '/activity/news' },
      { id: 'events', title: 'kanc:navigation.menu.activity.events', path: '/activity/events' },
      { id: 'council', title: 'kanc:navigation.menu.activity.council', path: '/activity/council' },
    ],
  },
  {
    id: 'environment',
    title: 'kanc:navigation.menu.environment.title',
    children: [
      { id: 'message', title: 'kanc:navigation.menu.environment.message', path: '/environment/message' },
      { id: 'policy', title: 'kanc:navigation.menu.environment.policy', path: '/environment/policy' },
      { id: 'system', title: 'kanc:navigation.menu.environment.system', path: '/environment/system' },
      { id: 'green', title: 'kanc:navigation.menu.environment.green', path: '/environment/green' },
    ],
  },
  {
    id: 'disclosure',
    title: 'kanc:navigation.menu.disclosure.title',
    children: [
      {
        id: 'system',
        title: 'kanc:navigation.menu.disclosure.systemGuide',
        children: [
          { id: 'what', title: 'kanc:navigation.menu.disclosure.what', path: '/disclosure/system/what' },
          { id: 'law', title: 'kanc:navigation.menu.disclosure.lawData', path: '/disclosure/system/law' },
          { id: 'process', title: 'kanc:navigation.menu.disclosure.processProc', path: '/disclosure/system/process' },
          { id: 'target', title: 'kanc:navigation.menu.disclosure.target', path: '/disclosure/system/target' },
          { id: 'method', title: 'kanc:navigation.menu.disclosure.method', path: '/disclosure/system/method' },
          { id: 'obligation', title: 'kanc:navigation.menu.disclosure.obligation', path: '/disclosure/system/obligation' },
          { id: 'appeal', title: 'kanc:navigation.menu.disclosure.appeal', path: '/disclosure/system/appeal' },
          { id: 'fee', title: 'kanc:navigation.menu.disclosure.fee', path: '/disclosure/system/fee' },
          { id: 'private', title: 'kanc:navigation.menu.disclosure.private', path: '/disclosure/system/private' },
        ]
      },
      { id: 'real-name', title: 'kanc:navigation.menu.disclosure.realName', path: '/disclosure/real-name' },
      { id: 'pre-disclosure', title: 'kanc:navigation.menu.disclosure.preDisclosure', path: '/disclosure/pre' },
      { id: 'open-data', title: 'kanc:navigation.menu.disclosure.openData', path: '/disclosure/open-data' },
      { id: 'management', title: 'kanc:navigation.menu.disclosure.management', path: '/disclosure/management' },
      { id: 'expense', title: 'kanc:navigation.menu.disclosure.expense', path: '/disclosure/expense' },
      { id: 'request', title: 'kanc:navigation.menu.disclosure.request', path: '/disclosure/request' },
    ],
  },
]

export const serviceMenuItems: MenuItem[] = [
  {
    id: 'analysis',
    title: 'kanc:navigation.menu.servicePortal.analysis',
    children: [
      { id: 'intro', title: 'kanc:navigation.menu.servicePortal.analysisIntro', path: '/service-portal/analysis/intro' },
      { id: 'equipment', title: 'kanc:navigation.menu.servicePortal.analysisEquipment', path: '/service-portal/analysis/equipment' },
      { id: 'process', title: 'kanc:navigation.menu.servicePortal.process', path: '/service-portal/analysis/process' },
      { id: 'fee', title: 'kanc:navigation.menu.servicePortal.usageFee', path: '/service-portal/analysis/fee' },
    ],
  },
  {
    id: 'education',
    title: 'kanc:navigation.menu.servicePortal.educationService',
    children: [
      { id: 'program', title: 'kanc:navigation.menu.servicePortal.program', path: '/service-portal/education/program' },
      { id: 'schedule', title: 'kanc:navigation.menu.servicePortal.schedule', path: '/service-portal/education/schedule' },
      { id: 'apply', title: 'kanc:navigation.menu.servicePortal.apply', path: '/service-portal/education/apply' },
      { id: 'materials', title: 'kanc:navigation.menu.servicePortal.materials', path: '/service-portal/education/materials' },
    ],
  },
  {
    id: 'fab',
    title: 'kanc:navigation.menu.servicePortal.fabServiceGuide',
    children: [
      { id: 'intro', title: 'kanc:navigation.menu.servicePortal.fabIntro', path: '/service-portal/fab/intro' },
      { id: 'facility', title: 'kanc:navigation.menu.servicePortal.facilityGuide', path: '/service-portal/fab/facility' },
      { id: 'process', title: 'kanc:navigation.menu.servicePortal.process', path: '/service-portal/fab/process' },
      { id: 'tour', title: 'kanc:navigation.menu.servicePortal.fabTour', path: '/service-portal/fab/tour' },
    ],
  },
  {
    id: 'reservation',
    title: 'kanc:navigation.menu.servicePortal.reservation',
    children: [
      { id: 'equipment', title: 'kanc:navigation.menu.servicePortal.equipmentReservation', path: '/service-portal/reservation/equipment' },
      { id: 'space', title: 'kanc:navigation.menu.servicePortal.spaceReservation', path: '/service-portal/reservation/space' },
      { id: 'consulting', title: 'kanc:navigation.menu.servicePortal.consultingReservation', path: '/service-portal/reservation/consulting' },
      { id: 'my', title: 'kanc:navigation.menu.servicePortal.myReservation', path: '/service-portal/reservation/my' },
    ],
  },
  {
    id: 'customer',
    title: 'kanc:navigation.menu.servicePortal.customer',
    children: [
      { id: 'faq', title: 'kanc:navigation.menu.servicePortal.faq', path: '/service-portal/customer/faq' },
      { id: 'qna', title: 'kanc:navigation.menu.servicePortal.qna', path: '/service-portal/customer/qna' },
      { id: 'download', title: 'kanc:navigation.menu.servicePortal.download', path: '/service-portal/customer/download' },
      { id: 'contact', title: 'kanc:navigation.menu.servicePortal.contact', path: '/service-portal/customer/contact' },
    ],
  },
]

export function getMenuItems(variant: 'intro' | 'service'): MenuItem[] {
  return variant === 'intro' ? introMenuItems : serviceMenuItems
}