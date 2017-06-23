import { Meteor } from 'meteor/meteor';
import { runQuery } from 'graphql-server-core';
import * as DEFAULT_OPTICS from './optics';

export const DDP_APOLLO_SCHEMA_REQUIRED = 'DDP_APOLLO_SCHEMA_REQUIRED';

export function createGraphQlMethod(schema, {
  disableOptics,
  optics = DEFAULT_OPTICS,
}) {
  if (!schema) {
    throw new Error(DDP_APOLLO_SCHEMA_REQUIRED);
  }

  const {
    _opticsInstrumented: instrumented,
  } = schema;

  // By setting disableOptics to true it can be disabled
  // Else, just check if the schema was instrumented
  const hasOptics = Boolean(!disableOptics && instrumented);

  return async function graphQlMethod({ query, variables, operationName } = {}) {
    this.unblock && this.unblock();

    const { userId } = this;
    const opticsContext = hasOptics && optics.createContext(this.connection);

    let data = {};

    if (query) {
      data = await runQuery({
        schema,
        query,
        variables,
        operationName,
        context: {
          userId,
          opticsContext,
        },
      });
    }

    hasOptics && Meteor.defer(() => optics.reportContext(
      optics.finishContext(opticsContext),
    ));

    return data;
  };
}