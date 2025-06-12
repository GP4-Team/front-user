// craco.config.js - تكوين إضافي لحل مشاكل webpack
module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // تعطيل source maps في development لتجنب message port errors
      if (process.env.NODE_ENV === 'development') {
        webpackConfig.devtool = false;
      }
      
      // إعدادات devServer لتجنب المشاكل
      if (webpackConfig.devServer) {
        webpackConfig.devServer = {
          ...webpackConfig.devServer,
          client: {
            ...webpackConfig.devServer.client,
            logging: 'warn', // تقليل الـ logging
            overlay: {
              errors: true,
              warnings: false,
              runtimeErrors: false
            }
          },
          compress: false, // تعطيل الضغط لتجنب مشاكل الاتصال
        };
      }
      
      return webpackConfig;
    },
  },
  devServer: {
    client: {
      logging: 'warn',
      overlay: {
        errors: true,
        warnings: false,
        runtimeErrors: false
      }
    }
  }
};