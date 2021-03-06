## NEXT

- Add HTTP support [#168](https://github.com/Swydo/ddp-apollo/pull/168)
- Add a DDP retry switch [#186](https://github.com/Swydo/ddp-apollo/pull/186)
- Allow custom DDP message observer [#198](https://github.com/Swydo/ddp-apollo/pull/198)

## 1.3.0

- Add ability to pass a client context to the server context via `ddpContext` key.
  ```js
  // client
  apolloClient.query({
      query,
      context: { ddpContext: { foo: 'bar' } }
  });

  // server
  const context = (previousContext, ddpContext) => ({
      ...previousContext,
      foo: ddpContext.foo
  });

  setup({
      schema,
      context,
  });
  ```

## 1.2.0

- Remove support for Optics, because as of 2018-01-31 it's no longer operational

## 1.1.0

- Add `context` option to server setup

## 1.0.0

- Support Apollo Client 2.0 with subscriptions