// ** Mock
import mock from 'src/@fake-db/mock'

const data = {
  users: [
    {
      id: 1,
      parentCategory: 'Auto Debit',
      fullName: 'Galen Slixby',
      company: 'Yotz PVT LTD',
      category: 'editor',
      username: 'gslixby0',
      country: 'El Salvador',
      contact: '(479) 232-9151',
      email: 'gslixby0@abc.net.au',
      description: 'enterprise',
      status: 'inactive',
      avatar: '',
      avatarColor: 'primary'
    },
    {
      id: 2,
      parentCategory: 'Manual - Paypal',
      fullName: 'Halsey Redmore',
      company: 'Skinder PVT LTD',
      category: 'author',
      username: 'hredmore1',
      country: 'Albania',
      contact: '(472) 607-9137',
      email: 'hredmore1@imgur.com',
      description: 'team',
      status: 'pending',
      avatar: '/images/avatars/3.png'
    },
    {
      id: 3,
      parentCategory: 'Manual - Cash',
      fullName: 'Marjory Sicely',
      company: 'Oozz PVT LTD',
      category: 'maintainer',
      username: 'msicely2',
      country: 'Russia',
      contact: '(321) 264-4599',
      email: 'msicely2@who.int',
      description: 'enterprise',
      status: 'active',
      avatar: '/images/avatars/1.png'
    },
    {
      id: 4,
      parentCategory: 'Auto Debit',
      fullName: 'Cyrill Risby',
      company: 'Oozz PVT LTD',
      category: 'maintainer',
      username: 'crisby3',
      country: 'China',
      contact: '(923) 690-6806',
      email: 'crisby3@wordpress.com',
      description: 'team',
      status: 'inactive',
      avatar: '/images/avatars/3.png'
    },
    {
      id: 5,
      parentCategory: 'Auto Debit',
      fullName: 'Maggy Hurran',
      company: 'Aimbo PVT LTD',
      category: 'subscriber',
      username: 'mhurran4',
      country: 'Pakistan',
      contact: '(669) 914-1078',
      email: 'mhurran4@yahoo.co.jp',
      description: 'enterprise',
      status: 'pending',
      avatar: '/images/avatars/1.png'
    },
    {
      id: 6,
      parentCategory: 'Manual - Cash',
      fullName: 'Silvain Halstead',
      company: 'Jaxbean PVT LTD',
      category: 'author',
      username: 'shalstead5',
      country: 'China',
      contact: '(958) 973-3093',
      email: 'shalstead5@shinystat.com',
      description: 'company',
      status: 'active',
      avatar: '',
      avatarColor: 'error'
    },
    {
      id: 7,
      parentCategory: 'Manual - Paypal',
      fullName: 'Breena Gallemore',
      company: 'Jazzy PVT LTD',
      category: 'subscriber',
      username: 'bgallemore6',
      country: 'Canada',
      contact: '(825) 977-8152',
      email: 'bgallemore6@boston.com',
      description: 'company',
      status: 'pending',
      avatar: '',
      avatarColor: 'warning'
    },
    {
      id: 8,
      parentCategory: 'Auto Debit',
      fullName: 'Kathryne Liger',
      company: 'Pixoboo PVT LTD',
      category: 'author',
      username: 'kliger7',
      country: 'France',
      contact: '(187) 440-0934',
      email: 'kliger7@vinaora.com',
      description: 'enterprise',
      status: 'pending',
      avatar: '/images/avatars/4.png'
    },
    {
      id: 9,
      parentCategory: 'Manual - Credit Card',
      fullName: 'Franz Scotfurth',
      company: 'Tekfly PVT LTD',
      category: 'subscriber',
      username: 'fscotfurth8',
      country: 'China',
      contact: '(978) 146-5443',
      email: 'fscotfurth8@dailymotion.com',
      description: 'team',
      status: 'pending',
      avatar: '/images/avatars/2.png'
    },
    {
      id: 10,
      parentCategory: 'Manual - Credit Card',
      fullName: 'Jillene Bellany',
      company: 'Gigashots PVT LTD',
      category: 'maintainer',
      username: 'jbellany9',
      country: 'Jamaica',
      contact: '(589) 284-6732',
      email: 'jbellany9@kickstarter.com',
      description: 'company',
      status: 'inactive',
      avatar: '/images/avatars/5.png'
    },
    {
      id: 11,
      parentCategory: 'Auto Debit',
      fullName: 'Jonah Wharlton',
      company: 'Eare PVT LTD',
      category: 'subscriber',
      username: 'jwharltona',
      country: 'United States',
      contact: '(176) 532-6824',
      email: 'jwharltona@oakley.com',
      description: 'team',
      status: 'inactive',
      avatar: '/images/avatars/4.png'
    },
    {
      id: 12,
      parentCategory: 'Auto Debit',
      fullName: 'Seth Hallam',
      company: 'Yakitri PVT LTD',
      category: 'subscriber',
      username: 'shallamb',
      country: 'Peru',
      contact: '(234) 464-0600',
      email: 'shallamb@hugedomains.com',
      description: 'team',
      status: 'pending',
      avatar: '/images/avatars/5.png'
    },
    {
      id: 13,
      parentCategory: 'Manual - Cash',
      fullName: 'Yoko Pottie',
      company: 'Leenti PVT LTD',
      category: 'subscriber',
      username: 'ypottiec',
      country: 'Philippines',
      contact: '(907) 284-5083',
      email: 'ypottiec@privacy.gov.au',
      description: 'basic',
      status: 'inactive',
      avatar: '/images/avatars/7.png'
    },
    {
      id: 14,
      parentCategory: 'Manual - Paypal',
      fullName: 'Maximilianus Krause',
      company: 'Digitube PVT LTD',
      category: 'author',
      username: 'mkraused',
      country: 'Democratic Republic of the Congo',
      contact: '(167) 135-7392',
      email: 'mkraused@stanford.edu',
      description: 'team',
      status: 'active',
      avatar: '/images/avatars/6.png'
    },
    {
      id: 15,
      parentCategory: 'Manual - Credit Card',
      fullName: 'Zsazsa McCleverty',
      company: 'Kaymbo PVT LTD',
      category: 'maintainer',
      username: 'zmcclevertye',
      country: 'France',
      contact: '(317) 409-6565',
      email: 'zmcclevertye@soundcloud.com',
      description: 'enterprise',
      status: 'active',
      avatar: '/images/avatars/2.png'
    },
    {
      id: 16,
      parentCategory: 'Auto Debit',
      fullName: 'Bentlee Emblin',
      company: 'Yambee PVT LTD',
      category: 'author',
      username: 'bemblinf',
      country: 'Spain',
      contact: '(590) 606-1056',
      email: 'bemblinf@wired.com',
      description: 'company',
      status: 'active',
      avatar: '/images/avatars/6.png'
    },
    {
      id: 17,
      parentCategory: 'Manual - Paypal',
      fullName: 'Brockie Myles',
      company: 'Wikivu PVT LTD',
      category: 'maintainer',
      username: 'bmylesg',
      country: 'Poland',
      contact: '(553) 225-9905',
      email: 'bmylesg@amazon.com',
      description: 'basic',
      status: 'active',
      avatar: '',
      avatarColor: 'success'
    },
    {
      id: 18,
      parentCategory: 'Auto Debit',
      fullName: 'Bertha Biner',
      company: 'Twinte PVT LTD',
      category: 'editor',
      username: 'bbinerh',
      country: 'Yemen',
      contact: '(901) 916-9287',
      email: 'bbinerh@mozilla.com',
      description: 'team',
      status: 'active',
      avatar: '/images/avatars/7.png'
    },
    {
      id: 19,
      parentCategory: 'Auto Debit',
      fullName: 'Travus Bruntjen',
      company: 'Cogidoo PVT LTD',
      category: 'admin',
      username: 'tbruntjeni',
      country: 'France',
      contact: '(524) 586-6057',
      email: 'tbruntjeni@sitemeter.com',
      description: 'enterprise',
      status: 'active',
      avatar: '',
      avatarColor: 'primary'
    },
    {
      id: 20,
      parentCategory: 'Auto Debit',
      fullName: 'Wesley Burland',
      company: 'Bubblemix PVT LTD',
      category: 'editor',
      username: 'wburlandj',
      country: 'Honduras',
      contact: '(569) 683-1292',
      email: 'wburlandj@uiuc.edu',
      description: 'team',
      status: 'inactive',
      avatar: '/images/avatars/6.png'
    },
    {
      id: 21,
      parentCategory: 'Manual - Cash',
      fullName: 'Selina Kyle',
      company: 'Wayne Enterprises',
      category: 'admin',
      username: 'catwomen1940',
      country: 'USA',
      contact: '(829) 537-0057',
      email: 'irena.dubrovna@wayne.com',
      description: 'team',
      status: 'active',
      avatar: '/images/avatars/1.png'
    },
    {
      id: 22,
      parentCategory: 'Manual - Cash',
      fullName: 'Jameson Lyster',
      company: 'Quaxo PVT LTD',
      category: 'editor',
      username: 'jlysterl',
      country: 'Ukraine',
      contact: '(593) 624-0222',
      email: 'jlysterl@guardian.co.uk',
      description: 'company',
      status: 'inactive',
      avatar: '/images/avatars/8.png'
    },
    {
      id: 23,
      parentCategory: 'Manual - Paypal',
      fullName: 'Kare Skitterel',
      company: 'Ainyx PVT LTD',
      category: 'maintainer',
      username: 'kskitterelm',
      country: 'Poland',
      contact: '(254) 845-4107',
      email: 'kskitterelm@ainyx.com',
      description: 'basic',
      status: 'pending',
      avatar: '/images/avatars/3.png'
    },
    {
      id: 24,
      parentCategory: 'Auto Debit',
      fullName: 'Cleavland Hatherleigh',
      company: 'Flipopia PVT LTD',
      category: 'admin',
      username: 'chatherleighn',
      country: 'Brazil',
      contact: '(700) 783-7498',
      email: 'chatherleighn@washington.edu',
      description: 'team',
      status: 'pending',
      avatar: '/images/avatars/2.png'
    },
    {
      id: 25,
      parentCategory: 'Manual - Paypal',
      fullName: 'Adeline Micco',
      company: 'Topicware PVT LTD',
      category: 'admin',
      username: 'amiccoo',
      country: 'France',
      contact: '(227) 598-1841',
      email: 'amiccoo@whitehouse.gov',
      description: 'enterprise',
      status: 'pending',
      avatar: '',
      avatarColor: 'error'
    },
    {
      id: 26,
      parentCategory: 'Manual - Credit Card',
      fullName: 'Hugh Hasson',
      company: 'Skinix PVT LTD',
      category: 'admin',
      username: 'hhassonp',
      country: 'China',
      contact: '(582) 516-1324',
      email: 'hhassonp@bizjournals.com',
      description: 'basic',
      status: 'inactive',
      avatar: '/images/avatars/4.png'
    },
    {
      id: 27,
      parentCategory: 'Manual - Cash',
      fullName: 'Germain Jacombs',
      company: 'Youopia PVT LTD',
      category: 'editor',
      username: 'gjacombsq',
      country: 'Zambia',
      contact: '(137) 467-5393',
      email: 'gjacombsq@jigsy.com',
      description: 'enterprise',
      status: 'active',
      avatar: '/images/avatars/5.png'
    },
    {
      id: 28,
      parentCategory: 'Manual - Cash',
      fullName: 'Bree Kilday',
      company: 'Jetpulse PVT LTD',
      category: 'maintainer',
      username: 'bkildayr',
      country: 'Portugal',
      contact: '(412) 476-0854',
      email: 'bkildayr@mashable.com',
      description: 'team',
      status: 'active',
      avatar: '',
      avatarColor: 'warning'
    },
    {
      id: 29,
      parentCategory: 'Auto Debit',
      fullName: 'Candice Pinyon',
      company: 'Kare PVT LTD',
      category: 'maintainer',
      username: 'cpinyons',
      country: 'Sweden',
      contact: '(170) 683-1520',
      email: 'cpinyons@behance.net',
      description: 'team',
      status: 'active',
      avatar: '/images/avatars/7.png'
    },
    {
      id: 30,
      parentCategory: 'Manual - Cash',
      fullName: 'Isabel Mallindine',
      company: 'Voomm PVT LTD',
      category: 'subscriber',
      username: 'imallindinet',
      country: 'Slovenia',
      contact: '(332) 803-1983',
      email: 'imallindinet@shinystat.com',
      description: 'team',
      status: 'pending',
      avatar: '',
      avatarColor: 'info'
    },
    {
      id: 31,
      parentCategory: 'Auto Debit',
      fullName: 'Gwendolyn Meineken',
      company: 'Oyondu PVT LTD',
      category: 'admin',
      username: 'gmeinekenu',
      country: 'Moldova',
      contact: '(551) 379-7460',
      email: 'gmeinekenu@hc360.com',
      description: 'basic',
      status: 'pending',
      avatar: '/images/avatars/1.png'
    },
    {
      id: 32,
      parentCategory: 'Manual - Paypal',
      fullName: 'Rafaellle Snowball',
      company: 'Fivespan PVT LTD',
      category: 'editor',
      username: 'rsnowballv',
      country: 'Philippines',
      contact: '(974) 829-0911',
      email: 'rsnowballv@indiegogo.com',
      description: 'basic',
      status: 'pending',
      avatar: '/images/avatars/5.png'
    },
    {
      id: 33,
      parentCategory: 'Manual - Credit Card',
      fullName: 'Rochette Emer',
      company: 'Thoughtworks PVT LTD',
      category: 'admin',
      username: 'remerw',
      country: 'North Korea',
      contact: '(841) 889-3339',
      email: 'remerw@blogtalkradio.com',
      description: 'basic',
      status: 'active',
      avatar: '/images/avatars/8.png'
    },
    {
      id: 34,
      parentCategory: 'Manual - Cash',
      fullName: 'Ophelie Fibbens',
      company: 'Jaxbean PVT LTD',
      category: 'subscriber',
      username: 'ofibbensx',
      country: 'Indonesia',
      contact: '(764) 885-7351',
      email: 'ofibbensx@booking.com',
      description: 'company',
      status: 'active',
      avatar: '/images/avatars/4.png'
    },
    {
      id: 35,
      parentCategory: 'Manual - Paypal',
      fullName: 'Stephen MacGilfoyle',
      company: 'Browseblab PVT LTD',
      category: 'maintainer',
      username: 'smacgilfoyley',
      country: 'Japan',
      contact: '(350) 589-8520',
      email: 'smacgilfoyley@bigcartel.com',
      description: 'company',
      status: 'pending',
      avatar: '',
      avatarColor: 'error'
    },
    {
      id: 36,
      parentCategory: 'Auto Debit',
      fullName: 'Bradan Rosebotham',
      company: 'Agivu PVT LTD',
      category: 'subscriber',
      username: 'brosebothamz',
      country: 'Belarus',
      contact: '(882) 933-2180',
      email: 'brosebothamz@tripadvisor.com',
      description: 'team',
      status: 'inactive',
      avatar: '',
      avatarColor: 'success'
    },
    {
      id: 37,
      parentCategory: 'Manual - Cash',
      fullName: 'Skip Hebblethwaite',
      company: 'Katz PVT LTD',
      category: 'admin',
      username: 'shebblethwaite10',
      country: 'Canada',
      contact: '(610) 343-1024',
      email: 'shebblethwaite10@arizona.edu',
      description: 'company',
      status: 'inactive',
      avatar: '/images/avatars/1.png'
    },
    {
      id: 38,
      parentCategory: 'Auto Debit',
      fullName: 'Moritz Piccard',
      company: 'Twitternation PVT LTD',
      category: 'maintainer',
      username: 'mpiccard11',
      country: 'Croatia',
      contact: '(365) 277-2986',
      email: 'mpiccard11@vimeo.com',
      description: 'enterprise',
      status: 'inactive',
      avatar: '/images/avatars/1.png'
    },
    {
      id: 39,
      parentCategory: 'Manual - Paypal',
      fullName: 'Tyne Widmore',
      company: 'Yombu PVT LTD',
      category: 'subscriber',
      username: 'twidmore12',
      country: 'Finland',
      contact: '(531) 731-0928',
      email: 'twidmore12@bravesites.com',
      description: 'team',
      status: 'pending',
      avatar: '',
      avatarColor: 'primary'
    },
    {
      id: 40,
      parentCategory: 'Auto Debit',
      fullName: 'Florenza Desporte',
      company: 'Kamba PVT LTD',
      category: 'author',
      username: 'fdesporte13',
      country: 'Ukraine',
      contact: '(312) 104-2638',
      email: 'fdesporte13@omniture.com',
      description: 'company',
      status: 'active',
      avatar: '/images/avatars/6.png'
    },
    {
      id: 41,
      parentCategory: 'Auto Debit',
      fullName: 'Edwina Baldetti',
      company: 'Dazzlesphere PVT LTD',
      category: 'maintainer',
      username: 'ebaldetti14',
      country: 'Haiti',
      contact: '(315) 329-3578',
      email: 'ebaldetti14@theguardian.com',
      description: 'team',
      status: 'pending',
      avatar: '',
      avatarColor: 'info'
    },
    {
      id: 42,
      parentCategory: 'Manual - Credit Card',
      fullName: 'Benedetto Rossiter',
      company: 'Mybuzz PVT LTD',
      category: 'editor',
      username: 'brossiter15',
      country: 'Indonesia',
      contact: '(323) 175-6741',
      email: 'brossiter15@craigslist.org',
      description: 'team',
      status: 'inactive',
      avatar: '',
      avatarColor: 'warning'
    },
    {
      id: 43,
      parentCategory: 'Auto Debit',
      fullName: 'Micaela McNirlan',
      company: 'Tambee PVT LTD',
      category: 'admin',
      username: 'mmcnirlan16',
      country: 'Indonesia',
      contact: '(242) 952-0916',
      email: 'mmcnirlan16@hc360.com',
      description: 'basic',
      status: 'inactive',
      avatar: '',
      avatarColor: 'error'
    },
    {
      id: 44,
      parentCategory: 'Manual - Paypal',
      fullName: 'Vladamir Koschek',
      company: 'Centimia PVT LTD',
      category: 'author',
      username: 'vkoschek17',
      country: 'Guatemala',
      contact: '(531) 758-8335',
      email: 'vkoschek17@abc.net.au',
      description: 'team',
      status: 'active',
      avatar: '',
      avatarColor: 'success'
    },
    {
      id: 45,
      parentCategory: 'Manual - Cash',
      fullName: 'Corrie Perot',
      company: 'Flipopia PVT LTD',
      category: 'subscriber',
      username: 'cperot18',
      country: 'China',
      contact: '(659) 385-6808',
      email: 'cperot18@goo.ne.jp',
      description: 'team',
      status: 'pending',
      avatar: '/images/avatars/3.png'
    },
    {
      id: 46,
      parentCategory: 'Manual - Credit Card',
      fullName: 'Saunder Offner',
      company: 'Skalith PVT LTD',
      category: 'maintainer',
      username: 'soffner19',
      country: 'Poland',
      contact: '(200) 586-2264',
      email: 'soffner19@mac.com',
      description: 'enterprise',
      status: 'pending',
      avatar: '',
      avatarColor: 'primary'
    },
    {
      id: 47,
      parentCategory: 'Auto Debit',
      fullName: 'Karena Courtliff',
      company: 'Feedfire PVT LTD',
      category: 'admin',
      username: 'kcourtliff1a',
      country: 'China',
      contact: '(478) 199-0020',
      email: 'kcourtliff1a@bbc.co.uk',
      description: 'basic',
      status: 'active',
      avatar: '/images/avatars/1.png'
    },
    {
      id: 48,
      parentCategory: 'Auto Debit',
      fullName: 'Onfre Wind',
      company: 'Thoughtmix PVT LTD',
      category: 'admin',
      username: 'owind1b',
      country: 'Ukraine',
      contact: '(344) 262-7270',
      email: 'owind1b@yandex.ru',
      description: 'basic',
      status: 'pending',
      avatar: '',
      avatarColor: 'error'
    },
    {
      id: 49,
      parentCategory: 'Auto Debit',
      fullName: 'Paulie Durber',
      company: 'Babbleblab PVT LTD',
      category: 'subscriber',
      username: 'pdurber1c',
      country: 'Sweden',
      contact: '(694) 676-1275',
      email: 'pdurber1c@gov.uk',
      description: 'team',
      status: 'inactive',
      avatar: '',
      avatarColor: 'warning'
    },
    {
      id: 50,
      parentCategory: 'Manual - Cash',
      fullName: 'Beverlie Krabbe',
      company: 'Kaymbo PVT LTD',
      category: 'editor',
      username: 'bkrabbe1d',
      country: 'China',
      contact: '(397) 294-5153',
      email: 'bkrabbe1d@home.pl',
      description: 'company',
      status: 'active',
      avatar: '/images/avatars/2.png'
    }
  ]
}

const projectListData = [
  {
    id: 1,
    hours: '18:42',
    progressValue: 78,
    totalTask: '122/240',
    progressColor: 'success',
    projectType: 'React Project',
    projectTitle: 'BGC eCommerce App',
    img: '/images/icons/project-icons/react.png'
  },
  {
    id: 2,
    hours: '20:42',
    progressValue: 18,
    totalTask: '9/56',
    progressColor: 'error',
    projectType: 'Figma Project',
    projectTitle: 'Falcon Logo Design',
    img: '/images/icons/project-icons/figma.png'
  },
  {
    id: 3,
    hours: '120:87',
    progressValue: 62,
    totalTask: '290/320',
    progressColor: 'primary',
    projectType: 'VueJs Project',
    projectTitle: 'Dashboard Design',
    img: '/images/icons/project-icons/vue.png'
  },
  {
    id: 4,
    hours: '89:19',
    progressValue: 8,
    totalTask: '7/63',
    progressColor: 'error',
    projectType: 'Xamarin Project',
    projectTitle: 'Foodista Mobile App',
    img: '/images/icons/project-icons/xamarin.png'
  },
  {
    id: 5,
    hours: '230:10',
    progressValue: 49,
    totalTask: '120/186',
    progressColor: 'warning',
    projectType: 'Python Project',
    projectTitle: 'Dojo React Project',
    img: '/images/icons/project-icons/python.png'
  },
  {
    id: 6,
    hours: '342:41',
    progressValue: 92,
    totalTask: '99/109',
    progressColor: 'success',
    projectType: 'Sketch Project',
    projectTitle: 'Blockchain Website',
    img: '/images/icons/project-icons/sketch.png'
  },
  {
    id: 7,
    hours: '12:45',
    progressValue: 88,
    totalTask: '98/110',
    progressColor: 'success',
    projectType: 'HTML Project',
    projectTitle: 'Hoffman Website',
    img: '/images/icons/project-icons/html5.png'
  }
]

// POST: Add new user
mock.onPost('/apps/users/add-user').reply(config => {
  // Get event from post data
  const user = JSON.parse(config.data).data
  const lastId = Math.max(...data.users.map(u => u.id), 0)
  user.id = lastId + 1
  data.users.unshift({ ...user, avatar: '', avatarColor: 'primary', status: 'active' })

  return [201, { user }]
})

// GET: DATA
mock.onGet('/apps/users/list').reply(config => {
  const { q = '', category = null, status = null, description = null } = config.params ?? ''
  const queryLowered = q.toLowerCase()

  const filteredData = data.users.filter(
    user =>
      (user.username.toLowerCase().includes(queryLowered) ||
        user.fullName.toLowerCase().includes(queryLowered) ||
        user.category.toLowerCase().includes(queryLowered) ||
        (user.email.toLowerCase().includes(queryLowered) &&
          user.description.toLowerCase().includes(queryLowered) &&
          user.status.toLowerCase().includes(queryLowered))) &&
      user.category === (category || user.category) &&
      user.description === (description || user.description) &&
      user.status === (status || user.status)
  )

  return [
    200,
    {
      allData: data.users,
      users: filteredData,
      params: config.params,
      total: filteredData.length
    }
  ]
})

// DELETE: Deletes User
mock.onDelete('/apps/users/delete').reply(config => {
  // Get user id from URL
  const userId = config.data
  const userIndex = data.users.findIndex(t => t.id === userId)
  data.users.splice(userIndex, 1)

  return [200]
})

// GET: DATA
mock.onGet('/apps/users/project-list').reply(config => {
  const { q = '' } = config.params ?? ''
  const queryLowered = q.toLowerCase()

  const filteredData = projectListData.filter(
    user =>
      user.projectTitle.toLowerCase().includes(queryLowered) ||
      user.projectType.toLowerCase().includes(queryLowered) ||
      user.totalTask.toLowerCase().includes(queryLowered) ||
      user.hours.toLowerCase().includes(queryLowered) ||
      String(user.progressValue).toLowerCase().includes(queryLowered)
  )

  return [200, filteredData]
})
