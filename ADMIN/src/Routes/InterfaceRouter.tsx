/* eslint-disable @typescript-eslint/ban-types */
export interface IPath {
  '/'?: undefined
  '/login': {}
  '/employer': {}
  '/candidate': {}
  '/news': {}
  '/setting-price': {}
  '/setting-adv': {}
  '/setting-cv': {}
  '/setting-password': {}
  '/employer/detail/:id': {}
  '/forgot-password': {}
  '/candidate/detail/:id': {}
  '/news/create': {}
  '/news/detail/:id': {}
  '/posts': {}
  '/posts/detail/:id': {}
  '/setting-program': {}
  // "/list-transactions": {
  //   search?: string;
  // };

  '/error': {
    search?: string
  }
}
