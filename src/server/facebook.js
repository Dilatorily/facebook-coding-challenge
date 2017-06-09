import url from 'url';
import rp from 'request-promise-native'; // eslint-disable-line import/no-extraneous-dependencies

import configuration from '../../configuration';

const proxyPostsPaging = posts => ({
  ...posts,
  paging: posts.paging ? {
    ...posts.paging,
    next: posts.paging.next ? `/api/posts/next${url.parse(posts.paging.next).search}` : undefined,
  } : undefined,
});

const facebook = (app) => {
  app.get('/api/oauth', async (request, response) => {
    if (!request.query.code) {
      if (!request.query.error) {
        response.redirect(`https://www.facebook.com/v${configuration.facebook.version}/dialog/oauth?client_id=${configuration.facebook.clientId}&redirect_uri=${configuration.facebook.redirectUri}&scope=${configuration.facebook.scope}`);
      } else {
        response.status(403).send(request.query.error);
      }
    } else {
      try {
        const { access_token: token } = await rp({
          uri: `https://graph.facebook.com/v${configuration.facebook.version}/oauth/access_token`,
          qs: {
            client_id: configuration.facebook.clientId,
            client_secret: configuration.facebook.clientSecret,
            code: request.query.code,
            redirect_uri: configuration.facebook.redirectUri,
          },
          json: true,
        });
        const { access_token: accessToken } = await rp({
          uri: `https://graph.facebook.com/v${configuration.facebook.version}/${configuration.facebook.appId}`,
          qs: {
            access_token: token,
            fields: 'access_token',
          },
          json: true,
        });
        response.redirect(`/login?access_token=${accessToken}`);
      } catch (error) {
        response.status(403).send(error);
      }
    }
  });

  app.get('/api/id', (request, response) => {
    response.send({ id: configuration.facebook.appId });
  });

  app.get('/api/picture', async (request, response) => {
    try {
      const picture = await rp({
        uri: `https://graph.facebook.com/v${configuration.facebook.version}/${configuration.facebook.appId}/picture`,
        simple: false,
        followRedirect: false,
        qs: {
          access_token: request.get('Access-Token'),
          height: 100,
        },
        transform: (body, { headers, statusCode }) => {
          if (statusCode >= 400) {
            throw new Error(body);
          }

          return {
            location: headers['content-type'].includes('image') ? headers.location : undefined,
          };
        },
      });
      response.send(picture);
    } catch (error) {
      response.status(500).send(error);
    }
  });

  app.get('/api/posts', async (request, response) => {
    try {
      const posts = await rp({
        uri: `https://graph.facebook.com/v${configuration.facebook.version}/${configuration.facebook.appId}/promotable_posts`,
        qs: {
          access_token: request.get('Access-Token'),
          fields: 'message,is_published,created_time,insights.metric(post_impressions_unique){values}',
        },
        json: true,
      });
      response.send(proxyPostsPaging(posts));
    } catch (error) {
      response.status(500).send(error);
    }
  });

  app.post('/api/posts', async (request, response) => {
    try {
      console.log(request.body);
      const post = await rp({
        uri: `https://graph.facebook.com/v${configuration.facebook.version}/${configuration.facebook.appId}/feed`,
        method: 'POST',
        json: true,
        body: {
          access_token: request.get('Access-Token'),
          message: request.body.post,
          published: request.body.isPublished,
          scheduled_publish_time:
            request.body.isPublished ? undefined : (request.body.publisingTime || undefined),
        },
      });
      response.status(201).send(post);
    } catch (error) {
      response.status(500).send(error);
    }
  });

  app.get('/api/posts/next', async (request, response) => {
    try {
      const posts = await rp({
        uri: `https://graph.facebook.com/v${configuration.facebook.version}/${configuration.facebook.appId}/promotable_posts${url.parse(request.originalUrl).search}`,
        json: true,
      });
      response.send(proxyPostsPaging(posts));
    } catch (error) {
      response.status(500).send(error);
    }
  });
};

export default facebook;
