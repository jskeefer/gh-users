const gulp = require('gulp');
const rsync = require('gulp-rsync');

gulp.task('appDeploy', () =>
  gulp.src(['build/**']).pipe(
    rsync({
      root: 'build/',
      destination: '/var/www/jeffkeith.me',
      username: 'ubuntu',
      hostname: '147.135.79.235',
      recursive: true,
      clean: false,
      options: {
        e: 'ssh',
      },
    })
  )
);

gulp.task('rd', gulp.series('appDeploy'));
