import url from 'url';
import fbgraph from 'fbgraph'; // eslint-disable-line import/no-extraneous-dependencies

import configuration from '../../configuration';

const proxyPostsPaging = posts => ({
  ...posts,
  paging: posts.paging ? {
    ...posts.paging,
    next: posts.paging.next ? `/api/posts/next${url.parse(posts.paging.next).search}` : undefined,
  } : undefined,
});

const facebook = (app) => {
  fbgraph.setVersion('2.8');

  app.get('/api/oauth', (request, response) => {
    if (!request.query.code) {
      const oauthUrl = fbgraph.getOauthUrl({
        client_id: configuration.fbgraph.clientId,
        redirect_uri: configuration.fbgraph.redirectUri,
        scope: configuration.fbgraph.scope,
      });

      if (!request.query.error) {
        response.redirect(oauthUrl);
      } else {
        response.status(403).send(request.query.error);
      }
    } else {
      fbgraph.authorize({
        client_id: configuration.fbgraph.clientId,
        client_secret: configuration.fbgraph.clientSecret,
        code: request.query.code,
        redirect_uri: configuration.fbgraph.redirectUri,
      }, (error, authResponse) => {
        if (error) {
          response.status(403).send(error);
        } else {
          fbgraph.get(configuration.fbgraph.appId, {
            access_token: authResponse.access_token,
            fields: 'access_token',
          }, (tokenError, tokenResponse) => {
            if (tokenError) {
              response.status(403).send(tokenError);
            } else {
              response.redirect(`/login?access_token=${tokenResponse.access_token}`);
            }
          });
        }
      });
    }
  });

  app.get('/api/id', (request, response) => {
    response.send({ id: configuration.fbgraph.appId });
  });

  app.get('/api/picture', (request, response) => {
    fbgraph.get(`${configuration.fbgraph.appId}/picture`, {
      access_token: request.get('Access-Token'),
      height: 100,
    }, (error, picture) => {
      if (error) {
        response.status(500).send(error);
      } else {
        response.send(picture);
      }
    });
  });

  app.get('/api/posts', (request, response) => {
    fbgraph.get(`${configuration.fbgraph.appId}/promotable_posts`, {
      access_token: request.get('Access-Token'),
      fields: 'message,is_published,created_time,insights.metric(post_impressions_unique){values}',
    }, (error, posts) => {
      if (error) {
        response.status(500).send(error);
      } else {
        response.send(proxyPostsPaging(posts));
      }
    });
  });

  app.post('/api/posts', (request, response) => {
    fbgraph.post(`${configuration.fbgraph.appId}/feed`, {
      access_token: request.get('Access-Token'),
      message: request.body.post,
      published: request.body.isPublished,
    }, (error, post) => {
      if (error) {
        response.status(500).send(error);
      } else {
        response.status(201).send(post);
      }
    });
  });

  app.get('/api/posts/next', (request, response) => {
    fbgraph.get(`${configuration.fbgraph.appId}/promotable_posts${url.parse(request.originalUrl).search}`, (error, posts) => {
      if (error) {
        response.status(500).send(error);
      } else {
        response.send(proxyPostsPaging(posts));
      }
    });
  });
};

export default facebook;
