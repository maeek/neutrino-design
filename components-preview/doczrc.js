export default {
  title: 'Neutrino-Design',
  typescript: true,
  notUseSpecifiers: true,
  filterComponents: files => files.filter(file => /([^d]\.tsx?)$/.test(file)),
  htmlContext: {
    head: {
      links: [
        {
          rel: 'stylesheet',
          href:
            'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,700;0,900;1,400&display=swap',
        },
      ],
    },
  },
};
