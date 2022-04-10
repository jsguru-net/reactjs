export const getBookmarkItems = (page, itemsPerPage) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const res = [
        {
          title: 'Google',
          link: 'https://google.com',
          group: 'Business',
        },
        {
          title: 'Facebook',
          link: 'https://facebook.com',
          group: 'Business',
        },
        { title: 'Youtube', link: 'https://youtube.com', group: 'Business' },
        {
          title: 'JSBaseVietnam',
          link: 'https://jsbasevietnam.com',
          group: 'Technical',
        },
        {
          title: 'NextJSVietnam',
          link: 'https://nextjsvietnam.com',
          group: 'Technical',
        },
      ];
      const items = [];
      for (let i = 0; i < itemsPerPage; i++) {
        const idx = Math.floor(Math.random() * res.length);
        res[idx].title += `:${page}`;
        items.push(res[idx]);
      }
      resolve({
        data: {
          page,
          totalPage: 10,
          itemsPerPage,
          items,
        },
      });
    }, 1000);
  });
};
