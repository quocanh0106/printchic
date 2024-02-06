// ** Mock
import mock from 'src/@fake-db/mock'

const data = {
  users: [
    {
      id: 102,
      parentCategory: 'UK',
      stock: 'Galen Slixby',
      bannerImg: 'https://img.freepik.com/premium-vector/shoes-sneaker-footwear-vector-illustration_776624-221.jpg',
      category: 'editor',
      username: 'gslixby0',
      isPublic: 'El Salvador',
      createdAt: '(479) 232-9151',
      title: 'gslixby0@abc.net.au',
      description: 'enterprise',
      status: 'inactive',
      avatar: '',
      avatarColor: 'primary'
    },
    {
      id: 2,
      parentCategory: 'Manual - Paypal',
      stock: 'Halsey Redmore',
      bannerImg: 'Skinder PVT LTD',
      category: 'author',
      username: 'hredmore1',
      isPublic: '',
      createdAt: '(472) 607-9137',
      title: 'hredmore1@imgur.com',
      description: 'team',
      status: 'pending',
      avatar: '/images/avatars/3.png'
    },
    {
      id: 3,
      parentCategory: 'Manual - Cash',
      stock: 'Marjory Sicely',
      bannerImg: 'Oozz PVT LTD',
      category: 'maintainer',
      username: 'msicely2',
      isPublic: '',
      createdAt: '(321) 264-4599',
      title: 'msicely2@who.int',
      description: 'enterprise',
      status: 'active',
      avatar: '/images/avatars/1.png'
    },
    {
      id: 4,
      parentCategory: 'Auto Debit',
      stock: 'Cyrill Risby',
      bannerImg: 'Oozz PVT LTD',
      category: 'maintainer',
      username: 'crisby3',
      isPublic: 'China',
      createdAt: '(923) 690-6806',
      title: 'crisby3@wordpress.com',
      description: 'team',
      status: 'inactive',
      avatar: '/images/avatars/3.png'
    },
    {
      id: 5,
      parentCategory: 'Auto Debit',
      stock: 'Maggy Hurran',
      bannerImg: 'Aimbo PVT LTD',
      category: 'subscriber',
      username: 'mhurran4',
      isPublic: 'Pakistan',
      createdAt: '(669) 914-1078',
      title: 'mhurran4@yahoo.co.jp',
      description: 'enterprise',
      status: 'pending',
      avatar: '/images/avatars/1.png'
    },
    {
      id: 6,
      parentCategory: 'Manual - Cash',
      stock: 'Silvain Halstead',
      bannerImg: 'Jaxbean PVT LTD',
      category: 'author',
      username: 'shalstead5',
      isPublic: 'China',
      createdAt: '(958) 973-3093',
      title: 'shalstead5@shinystat.com',
      description: 'bannerImg',
      status: 'active',
      avatar: '',
      avatarColor: 'error'
    },
    {
      id: 7,
      parentCategory: 'Manual - Paypal',
      stock: 'Breena Gallemore',
      bannerImg: 'Jazzy PVT LTD',
      category: 'subscriber',
      username: 'bgallemore6',
      isPublic: 'Canada',
      createdAt: '(825) 977-8152',
      title: 'bgallemore6@boston.com',
      description: 'bannerImg',
      status: 'pending',
      avatar: '',
      avatarColor: 'warning'
    },
    {
      id: 8,
      parentCategory: 'Auto Debit',
      stock: 'Kathryne Liger',
      bannerImg: 'Pixoboo PVT LTD',
      category: 'author',
      username: 'kliger7',
      isPublic: 'France',
      createdAt: '(187) 440-0934',
      title: 'kliger7@vinaora.com',
      description: 'enterprise',
      status: 'pending',
      avatar: '/images/avatars/4.png'
    },
    {
      id: 9,
      parentCategory: 'Manual - Credit Card',
      stock: 'Franz Scotfurth',
      bannerImg: 'Tekfly PVT LTD',
      category: 'subscriber',
      username: 'fscotfurth8',
      isPublic: 'China',
      createdAt: '(978) 146-5443',
      title: 'fscotfurth8@dailymotion.com',
      description: 'team',
      status: 'pending',
      avatar: '/images/avatars/2.png'
    },
    {
      id: 10,
      parentCategory: 'Manual - Credit Card',
      stock: 'Jillene Bellany',
      bannerImg: 'Gigashots PVT LTD',
      category: 'maintainer',
      username: 'jbellany9',
      isPublic: 'Jamaica',
      createdAt: '(589) 284-6732',
      title: 'jbellany9@kickstarter.com',
      description: 'bannerImg',
      status: 'inactive',
      avatar: '/images/avatars/5.png'
    },
    {
      id: 11,
      parentCategory: 'Auto Debit',
      stock: 'Jonah Wharlton',
      bannerImg: 'Eare PVT LTD',
      category: 'subscriber',
      username: 'jwharltona',
      isPublic: 'United States',
      createdAt: '(176) 532-6824',
      title: 'jwharltona@oakley.com',
      description: 'team',
      status: 'inactive',
      avatar: '/images/avatars/4.png'
    },
    {
      id: 12,
      parentCategory: 'Auto Debit',
      stock: 'Seth Hallam',
      bannerImg: 'Yakitri PVT LTD',
      category: 'subscriber',
      username: 'shallamb',
      isPublic: 'Peru',
      createdAt: '(234) 464-0600',
      title: 'shallamb@hugedomains.com',
      description: 'team',
      status: 'pending',
      avatar: '/images/avatars/5.png'
    },
    {
      id: 13,
      parentCategory: 'Manual - Cash',
      stock: 'Yoko Pottie',
      bannerImg: 'Leenti PVT LTD',
      category: 'subscriber',
      username: 'ypottiec',
      isPublic: 'Philippines',
      createdAt: '(907) 284-5083',
      title: 'ypottiec@privacy.gov.au',
      description: 'basic',
      status: 'inactive',
      avatar: '/images/avatars/7.png'
    },
    {
      id: 14,
      parentCategory: 'Manual - Paypal',
      stock: 'Maximilianus Krause',
      bannerImg: 'Digitube PVT LTD',
      category: 'author',
      username: 'mkraused',
      isPublic: 'Democratic Republic of the Congo',
      createdAt: '(167) 135-7392',
      title: 'mkraused@stanford.edu',
      description: 'team',
      status: 'active',
      avatar: '/images/avatars/6.png'
    },
    {
      id: 15,
      parentCategory: 'Manual - Credit Card',
      stock: 'Zsazsa McCleverty',
      bannerImg: 'Kaymbo PVT LTD',
      category: 'maintainer',
      username: 'zmcclevertye',
      isPublic: 'France',
      createdAt: '(317) 409-6565',
      title: 'zmcclevertye@soundcloud.com',
      description: 'enterprise',
      status: 'active',
      avatar: '/images/avatars/2.png'
    },
    {
      id: 16,
      parentCategory: 'Auto Debit',
      stock: 'Bentlee Emblin',
      bannerImg: 'Yambee PVT LTD',
      category: 'author',
      username: 'bemblinf',
      isPublic: 'Spain',
      createdAt: '(590) 606-1056',
      title: 'bemblinf@wired.com',
      description: 'bannerImg',
      status: 'active',
      avatar: '/images/avatars/6.png'
    },
    {
      id: 17,
      parentCategory: 'Manual - Paypal',
      stock: 'Brockie Myles',
      bannerImg: 'Wikivu PVT LTD',
      category: 'maintainer',
      username: 'bmylesg',
      isPublic: 'Poland',
      createdAt: '(553) 225-9905',
      title: 'bmylesg@amazon.com',
      description: 'basic',
      status: 'active',
      avatar: '',
      avatarColor: 'success'
    },
    {
      id: 18,
      parentCategory: 'Auto Debit',
      stock: 'Bertha Biner',
      bannerImg: 'Twinte PVT LTD',
      category: 'editor',
      username: 'bbinerh',
      isPublic: 'Yemen',
      createdAt: '(901) 916-9287',
      title: 'bbinerh@mozilla.com',
      description: 'team',
      status: 'active',
      avatar: '/images/avatars/7.png'
    },
    {
      id: 19,
      parentCategory: 'Auto Debit',
      stock: 'Travus Bruntjen',
      bannerImg: 'Cogidoo PVT LTD',
      category: 'admin',
      username: 'tbruntjeni',
      isPublic: 'France',
      createdAt: '(524) 586-6057',
      title: 'tbruntjeni@sitemeter.com',
      description: 'enterprise',
      status: 'active',
      avatar: '',
      avatarColor: 'primary'
    },
    {
      id: 20,
      parentCategory: 'Auto Debit',
      stock: 'Wesley Burland',
      bannerImg: 'Bubblemix PVT LTD',
      category: 'editor',
      username: 'wburlandj',
      isPublic: 'Honduras',
      createdAt: '(569) 683-1292',
      title: 'wburlandj@uiuc.edu',
      description: 'team',
      status: 'inactive',
      avatar: '/images/avatars/6.png'
    },
    {
      id: 21,
      parentCategory: 'Manual - Cash',
      stock: 'Selina Kyle',
      bannerImg: 'Wayne Enterprises',
      category: 'admin',
      username: 'catwomen1940',
      isPublic: 'USA',
      createdAt: '(829) 537-0057',
      title: 'irena.dubrovna@wayne.com',
      description: 'team',
      status: 'active',
      avatar: '/images/avatars/1.png'
    },
    {
      id: 22,
      parentCategory: 'Manual - Cash',
      stock: 'Jameson Lyster',
      bannerImg: 'Quaxo PVT LTD',
      category: 'editor',
      username: 'jlysterl',
      isPublic: 'Ukraine',
      createdAt: '(593) 624-0222',
      title: 'jlysterl@guardian.co.uk',
      description: 'bannerImg',
      status: 'inactive',
      avatar: '/images/avatars/8.png'
    },
    {
      id: 23,
      parentCategory: 'Manual - Paypal',
      stock: 'Kare Skitterel',
      bannerImg: 'Ainyx PVT LTD',
      category: 'maintainer',
      username: 'kskitterelm',
      isPublic: 'Poland',
      createdAt: '(254) 845-4107',
      title: 'kskitterelm@ainyx.com',
      description: 'basic',
      status: 'pending',
      avatar: '/images/avatars/3.png'
    },
    {
      id: 24,
      parentCategory: 'Auto Debit',
      stock: 'Cleavland Hatherleigh',
      bannerImg: 'Flipopia PVT LTD',
      category: 'admin',
      username: 'chatherleighn',
      isPublic: 'Brazil',
      createdAt: '(700) 783-7498',
      title: 'chatherleighn@washington.edu',
      description: 'team',
      status: 'pending',
      avatar: '/images/avatars/2.png'
    },
    {
      id: 25,
      parentCategory: 'Manual - Paypal',
      stock: 'Adeline Micco',
      bannerImg: 'Topicware PVT LTD',
      category: 'admin',
      username: 'amiccoo',
      isPublic: 'France',
      createdAt: '(227) 598-1841',
      title: 'amiccoo@whitehouse.gov',
      description: 'enterprise',
      status: 'pending',
      avatar: '',
      avatarColor: 'error'
    },
    {
      id: 26,
      parentCategory: 'Manual - Credit Card',
      stock: 'Hugh Hasson',
      bannerImg: 'Skinix PVT LTD',
      category: 'admin',
      username: 'hhassonp',
      isPublic: 'China',
      createdAt: '(582) 516-1324',
      title: 'hhassonp@bizjournals.com',
      description: 'basic',
      status: 'inactive',
      avatar: '/images/avatars/4.png'
    },
    {
      id: 27,
      parentCategory: 'Manual - Cash',
      stock: 'Germain Jacombs',
      bannerImg: 'Youopia PVT LTD',
      category: 'editor',
      username: 'gjacombsq',
      isPublic: 'Zambia',
      createdAt: '(137) 467-5393',
      title: 'gjacombsq@jigsy.com',
      description: 'enterprise',
      status: 'active',
      avatar: '/images/avatars/5.png'
    },
    {
      id: 28,
      parentCategory: 'Manual - Cash',
      stock: 'Bree Kilday',
      bannerImg: 'Jetpulse PVT LTD',
      category: 'maintainer',
      username: 'bkildayr',
      isPublic: 'Portugal',
      createdAt: '(412) 476-0854',
      title: 'bkildayr@mashable.com',
      description: 'team',
      status: 'active',
      avatar: '',
      avatarColor: 'warning'
    },
    {
      id: 29,
      parentCategory: 'Auto Debit',
      stock: 'Candice Pinyon',
      bannerImg: 'Kare PVT LTD',
      category: 'maintainer',
      username: 'cpinyons',
      isPublic: 'Sweden',
      createdAt: '(170) 683-1520',
      title: 'cpinyons@behance.net',
      description: 'team',
      status: 'active',
      avatar: '/images/avatars/7.png'
    },
    {
      id: 30,
      parentCategory: 'Manual - Cash',
      stock: 'Isabel Mallindine',
      bannerImg: 'Voomm PVT LTD',
      category: 'subscriber',
      username: 'imallindinet',
      isPublic: 'Slovenia',
      createdAt: '(332) 803-1983',
      title: 'imallindinet@shinystat.com',
      description: 'team',
      status: 'pending',
      avatar: '',
      avatarColor: 'info'
    },
    {
      id: 31,
      parentCategory: 'Auto Debit',
      stock: 'Gwendolyn Meineken',
      bannerImg: 'Oyondu PVT LTD',
      category: 'admin',
      username: 'gmeinekenu',
      isPublic: 'Moldova',
      createdAt: '(551) 379-7460',
      title: 'gmeinekenu@hc360.com',
      description: 'basic',
      status: 'pending',
      avatar: '/images/avatars/1.png'
    },
    {
      id: 32,
      parentCategory: 'Manual - Paypal',
      stock: 'Rafaellle Snowball',
      bannerImg: 'Fivespan PVT LTD',
      category: 'editor',
      username: 'rsnowballv',
      isPublic: 'Philippines',
      createdAt: '(974) 829-0911',
      title: 'rsnowballv@indiegogo.com',
      description: 'basic',
      status: 'pending',
      avatar: '/images/avatars/5.png'
    },
    {
      id: 33,
      parentCategory: 'Manual - Credit Card',
      stock: 'Rochette Emer',
      bannerImg: 'Thoughtworks PVT LTD',
      category: 'admin',
      username: 'remerw',
      isPublic: 'North Korea',
      createdAt: '(841) 889-3339',
      title: 'remerw@blogtalkradio.com',
      description: 'basic',
      status: 'active',
      avatar: '/images/avatars/8.png'
    },
    {
      id: 34,
      parentCategory: 'Manual - Cash',
      stock: 'Ophelie Fibbens',
      bannerImg: 'Jaxbean PVT LTD',
      category: 'subscriber',
      username: 'ofibbensx',
      isPublic: 'Indonesia',
      createdAt: '(764) 885-7351',
      title: 'ofibbensx@booking.com',
      description: 'bannerImg',
      status: 'active',
      avatar: '/images/avatars/4.png'
    },
    {
      id: 35,
      parentCategory: 'Manual - Paypal',
      stock: 'Stephen MacGilfoyle',
      bannerImg: 'Browseblab PVT LTD',
      category: 'maintainer',
      username: 'smacgilfoyley',
      isPublic: 'Japan',
      createdAt: '(350) 589-8520',
      title: 'smacgilfoyley@bigcartel.com',
      description: 'bannerImg',
      status: 'pending',
      avatar: '',
      avatarColor: 'error'
    },
    {
      id: 36,
      parentCategory: 'Auto Debit',
      stock: 'Bradan Rosebotham',
      bannerImg: 'Agivu PVT LTD',
      category: 'subscriber',
      username: 'brosebothamz',
      isPublic: 'Belarus',
      createdAt: '(882) 933-2180',
      title: 'brosebothamz@tripadvisor.com',
      description: 'team',
      status: 'inactive',
      avatar: '',
      avatarColor: 'success'
    },
    {
      id: 37,
      parentCategory: 'Manual - Cash',
      stock: 'Skip Hebblethwaite',
      bannerImg: 'Katz PVT LTD',
      category: 'admin',
      username: 'shebblethwaite10',
      isPublic: 'Canada',
      createdAt: '(610) 343-1024',
      title: 'shebblethwaite10@arizona.edu',
      description: 'bannerImg',
      status: 'inactive',
      avatar: '/images/avatars/1.png'
    },
    {
      id: 38,
      parentCategory: 'Auto Debit',
      stock: 'Moritz Piccard',
      bannerImg: 'Twitternation PVT LTD',
      category: 'maintainer',
      username: 'mpiccard11',
      isPublic: 'Croatia',
      createdAt: '(365) 277-2986',
      title: 'mpiccard11@vimeo.com',
      description: 'enterprise',
      status: 'inactive',
      avatar: '/images/avatars/1.png'
    },
    {
      id: 39,
      parentCategory: 'Manual - Paypal',
      stock: 'Tyne Widmore',
      bannerImg: 'Yombu PVT LTD',
      category: 'subscriber',
      username: 'twidmore12',
      isPublic: 'Finland',
      createdAt: '(531) 731-0928',
      title: 'twidmore12@bravesites.com',
      description: 'team',
      status: 'pending',
      avatar: '',
      avatarColor: 'primary'
    },
    {
      id: 40,
      parentCategory: 'Auto Debit',
      stock: 'Florenza Desporte',
      bannerImg: 'Kamba PVT LTD',
      category: 'author',
      username: 'fdesporte13',
      isPublic: 'Ukraine',
      createdAt: '(312) 104-2638',
      title: 'fdesporte13@omniture.com',
      description: 'bannerImg',
      status: 'active',
      avatar: '/images/avatars/6.png'
    },
    {
      id: 41,
      parentCategory: 'Auto Debit',
      stock: 'Edwina Baldetti',
      bannerImg: 'Dazzlesphere PVT LTD',
      category: 'maintainer',
      username: 'ebaldetti14',
      isPublic: 'Haiti',
      createdAt: '(315) 329-3578',
      title: 'ebaldetti14@theguardian.com',
      description: 'team',
      status: 'pending',
      avatar: '',
      avatarColor: 'info'
    },
    {
      id: 42,
      parentCategory: 'Manual - Credit Card',
      stock: 'Benedetto Rossiter',
      bannerImg: 'Mybuzz PVT LTD',
      category: 'editor',
      username: 'brossiter15',
      isPublic: 'Indonesia',
      createdAt: '(323) 175-6741',
      title: 'brossiter15@craigslist.org',
      description: 'team',
      status: 'inactive',
      avatar: '',
      avatarColor: 'warning'
    },
    {
      id: 43,
      parentCategory: 'Auto Debit',
      stock: 'Micaela McNirlan',
      bannerImg: 'Tambee PVT LTD',
      category: 'admin',
      username: 'mmcnirlan16',
      isPublic: 'Indonesia',
      createdAt: '(242) 952-0916',
      title: 'mmcnirlan16@hc360.com',
      description: 'basic',
      status: 'inactive',
      avatar: '',
      avatarColor: 'error'
    },
    {
      id: 44,
      parentCategory: 'Manual - Paypal',
      stock: 'Vladamir Koschek',
      bannerImg: 'Centimia PVT LTD',
      category: 'author',
      username: 'vkoschek17',
      isPublic: 'Guatemala',
      createdAt: '(531) 758-8335',
      title: 'vkoschek17@abc.net.au',
      description: 'team',
      status: 'active',
      avatar: '',
      avatarColor: 'success'
    },
    {
      id: 45,
      parentCategory: 'Manual - Cash',
      stock: 'Corrie Perot',
      bannerImg: 'Flipopia PVT LTD',
      category: 'subscriber',
      username: 'cperot18',
      isPublic: 'China',
      createdAt: '(659) 385-6808',
      title: 'cperot18@goo.ne.jp',
      description: 'team',
      status: 'pending',
      avatar: '/images/avatars/3.png'
    },
    {
      id: 46,
      parentCategory: 'Manual - Credit Card',
      stock: 'Saunder Offner',
      bannerImg: 'Skalith PVT LTD',
      category: 'maintainer',
      username: 'soffner19',
      isPublic: 'Poland',
      createdAt: '(200) 586-2264',
      title: 'soffner19@mac.com',
      description: 'enterprise',
      status: 'pending',
      avatar: '',
      avatarColor: 'primary'
    },
    {
      id: 47,
      parentCategory: 'Auto Debit',
      stock: 'Karena Courtliff',
      bannerImg: 'Feedfire PVT LTD',
      category: 'admin',
      username: 'kcourtliff1a',
      isPublic: 'China',
      createdAt: '(478) 199-0020',
      title: 'kcourtliff1a@bbc.co.uk',
      description: 'basic',
      status: 'active',
      avatar: '/images/avatars/1.png'
    },
    {
      id: 48,
      parentCategory: 'Auto Debit',
      stock: 'Onfre Wind',
      bannerImg: 'Thoughtmix PVT LTD',
      category: 'admin',
      username: 'owind1b',
      isPublic: 'Ukraine',
      createdAt: '(344) 262-7270',
      title: 'owind1b@yandex.ru',
      description: 'basic',
      status: 'pending',
      avatar: '',
      avatarColor: 'error'
    },
    {
      id: 49,
      parentCategory: 'Auto Debit',
      stock: 'Paulie Durber',
      bannerImg: 'Babbleblab PVT LTD',
      category: 'subscriber',
      username: 'pdurber1c',
      isPublic: 'Sweden',
      createdAt: '(694) 676-1275',
      title: 'pdurber1c@gov.uk',
      description: 'team',
      status: 'inactive',
      avatar: '',
      avatarColor: 'warning'
    },
    {
      id: 50,
      parentCategory: 'Manual - Cash',
      stock: 'Beverlie Krabbe',
      bannerImg: 'Kaymbo PVT LTD',
      category: 'editor',
      username: 'bkrabbe1d',
      isPublic: 'China',
      createdAt: '(397) 294-5153',
      title: 'bkrabbe1d@home.pl',
      description: 'bannerImg',
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
        user.stock.toLowerCase().includes(queryLowered) ||
        user.category.toLowerCase().includes(queryLowered) ||
        (user.title.toLowerCase().includes(queryLowered) &&
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
