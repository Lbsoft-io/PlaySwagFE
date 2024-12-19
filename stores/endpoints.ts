import { defineStore } from 'pinia'
import { useUseOpenApiParser } from '~/composables/core/useOpenApiParser'
import type { Endpoint } from '~/core/core/ApiFormats'

export const useEndpoints = defineStore({
  id: 'endpoints',
  state: () => ({
    apis: Array<Endpoint>()
  }),
  actions: {
    async loadApis() {
      this.apis = await useUseOpenApiParser('')
    },
    getEndpointByOperationId(operationId: string): Endpoint | undefined {
      return this.apis.find(endpoint => endpoint.OperationId === operationId)
    },
    groupEndpointsByTag(): { [key: string]: Endpoint[] } {
      let endpoints = this.apis
      return endpoints.reduce((acc, endpoint) => {
        if (!acc[endpoint.Tag]) {
          acc[endpoint.Tag] = [];
        }
        acc[endpoint.Tag].push(endpoint);
        return acc;
      }, {} as { [key: string]: Endpoint[] });
    }

  }
})
