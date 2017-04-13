import fbgraph from 'fbgraph'; // eslint-disable-line import/no-extraneous-dependencies

import configuration from '../../configuration';

const facebook = (app) => {
  fbgraph.setVersion('2.8');

  app.get('/oauth', (request, response) => {
    if (!request.query.code) {
      const oauthUrl = fbgraph.getOauthUrl({
        client_id: configuration.fbgraph.clientId,
        redirect_uri: configuration.fbgraph.redirectUri,
        scope: configuration.fbgraph.scope,
      });

      if (!request.query.error) {
        response.redirect(oauthUrl);
      } else {
        response.sendStatus(403);
      }
    } else {
      fbgraph.authorize({
        client_id: configuration.fbgraph.clientId,
        client_secret: configuration.fbgraph.clientSecret,
        code: request.query.code,
        redirect_uri: configuration.fbgraph.redirectUri,
      }, (error, authResponse) => {
        if (error) {
          response.sendStatus(403);
        } else {
          response.redirect(`/login?access_token=${authResponse.access_token}`);
        }
      });
    }
  });

  app.get('/api/posts', (request, response) => {
    fbgraph.get(`${configuration.fbgraph.appId}/promotable_posts`, {
      access_token: request.get('Access-Token'),
      fields: 'message,is_published,created_time',
    }, (error, posts) => {
      if (error) {
        response.sendStatus(500);
      } else {
        response.send(posts.data);
      }
    });
  });

  app.get('/api/posts/:id/views', (request, response) => {
    fbgraph.get(`${request.params.id}/insights/post_impressions_unique`, {
      access_token: request.get('Access-Token'),
      fields: 'values',
    }, (error, views) => {
      if (error) {
        response.sendStatus(500);
      } else {
        response.send(views.data);
      }
    });
  });

  app.get('/api/picture', (request, response) => {
    fbgraph.get(`${configuration.fbgraph.appId}/picture`, {
      access_token: request.get('Access-Token'),
      height: 100,
    }, (error, picture) => {
      if (error) {
        response.sendStatus(500);
      } else {
        response.send(picture);
      }
    });
  });
};

export default facebook;
