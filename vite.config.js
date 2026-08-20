import { defineConfig } from 'vite';
import pug from 'pug';

export default defineConfig({
  plugins: [
    {
      name: 'vite-plugin-pug-entry',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/' || req.url === '/index.html') {
            try {
              const compiledFunction = pug.compileFile('index.pug');
              const html = compiledFunction();
              res.setHeader('Content-Type', 'text/html');
              return res.end(html);
            } catch (error) {
              return next(error);
            }
          }
          next();
        });

        server.watcher.add('index.pug');
        server.watcher.on('change', (file) => {
          if (file.endsWith('index.pug')) {
            server.ws.send({
              type: 'full-reload',
              path: '*'
            });
          }
        });
      },
      transformIndexHtml() {
        const compiledFunction = pug.compileFile('index.pug');
        return compiledFunction();
      }
    }
  ]
});